import { Room } from "../../models/Room";
import { CreateRoomRequestDTO, RequestJoinRoomDTO } from "../../types/request";
import axiosClient from "./axiosClient";

export const roomAPI = {
  createRoom: (request: CreateRoomRequestDTO) => {
    const url = "/room/create-room";
    return axiosClient.post<Room>(url, request);
  },
  joinRoom: (request: RequestJoinRoomDTO) => {
    const url = "/room/join-room";
    return axiosClient.post<any>(url, request);
  },
};
