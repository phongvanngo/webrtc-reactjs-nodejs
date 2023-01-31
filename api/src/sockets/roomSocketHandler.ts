import { Server, Socket } from "socket.io";
import { CreateRoom, RequestJoinRoom } from "../model/RoomModel";
import { UserModel } from "../model/UserModel";
import { RoomServiceImpl } from "../services/Impl/RoomServiceImpl";
import { RoomService } from "../services/RoomService";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/websocket.type";

const roomService: RoomService = new RoomServiceImpl();

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
  socket.on(
    "createRoom",
    (user: UserModel, roomToCreate: CreateRoom, callback: Function) => {
      const [member, room] = roomService.createRoom(
        socket.id,
        user,
        roomToCreate
      );
      socket.join(room.roomId);
      callback({ member, room });
    }
  );
  socket.on("requestJoinRoom", (user: UserModel, room: RequestJoinRoom) => {});
  socket.on("hello", (s: string) => {
    console.log(s);
  });
  socket.on("disconnect", () => {
    console.log(socket.id, " disconnected");
  });
};
