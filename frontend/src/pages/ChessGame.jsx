import React from "react";
import { Chessboard } from "react-chessboard";
import { useParams } from "react-router-dom";

const ChessGame = () => {
  const { color } = useParams();
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
        <Chessboard boardOrientation={color === 'white' ? 'white' : 'black'} boardWidth={400} />
      </div>
    </div>
  );
};

export default ChessGame;
