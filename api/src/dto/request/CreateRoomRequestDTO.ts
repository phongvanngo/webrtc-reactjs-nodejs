import { RoomModel } from "../../model/RoomModel";
import { UserModel } from "../../model/UserModel";

export interface CreateRoomRequestDTO {
  user: UserModel;
  room: Pick<RoomModel, "roomName" | "description">;
}
