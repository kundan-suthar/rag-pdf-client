export enum AppState {
  INITIAL,
  UPLOADING,
  CHATTING,
}
export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}
