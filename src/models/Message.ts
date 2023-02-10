export interface Message {
  content: string;
  username: string;
  socketId: string;
}

export type EmitMessageType = Omit<Message, "socketId">;

export type OnNewMessageType = Message;
