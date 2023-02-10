import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { io, Socket } from "socket.io-client";
import { OnNewMessageType } from "../../models/Message";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socket.type";
import { SIGNALING_BASEURL } from "../constants";
import {
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
    io(SIGNALING_BASEURL, {
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
      socket.on("newMemberJoinRoom", (member, room) => {
        console.log("new member: ", member, room);
      });
      socket.on("memberLeaveRoom", (member, room) => {
        console.log("member left Room: ", member, room);
      });
      socket.on("newMessageToGroup", (mess: OnNewMessageType) => {
        console.log("new message", mess);
        SocketDispatch({
          type: "new_message",
          payload: mess,
        });
      });
    });
  }, []);

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {props.children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
