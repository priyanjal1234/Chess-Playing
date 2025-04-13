import React from "react";
import { Chessboard } from "react-chessboard";

const ChessGame = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Chessboard boardWidth={400} />
      </div>
    </div>
  );
};

export default ChessGame;
