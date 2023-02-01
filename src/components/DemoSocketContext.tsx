import React, { useContext } from "react";
import SocketContext from "../app/context/SocketContext";
import SocketContextComponent from "../app/context/SocketContextComponent";

type Props = {};

export function DemoSocketContext({}: Props) {
  return <ChatComponent />;
}

export default function ChatComponent() {
  const SocketDispatch = useContext(SocketContext).SocketDispatch;
  return (
    <div>
      <button
        onClick={() => {
          SocketDispatch({ type: "hello", payload: null });
        }}
      >
        hi
      </button>
    </div>
  );
}
