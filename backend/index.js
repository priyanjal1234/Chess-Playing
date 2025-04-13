import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import { generate } from "random-words";
import { Chess } from "chess.js";

let chess = new Chess();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

let waitingPlayers = [];

io.on("connection", function (socket) {
  console.log(`Connected ${socket.id}`);

  socket.on("random-play", function () {
    if (waitingPlayers.length === 0) {
      waitingPlayers.push(socket);

      socket.emit("single", "Waiting for other player");
    } else {
      let opponent = waitingPlayers.pop();
      let roomId = generate();
      socket.join(roomId);
      opponent.join(roomId);

      const whitePlayer = Math.random() < 0.5 ? socket : opponent;
      const blackPlayer = whitePlayer === socket ? opponent : socket;

      io.to(whitePlayer.id).emit("startGame", {
        roomId,
        color: "white",
        opponentId: blackPlayer.id,
      });

      io.to(blackPlayer.id).emit("startGame", {
        roomId,
        color: "black",
        opponentId: whitePlayer.id,
      });
    }
  });

  socket.on("get-game-position", function (roomId) {
    io.to(roomId).emit("initial-position", { fen: chess.fen() });
  });

  socket.on("make-move", function ({ move, who, roomId }) {
    try {
      if (chess.turn() !== who) {
        socket.emit("not-your-turn", "This is not your turn");
        return;
      }
      let moveData = chess.move(move);
      if (moveData) {
        io.to(roomId).emit("new-fen", { fen: chess.fen() });
      } else {
        socket.emit("invalid-move", "Move is invalid");
      }
    } catch (error) {
      socket.emit("some-error", error);
    }
  });

  socket.on("disconnect", function () {
    console.log(`Disconnected ${socket.id}`);
  });
});

const port = process.env.PORT || 4000;
server.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
