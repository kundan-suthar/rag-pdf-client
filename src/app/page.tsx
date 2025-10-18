"use client";
import { useCallback, useState } from "react";
import Sidebar from "./component/Sidebar";
import { AppState, Message } from "./types/types";
import WelcomeScreen from "./component/WelcomeScreen";
import FileUploader from "./component/FileUploader";
import ChatWindow from "./component/ChatWindow";

export default function Home() {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  // const [uploadedFile, setUploadedFile] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const handleNewChat = useCallback(() => {
    setAppState(AppState.UPLOADING);
    setMessages([]);
    // setUploadedFile(null);
  }, []);

  const handleSendMessage = async (text: string) => {
    // if (!text.trim() || !uploadedFile) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log("env var", process.env.NEXT_PUBLIC_SERVER_URI);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: inputValue }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          text || `message not sent ,err status:   ${res.status}`
        );
      }

      const answer = await res.json().catch(() => null);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: answer,
      };
      setMessages((prev) => [...prev, botMessage]);
      const utterThis = new SpeechSynthesisUtterance(answer);
      window.speechSynthesis.speak(utterThis);
    } catch (error) {
      console.error("Error from opnen AI  API:", error);
      const errorMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.INITIAL:
        return <WelcomeScreen onNewChat={handleNewChat} />;
      case AppState.UPLOADING:
        return (
          <FileUploader onfileUpload={setAppState} setLoad={setIsLoading} />
        );
      case AppState.CHATTING:
        return (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            inputValue={inputValue}
            onInputChange={setInputValue}
          />
        );
    }
  };
  return (
    <div className="flex h-screen w-full font-sans">
      <Sidebar onNewChat={handleNewChat} />
      <main className="flex-1 flex flex-col bg-gray-800">
        {renderContent()}
      </main>
    </div>
  );
}
