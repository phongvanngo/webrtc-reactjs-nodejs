import { MemberModel } from "../model/MemberModel";
import { RequestJoinRoom, RoomModel } from "../model/RoomModel";
import { UserModel } from "../model/UserModel";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  mess: (d: string) => void;
  newMemberJoinRoom: (member: MemberModel) => void;
  joinRoom: (room: RoomModel) => void;
}

export interface ClientToServerEvents {
  hello: (s: string) => void;
  message: (data: string) => void;
  requestJoinRoom: (user: UserModel, room: RequestJoinRoom) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
