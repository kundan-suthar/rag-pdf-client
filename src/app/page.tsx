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
    setMessages([]);
    setUploadedFile(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.INITIAL:
        return <WelcomeScreen onNewChat={handleNewChat} />;
      case AppState.UPLOADING:
        return (
          <FileUploader onfileUpload={setAppState} setLoad={setIsLoading} />
        );
      case AppState.CHATTING:
        return <ChatWindow messages={messages} isLoading={isLoading} />;
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
