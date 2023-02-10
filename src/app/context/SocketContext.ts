import { createContext } from "react";
import { Socket } from "socket.io-client";
import { EmitMessageType, Message } from "../../models/Message";
import { CreateRoomType, JoinRoomType } from "../../models/Room";
import { User } from "../../models/User";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socket.type";

export interface ISocketContextState {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;
  roomId: string | null;
  user: User | null;
  offer: string | null;

  messages: Message[];
}

export const initialContextState: ISocketContextState = {
  socket: undefined,
  roomId: null,
  user: { username: "unknown" },
  offer: "unknown",
  messages: [],
};

export type CreateRoomPayloadType = {
  user: User;
  room: CreateRoomType;
};

export type TSocketContextActions =
  | "update_socket"
  | "hello"
  | "joinRoom"
  | "update_user"
  | "update_offer"
  | "send_message"
  | "new_message";
export type TSocketContextPayload =
  | Socket
  | string
  | null
  | User
  | CreateRoomPayloadType
  | JoinRoomType
  | EmitMessageType
  | Message;

export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const SocketReducer = (
  state: ISocketContextState,
  action: ISocketContextActions
): ISocketContextState => {
  console.log(
    "Message recieved - Action: " + action.type + " - Payload: ",
    action.payload
  );

  switch (action.type) {
    case "update_socket":
      return { ...state, socket: action.payload as Socket };
    case "hello":
      console.log(state);
      state.socket?.emit("hello", `hi my socket id: ${state.socket.id}`);
      return { ...state };
    case "joinRoom":
      state.socket?.emit("joinRoom", action.payload as JoinRoomType);
      return state;
    case "update_user":
      return { ...state, user: action.payload as User };
    case "update_offer":
      return { ...state, offer: action.payload as string };
    case "new_message":
      if (!state.socket) return state;
      const mess = action.payload as Message;
      return { ...state, messages: [...state.messages, mess] };
    case "send_message":
      if (state.socket) {
        const mess = action.payload as EmitMessageType;
        state.socket.emit("message", mess);
      }
      return state;
    default:
      return state;
  }
};

export interface ISocketContextProps {
  SocketState: ISocketContextState;
  SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
  SocketState: initialContextState,
  SocketDispatch: () => {},
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
