import React, { useContext } from "react";
import SocketContext from "../app/context/SocketContext";
import SocketContextComponent from "../app/context/SocketContextComponent";

type Props = {};

export function DemoSocketContext({}: Props) {
  return (
    <SocketContextComponent>
      <ChatComponent />
    </SocketContextComponent>
  );
}

export default function ChatComponent() {
  const state = useContext(SocketContext).SocketState;
  const SocketDispatch = useContext(SocketContext).SocketDispatch;
  return (
    <div>
      <button
        onClick={() => {
          SocketDispatch({ type: "hello", payload: null });
        }}
      >hi</button>
    </div>
  );
}
