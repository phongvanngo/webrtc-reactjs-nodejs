import { CreateRoomRequestDTO } from "../dto/request/CreateRoomRequestDTO";
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
    return newRoom;
  }
}
