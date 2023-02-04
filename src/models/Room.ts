import { Member } from "./Member";
import { User } from "./User";

export interface Room {
  roomName: string;
  roomId: string;
  roomCode: number;
  description: string;
  members: Member[];
}

export type CreateRoomType = Pick<Room, "roomName" | "description">;

export type RequestJoinRoomType = {
  roomId: string;
};

export type JoinRoomType = {
  user: User;
  room: Pick<Room, "roomId">;
  offer: string;
};
