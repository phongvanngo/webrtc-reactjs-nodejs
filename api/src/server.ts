import cors from "cors";
import express, { Express } from "express";
import { createServer } from "http";
import { AddressInfo } from "net";
import { Server } from "socket.io";
import { roomRouter } from "./routers/room";
import { roomSocketHandler } from "./sockets/roomSocketHandler";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types/websocket.type";

const app: Express = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/room", roomRouter);

// initialize a simple http server
const server = createServer(app);

// initialize the WebSocket server instance
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.of("/np").on("connection", (socket) => {
  roomSocketHandler(io, socket);
  console.log(socket.id);
});

// start our server
server.listen(process.env.PORT || 8999, () => {
  console.log(
    `Server started on port ${(server.address() as AddressInfo).port} :)`
  );
});
