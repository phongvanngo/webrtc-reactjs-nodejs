import express, { Express } from "express";
import { createServer } from "http";
import { AddressInfo } from "net";
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types/websocket";

const app: Express = express();

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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (data) => {
    console.log(data);
  });
  io.emit("mess", "You joined!");
  socket.on("disconnect", (reason) => {
    console.log("User disconnect: ", socket.id);
  });
});

// start our server
server.listen(process.env.PORT || 8999, () => {
  console.log(
    `Server started on port ${(server.address() as AddressInfo).port} :)`
  );
});
