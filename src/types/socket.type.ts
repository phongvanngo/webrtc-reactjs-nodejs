import { CreateRoomType, RequestJoinRoomType } from "../models/Room";
import { User } from "../models/User";

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    mess: (d: string) => void;
  }
  
  export interface ClientToServerEvents {
    hello: any
    createRoom: (user:User,room:CreateRoomType,callback:Function) => void;
    requestJoinRoom: (user:User,room:RequestJoinRoomType) => void;
  }
