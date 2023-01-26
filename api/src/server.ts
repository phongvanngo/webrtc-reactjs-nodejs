const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketio(server).sockets;

//* Websocket *//
io.on("connection", function (socket: any) {
  socket.on("join-room");
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`));
