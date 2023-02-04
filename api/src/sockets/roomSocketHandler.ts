import { Server, Socket } from "socket.io";
import { OnJoinRoomDTO } from "../dto/onMessage/onJoinRoom";
import { RequestJoinRoom } from "../model/RoomModel";
import { UserModel } from "../model/UserModel";
import { RoomService } from "../services/RoomService";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
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
  socket.on("joinRoom", (onJoinRoom: OnJoinRoomDTO) => {
    console.log("joinRoom: ", onJoinRoom);
    const [newMember, room] = RoomService.joinRoom({
      ...onJoinRoom,
      socketId: socket.id,
    });

    if (!room || !room.roomId) return;
    socket.join(room.roomId);
    socket.to(room.roomId).emit("newMemberJoinRoom", newMember, room);
    socket.emit("newMemberJoinRoom", newMember, room);
    socket.on("disconnect", () => {
      if (room.roomId) {
        const [memberLeft, roomUpdated] = RoomService.leaveRoom(
          room.roomId,
          socket.id
        );
        if (memberLeft) {
          socket
            .to(room.roomId)
            .emit("memberLeaveRoom", memberLeft, roomUpdated);
        }
      }
    });
  });

  socket.on("hello", (s: string) => {
    console.log(s);
  });
  socket.on("disconnect", () => {
    console.log(socket.id, " disconnected");
  });
};
