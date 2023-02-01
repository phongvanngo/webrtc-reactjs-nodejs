import { Member } from "./Member";

export interface Room {
  roomName: string;
  roomId: string;
  description: string;
  members: Member[];
}

export type CreateRoomType = Pick<Room, "roomName" | "description">;

export type RequestJoinRoomType = {
  roomId: string;
};