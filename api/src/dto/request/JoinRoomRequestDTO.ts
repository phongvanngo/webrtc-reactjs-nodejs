import { RoomModel } from "../../model/RoomModel";
import { UserModel } from "../../model/UserModel";

export interface JoinRoomRequestDTO {
  user: UserModel;
  room: Pick<RoomModel, "roomCode">;
}
