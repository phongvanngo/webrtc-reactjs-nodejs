import { Router } from "express";
import { createRoomHandler, requestJoinRoom } from "../controllers/room";

export const roomRouter = Router();

roomRouter.post("/create-room", createRoomHandler);
roomRouter.post("/join-room", requestJoinRoom);
