import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Ago from "./components/Agora/ago2";
import AgoraMeeting from "./components/Agora/AgoraMeeting";
import CallingPage from "./pages/CallingPage/CallingPage";
import ChatPage from "./pages/ChatPage";
import Homepage from "./pages/Homepage";
import JoinRoomPage from "./pages/JoinRoomPage/JoinRoomPage";

type Props = {};

export default function AppRoutes({}: Props) {
  return (
    <Routes>
      <Route path="/join" element={<JoinRoomPage />} />
      <Route path="/agora" element={<Ago />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/:roomId" element={<CallingPage />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}
