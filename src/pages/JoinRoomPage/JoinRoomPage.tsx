import React from "react";
import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";

type Props = {};

export default function JoinRoomPage({}: Props) {
  const handleCreateRoom = () => {};
  const handleJoinRoom = () => {};
  return (
    <div>
      <h1>Create Room</h1>
      <CreateRoomForm />
      <h1>Join Room</h1>
      <JoinRoomForm />
    </div>
  );
}
