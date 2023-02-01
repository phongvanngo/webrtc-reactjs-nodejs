import { useContext } from "react";
import { useForm } from "react-hook-form";
import { roomAPI } from "../../app/api/roomAPI";
import SocketContext from "../../app/context/SocketContext";
import { CreateRoomRequestDTO } from "../../types/request";
import { useNavigate } from "react-router-dom";
import { Room } from "../../models/Room";
import { AxiosResponse } from "axios";

type Props = {};

type FormData = {
  username: string;
  roomName: string;
  description: string;
};

export default function CreateRoomForm({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useContext(SocketContext).SocketDispatch;

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const createRoomRequestDTO: CreateRoomRequestDTO = {
      user: {
        username: data.username,
      },
      room: {
        roomName: data.roomName,
        description: data.description,
      },
    };
    try {
      const res: AxiosResponse<Room> = await roomAPI.createRoom(
        createRoomRequestDTO
      );
      console.log("create Room: ", res);
      navigate(`/${res.data.roomId}`);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form style={{ display: "block" }} onSubmit={onSubmit}>
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
