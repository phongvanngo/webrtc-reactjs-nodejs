import { Server, Socket } from "socket.io";
import { RequestJoinRoom } from "../model/RoomModel";
import { UserModel } from "../model/UserModel";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "../types/websocket.type";

export const roomSocketHandler = (
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) => {
  socket.on("requestJoinRoom", (user: UserModel, room: RequestJoinRoom) => {});
  socket.on("hello", (s: string) => {
    console.log(s);
  });
  socket.on("disconnect", () => {
    console.log(socket.id, " disconnected");
  });
};
