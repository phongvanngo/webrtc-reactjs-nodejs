import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import SocketContext, { SocketReducer } from "../../app/context/SocketContext";
import { JoinRoomType } from "../../models/Room";

type Props = {};

export default function CallingPage({}: Props) {
  const { roomId } = useParams();
  const dispatch = useContext(SocketContext).SocketDispatch;
  const { socket, user, offer } = useContext(SocketContext).SocketState;
  const joinRoomHandler = () => {
    console.log("roomId:", roomId);
    if (!roomId || !offer || !user) return;
    const joinRoomRequest: JoinRoomType = {
      offer: offer,
      room: {
        roomId: roomId,
      },
      user: user,
    };
    dispatch({ type: "joinRoom", payload: joinRoomRequest });
  };
  useEffect(() => {
    if (socket) {
      joinRoomHandler();
    }
  }, [socket]);

  if (!socket) return <div>waiting for socket connection</div>;

  return <div>CallingPage</div>;
}
