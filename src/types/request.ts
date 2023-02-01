import { Room } from "../models/Room";
import { User } from "../models/User";

export interface CreateRoomRequestDTO {
  user: User;
  room: Pick<Room, "roomName" | "description">;
}

export interface RequestJoinRoomDTO {
  user: User;
  room: Pick<Room, "roomId">;
}
