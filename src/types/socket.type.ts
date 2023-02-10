import { Member } from "../models/Member";
import { EmitMessageType, OnNewMessageType } from "../models/Message";
import {
  CreateRoomType,
  JoinRoomType,
  RequestJoinRoomType,
  Room,
} from "../models/Room";
import { User } from "../models/User";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  mess: (d: string) => void;
  newMemberJoinRoom: (member: Member, room: Room) => void;
  memberLeaveRoom: (member: Member, room: Room) => void;
  newMessageToGroup: (mess: OnNewMessageType) => void;
}

export interface ClientToServerEvents {
  hello: any;
  createRoom: (user: User, room: CreateRoomType, callback: Function) => void;
  joinRoom: (data: JoinRoomType) => void;
  message: (date: EmitMessageType) => void;
}
