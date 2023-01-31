import React, { useCallback, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { SIGNALING_BASEURL } from "../app/constants";
import { useAppDispatch } from "../app/hooks";
import { createRoom } from "../features/connection/connectionSlice";

type Props = {};

export default function DemoSocketIO({}: Props) {
  const dispatch = useAppDispatch();
  const createRoomHandler = () => {
    let user = {
      username: "novapo",
    };
    let room = {
      roomName: "kakaka",
      description: "descipriton",
    };
    dispatch(createRoom({ user, roomToCreate: room }));
  };
  return (
    <div>
      <button
        onClick={() => {
          createRoomHandler();
        }}
      >
        Create
      </button>
    </div>
  );
}
