import React from "react";
import { Message } from "../types/types";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-start space-x-3 max-w-lg ${
          isUser ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        {!isUser && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
        <div
          className={`${
            isUser ? "bg-indigo-600" : "bg-gray-700"
          } rounded-lg p-3`}
        >
          <p className="text-white whitespace-pre-wrap">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
