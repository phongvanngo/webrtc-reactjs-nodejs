import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socket.type";
import { SIGNALING_BASEURL } from "../constants";
import SocketContext, {
  initialContextState,
  SocketContextProvider,
  SocketReducer,
} from "./SocketContext";

export interface ISocketContextProviderProps extends PropsWithChildren {}

const SocketContextComponent: FunctionComponent<ISocketContextProviderProps> = (
  props: ISocketContextProviderProps
) => {
  const { current: socket } = useRef<
    Socket<ServerToClientEvents, ClientToServerEvents>
  >(
    io("http://localhost:8999/np", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: false,
    })
  );

  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    initialContextState
  );

  useEffect(() => {
    console.log("run");
    socket.connect();
    SocketDispatch({ type: "update_socket", payload: socket });
    startListening();

    return () => {
      console.log("stop");
      socket.close();
    };
  }, []);

  const startListening = useCallback(() => {
    socket.on("connect", () => {
      console.log("hi id: ", socket.id);
    });
  }, []);

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {props.children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
