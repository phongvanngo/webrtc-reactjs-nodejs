import { MemberModel } from "./MemberModel";

export interface RoomModel {
  roomName: string;
  roomId: string;
  description: string;
  members: MemberModel[];
}

export type RequestJoinRoom = {
  roomId: string;
};
