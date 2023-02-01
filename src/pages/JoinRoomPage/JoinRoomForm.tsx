import { useContext } from "react";
import { useForm } from "react-hook-form";
import { roomAPI } from "../../app/api/roomAPI";
import SocketContext from "../../app/context/SocketContext";
import { CreateRoomRequestDTO, RequestJoinRoomDTO } from "../../types/request";
import { useNavigate } from "react-router-dom";
import { Room } from "../../models/Room";
import { AxiosError } from "axios";

type Props = {};

type FormData = {
  username: string;
  roomId: string;
};

export default function JoinRoomForm({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useContext(SocketContext).SocketDispatch;

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const requestJoinRoomDTO: RequestJoinRoomDTO = {
      user: {
        username: data.username,
      },
      room: {
        roomId: data.roomId,
      },
    };
    try {
      const res = await roomAPI.joinRoom(requestJoinRoomDTO);
      navigate(`/${res.data.roomId}`);
    } catch (error: any) {
      alert(error.response.data);
    }
  });

  return (
    <form style={{ display: "block" }} onSubmit={onSubmit}>
      <label>username</label>
      <input {...register("username")} />
      <label>room name</label>
      <input {...register("roomId")} />
      <button type="submit">Join</button>
    </form>
  );
}
