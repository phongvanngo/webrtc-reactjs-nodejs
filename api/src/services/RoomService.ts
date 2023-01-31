import { MemberModel } from "../model/MemberModel";
import { CreateRoom, RoomModel } from "../model/RoomModel";
import { UserModel } from "../model/UserModel";

export interface RoomService {
  createRoom: (
    socketId: string,
    user: UserModel,
    room: CreateRoom
  ) => [MemberModel, RoomModel];
  joinRoom: (user: UserModel, roomId: string) => void;
}
