export interface Member {
  socketId: string;
  username: string;
  offer?: Object;
  answer?: Object;
  isOwner: boolean;
  roomId: string;
}
