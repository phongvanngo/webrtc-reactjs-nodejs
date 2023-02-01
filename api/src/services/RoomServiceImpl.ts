import { CreateRoomRequestDTO } from "../dto/request/CreateRoomRequestDTO";
import { JoinRoomRequestDTO } from "../dto/request/JoinRoomRequestDTO";
import { RoomModel } from "../model/RoomModel";
import { UserModel } from "../model/UserModel";

export class RoomService {
  static rooms: RoomModel[] = [];

  static joinRoom(user: UserModel, roomId: string): void {}

  static gnerateRoomId(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static createRoom({ user, room }: CreateRoomRequestDTO): RoomModel {
    const roomId = RoomService.gnerateRoomId();
    const newRoom: RoomModel = {
      ...room,
      members: [],
      roomId: roomId,
    };
    this.rooms.push(newRoom);
    return newRoom;
  }
  static requestJoinRoom({
    user,
    room: { roomId },
  }: JoinRoomRequestDTO): RoomModel | null {
    const room = this.rooms.find((r) => r.roomId === roomId);
    if (room) return room;
    return null;
  }
}
