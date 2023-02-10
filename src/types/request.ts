import { Room } from "../models/Room";
import { User } from "../models/User";

export interface CreateRoomRequestDTO {
  user: User;
  room: Pick<Room, "roomName" | "description">;
  agora: {
    uid: number;
    role: "SUBCRIBER" | "PUBLISHER";
  };
}

export interface RequestJoinRoomDTO {
  user: User;
  room: Pick<Room, "roomCode">;
  agora: {
    uid: number;
    role: "SUBCRIBER" | "PUBLISHER";
  };
}
