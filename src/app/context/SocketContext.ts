import { Socket } from "socket.io-client";
import { createContext } from "react";
import { ClientToServerEvents, ServerToClientEvents } from "../../types/socket.type";

export interface ISocketContextState {
  socket:Socket<ServerToClientEvents, ClientToServerEvents> | undefined;
}

export const initialContextState: ISocketContextState = {
  socket: undefined,
};

export type TSocketContextActions = "update_socket" | "hello";
export type TSocketContextPayload = Socket | string | null;

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
      const socket = state.socket;
      console.log(state);
      socket?.emit("hello",`hi my socket id: ${socket.id}`);
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
