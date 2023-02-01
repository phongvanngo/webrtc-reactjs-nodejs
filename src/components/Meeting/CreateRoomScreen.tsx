import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import SocketContext from "../../app/context/SocketContext";
import { CreateRoomType } from "../../models/Room";
import { User } from "../../models/User";

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

  const onSubmit = handleSubmit((data) => {
    const user: User = {
      username: data.username,
    };
    const room: CreateRoomType = {
      roomName: data.roomName,
      description: data.description,
    };
    dispatch({
      type: "createRoom",
      payload: { user, room },
    });
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
