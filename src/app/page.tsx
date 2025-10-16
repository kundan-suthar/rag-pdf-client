"use client";
import { useCallback, useState } from "react";
import Sidebar from "./component/Sidebar";
import { AppState, Message } from "./types/types";
import WelcomeScreen from "./component/WelcomeScreen";
import FileUploader from "./component/FileUploader";
import ChatWindow from "./component/ChatWindow";

export default function Home() {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNewChat = useCallback(() => {
    setAppState(AppState.UPLOADING);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.INITIAL:
        // return <WelcomeScreen onNewChat={handleNewChat} />;
        return <ChatWindow messages={messages} isLoading={isLoading} />;
    }
  };
  return (
    <div className="flex h-screen w-full font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-gray-800">
        {renderContent()}
      </main>
    </div>
  );
}
