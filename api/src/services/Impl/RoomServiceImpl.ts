import { MemberModel } from "../../model/MemberModel";
import { CreateRoom, RoomModel } from "../../model/RoomModel";
import { UserModel } from "../../model/UserModel";
import { RoomService } from "../RoomService";

export class RoomServiceImpl implements RoomService {
  rooms: RoomModel[];

  constructor() {
    this.rooms = [];
  }

  joinRoom(user: UserModel, roomId: string): void {}

  createRoom(
    socketId: string,
    user: UserModel,
    roomToCreate: CreateRoom
  ): [MemberModel, RoomModel] {
    const roomId = this.generateRoomId();
    const member: MemberModel = {
      username: user.username,
      socketId: socketId,
      isOwner: true,
      roomId: roomId,
    };
    const room: RoomModel = {
      ...roomToCreate,
      members: [member],
      roomId: roomId,
    };

    return [member, room];
  }

  generateRoomId(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
