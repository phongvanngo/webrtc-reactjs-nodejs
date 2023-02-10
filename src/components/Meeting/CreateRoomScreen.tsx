import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { roomAPI } from "../../app/api/roomAPI";
import SocketContext from "../../app/context/SocketContext";
import { CreateRoomType, Room } from "../../models/Room";
import { User } from "../../models/User";
import { CreateRoomRequestDTO } from "../../types/request";

type Props = {};

type FormData = {
  username: string;
  roomName: string;
  description: string;
};

export default function CreateRoomScreen({}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useContext(SocketContext).SocketDispatch;

  const onSubmit = handleSubmit(async (data) => {
    const createRoomRequestDTO: CreateRoomRequestDTO = {
      user: {
        username: data.username,
      },
      room: {
        roomName: data.roomName,
        description: data.description,
      },
      agora: {
        uid: 1,
        role: "PUBLISHER",
      },
    };
    try {
      const res = await roomAPI.createRoom(createRoomRequestDTO);
      console.log("create Room: ", res);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <label>usrname</label>
      <input {...register("username")} />
      <label>room name</label>
      <input {...register("roomName")} />
      <label>description</label>
      <input {...register("description")} />
      <button type="submit">SetValue</button>
    </form>
  );
}
