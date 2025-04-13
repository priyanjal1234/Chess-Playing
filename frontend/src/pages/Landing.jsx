import React, { useEffect, useState } from "react";
import { Users, UserPlus, Bot, ChevronRight } from "lucide-react";
import socket, { connectSocket } from "../socket/socket.js";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [showLoader, setshowLoader] = useState(false);
  const [showLoadingText, setshowLoadingText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    connectSocket();

    socket.on("single", function (singleData) {
      if (singleData === "Waiting for other player") {
        setshowLoader(true);
        setshowLoadingText("Finding the Opponent");
      }
    });

    socket.on("startGame", function (data) {
      setshowLoader(false);
      navigate(`/room/${data.roomId}/${data.color}`);
    });
  }, []);

  function handleRandomMatchmaking() {
    socket.emit("random-play");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* Hero Section */}
      <div className="flex items-center gap-3 mb-8">
        <ChevronRight size={48} className="text-emerald-500" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Chess Master
        </h1>
      </div>

      <p className="text-gray-400 text-lg mb-12 text-center max-w-2xl">
        Challenge players from around the world, play with friends, or improve
        your skills against our AI
      </p>

      {/* Game Mode Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <button
          disabled={showLoader}
          className="flex flex-col items-center p-8 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all transform hover:scale-105 border-2 border-emerald-500/20 hover:border-emerald-500"
          onClick={handleRandomMatchmaking}
        >
          <Users className="w-12 h-12 mb-4 text-emerald-500" />
          <h2 className="text-xl font-semibold mb-2">Random Player</h2>
          <p className="text-gray-400 text-center text-sm">
            Match with players of similar skill level
          </p>
          {showLoader && <span className="">{showLoadingText}</span>}
        </button>

        <button
          className="flex flex-col items-center p-8 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all transform hover:scale-105 border-2 border-blue-500/20 hover:border-blue-500"
          onClick={() => console.log("Play with friend")}
        >
          <UserPlus className="w-12 h-12 mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold mb-2">Play with Friend</h2>
          <p className="text-gray-400 text-center text-sm">
            Challenge a friend to a private match
          </p>
        </button>

        <button
          className="flex flex-col items-center p-8 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all transform hover:scale-105 border-2 border-purple-500/20 hover:border-purple-500"
          onClick={() => console.log("Play vs Computer")}
        >
          <Bot className="w-12 h-12 mb-4 text-purple-500" />
          <h2 className="text-xl font-semibold mb-2">Play vs Computer</h2>
          <p className="text-gray-400 text-center text-sm">
            Practice against our advanced AI
          </p>
        </button>
      </div>

      {/* Background Pattern */}
      <div
        className="fixed inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default Landing;
