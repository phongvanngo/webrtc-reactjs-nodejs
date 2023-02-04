import { useContext } from "react";
import { useForm } from "react-hook-form";
import { roomAPI } from "../../app/api/roomAPI";
import SocketContext from "../../app/context/SocketContext";
import { CreateRoomRequestDTO } from "../../types/request";
import { useNavigate } from "react-router-dom";
import { Room } from "../../models/Room";
import { AxiosResponse } from "axios";
import { User } from "../../models/User";

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

  const handleSaveUserInfo = (user: User) => {
    dispatch({ type: "update_user", payload: user });
  };

  const onSubmit = handleSubmit(async (data) => {
    const myData: User = {
      username: data.username,
    };
    const createRoomRequestDTO: CreateRoomRequestDTO = {
      user: myData,
      room: {
        roomName: data.roomName,
        description: data.description,
      },
    };
    handleSaveUserInfo(myData);
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
