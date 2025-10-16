import { Bot } from "lucide-react";
import React from "react";

interface WelcomeScreenProps {
  onNewChat: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNewChat }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <Bot size={100} />
      <h1 className="mt-6 text-3xl font-bold text-white">
        Open AI powered pdf chat bot
      </h1>
      <p className="mt-2 max-w-lg text-gray-400">
        Start a new conversation by uploading an pdf file. I&apos;m ready to
        answer your questions about it.
      </p>
      <button
        onClick={onNewChat}
        className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
      >
        Start New Chat
      </button>
    </div>
  );
};

export default WelcomeScreen;
