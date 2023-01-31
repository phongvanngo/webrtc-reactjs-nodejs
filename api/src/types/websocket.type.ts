import { CreateRoom, RequestJoinRoom, RoomModel } from "../model/RoomModel";
import { UserModel } from "../model/UserModel";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  mess: (d: string) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  message: (data: string) => void;
  join: (roomId: string, callback: Function) => void;
  createRoom: (user: UserModel, room: CreateRoom, callback: Function) => void;
  requestJoinRoom: (user: UserModel, room: RequestJoinRoom) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
