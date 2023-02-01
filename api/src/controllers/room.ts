import { Request, Response } from "express";
import { CreateRoomRequestDTO } from "../dto/request/CreateRoomRequestDTO";
import { RoomModel } from "../model/RoomModel";
import { RoomService } from "../services/RoomServiceImpl";

export async function createRoomHandler(
  req: Request<{}, {}, CreateRoomRequestDTO>,
  res: Response<RoomModel | string | any>
) {
  try {
    const room = RoomService.createRoom(req.body);
    res.send(room);
  } catch (error:any) {
    return res.status(500).send(req.toString());
  }
}
