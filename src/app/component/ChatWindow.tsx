import React, { useRef, useEffect } from "react";
import { Message } from "../types/types";
import ChatMessage from "./ChatMessage";
import { Mic } from "lucide-react";

interface ChatWindowProps {
  messages: Message[];
  inputValue: string;
  onSendMessage: (text: string) => void;
  onInputChange: (value: string) => void;
  isLoading: boolean;
}

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
    />
  </svg>
);

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  inputValue,
  onSendMessage,
  isLoading,
  onInputChange,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(inputValue);
    onInputChange("");
  };
  const handleOnRecord = () => {
    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    recognition.onresult = async function (e) {
      const transcript = e.results[0][0].transcript;
      onInputChange(transcript);
      // setInputValue(transcript);
      console.log("event: ", e);
    };
    recognition.start();
  };

  return (
    <div className="flex flex-col h-dvh p-4">
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-start space-x-3">
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
            <div className="bg-gray-700 rounded-lg p-3 max-w-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Type your message..."
            rows={2}
            className="flex-1 p-3 bg-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handleOnRecord}
            className="hover:cursor-pointer p-3  bg-indigo-600 rounded-full text-white disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
          >
            <Mic className="w-6 h-6" />
          </button>
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-indigo-600 rounded-full text-white disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
