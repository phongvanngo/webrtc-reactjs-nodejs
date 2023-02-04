import { Request, Response } from "express";
import { CreateRoomRequestDTO } from "../dto/request/CreateRoomRequestDTO";
import { JoinRoomRequestDTO } from "../dto/request/JoinRoomRequestDTO";
import { RoomModel } from "../model/RoomModel";
import { RoomService } from "../services/RoomService";

export async function createRoomHandler(
  req: Request<{}, {}, CreateRoomRequestDTO>,
  res: Response<RoomModel | string | any>
) {
  try {
    const room = RoomService.createRoom(req.body);
    res.send(room);
  } catch (error: any) {
    return res.status(500).send(req.toString());
  }
}

export async function requestJoinRoom(
  req: Request<{}, {}, JoinRoomRequestDTO>,
  res: Response<RoomModel | string | any>
) {
  try {
    const room = RoomService.requestJoinRoom(req.body);
    if (!room) return res.status(404).send("Room Not Found");
    res.send(room);
  } catch (error: any) {
    return res.status(500).send(req.toString());
  }
}
