import { Socket } from "socket.io-client";
import { createContext } from "react";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socket.type";
import { User } from "../../models/User";
import { CreateRoomType, Room } from "../../models/Room";

export interface ISocketContextState {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;
  roomId:string | null
}

export const initialContextState: ISocketContextState = {
  socket: undefined,
  roomId:null
};

export type CreateRoomPayloadType = {
  user: User;
  room: CreateRoomType;
};

export type TSocketContextActions =
  | "update_socket"
  | "hello"
  | "joinRoom";
export type TSocketContextPayload =
  | Socket
  | string
  | null
  | User
  | CreateRoomPayloadType;

export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const SocketReducer = (
  state: ISocketContextState,
  action: ISocketContextActions
) => {
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
