import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { roomAPI } from "../../app/api/roomAPI";
import SocketContext from "../../app/context/SocketContext";
import { User } from "../../models/User";
import { RequestJoinRoomDTO } from "../../types/request";

type Props = {};

type FormData = {
  username: string;
  roomCode: number;
};

export default function JoinRoomForm({}: Props) {
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
    const myInfo: User = { username: data.username };
    const requestJoinRoomDTO: RequestJoinRoomDTO = {
      user: myInfo,
      room: {
        roomCode: data.roomCode,
      },
      agora: {
        uid: 1,
        role: "SUBCRIBER",
      },
    };
    handleSaveUserInfo(myInfo);
    try {
      const res = await roomAPI.joinRoom(requestJoinRoomDTO);
      navigate(`/${res.data.room.roomId}`);
    } catch (error: any) {
      alert(error.response.data);
    }
  });

  return (
    <form style={{ display: "block" }} onSubmit={onSubmit}>
      <label>username</label>
      <input {...register("username")} />
      <label>room name</label>
      <input type="number" {...register("roomCode", { valueAsNumber: true })} />
      <button type="submit">Join</button>
    </form>
  );
}
