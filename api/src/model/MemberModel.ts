export interface MemberModel {
  socketId: string;
  username: string;
  offer?: Object;
  answer?: Object;
  isOwner?: boolean;
  roomId: string;
}
