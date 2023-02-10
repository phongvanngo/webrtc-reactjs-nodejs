import React, { useContext, useReducer, useRef } from "react";
import SocketContext from "../app/context/SocketContext";
import { EmitMessageType } from "../models/Message";

type Props = {};

export default function ChatPage({}: Props) {
  const { messages } = useContext(SocketContext).SocketState;
  const dispatch = useContext(SocketContext).SocketDispatch;
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSendMessage = () => {
    if (!inputRef.current) return;
    const message: EmitMessageType = {
      content: inputRef.current.value,
      username: "unknown",
    };
    console.log("send message: ", message);
    dispatch({
      type: "send_message",
      payload: message,
    });
  };
  return (
    <div>
      <h1>Chat Page</h1>
      <div>Chat List</div>
      <div>
        {messages.map((mess) => {
          return (
            <div>
              {mess.username}:{mess.content}
            </div>
          );
        })}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <input ref={inputRef} />
        <button type="submit">send</button>
      </form>
    </div>
  );
}
