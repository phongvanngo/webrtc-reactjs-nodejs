import { Router } from "express";
import { createRoomHandler } from "../controllers/room";

export const roomRouter = Router();

roomRouter.post("/create-room", createRoomHandler);
