import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { SIGNALING_BASEURL } from "../../app/constants";
import { RootState } from "../../app/store";

export interface ConnectionState {
  users:Array<any>
}

const initialState: ConnectionState = {users:[]};

const socket = io(SIGNALING_BASEURL, { forceNew: true });

socket.on("connect", () => {
  console.log("connect succesfully, socket id: ", socket.id);
});

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
  },
});

export const {} = connectionSlice.actions;

export default connectionSlice.reducer;
