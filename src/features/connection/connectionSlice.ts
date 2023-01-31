import { createSlice } from "@reduxjs/toolkit";
import { AnyAaaaRecord } from "dns";
import { io } from "socket.io-client";
import { SIGNALING_BASEURL } from "../../app/constants";
import { RootState } from "../../app/store";
import { Room } from "../../models/Room";

export interface ConnectionState {
  users: Array<any>;
  room?: any ;
}

const initialState: ConnectionState = { users: [], room: undefined };

const socket = io(`${SIGNALING_BASEURL}/np`, { forceNew: true });

socket.on("connect", () => {
  console.log("connect succesfully, socket id: ", socket.id);
});

const testSend = (txt: string) => {
  socket.emit("join", "hi", (data: any) => {
    console.log(data);
  });
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    createRoom: (state, action) => {
      let { user, roomToCreate } = action.payload;
      socket.emit("createRoom", user, roomToCreate, (res: any) => {
        console.log(res.room);
        state.room = res.room;
      });
    },
  },
});

export const { createRoom } = connectionSlice.actions;

export default connectionSlice.reducer;
