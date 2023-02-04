import { RoomModel } from "../../model/RoomModel";
import { UserModel } from "../../model/UserModel";

export interface JoinRoomDTO extends OnJoinRoomDTO {
  socketId: string;
}

export interface OnJoinRoomDTO {
  user: UserModel;
  room: Pick<RoomModel, "roomId">;
  offer: string;
}
