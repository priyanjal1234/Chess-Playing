import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useParams } from "react-router-dom";
import socket, { connectSocket } from "../socket/socket.js";

const ChessGame = () => {
  const { roomId, color } = useParams();
  const [fen, setfen] = useState();

  useEffect(() => {
    connectSocket();

    socket.on("not-your-turn", function (data) {
      console.log(data);
    });

    socket.on("invalid-move", function (data) {
      console.log(data);
    });

    socket.emit("get-game-position", roomId);

    socket.on("initial-position", function (data) {
      setfen(data.fen);
    });

    socket.on("new-fen", function (fenData) {
      setfen(fenData.fen);
    });
  }, []);

  function handlePieceDrop(source, target) {
    const move = source + target;
    socket.emit("make-move", {
      move,
      who: color.toString().split("")[0],
      roomId,
    });
  }

  function handleResetGame() {
    socket.emit("reset-game",roomId)
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Chessboard
          position={fen}
          onPieceDrop={handlePieceDrop}
          boardOrientation={color === "white" ? "white" : "black"}
          boardWidth={400}
        />
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30">
            Resign
          </button>
          <button onClick={handleResetGame} className="px-6 py-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
