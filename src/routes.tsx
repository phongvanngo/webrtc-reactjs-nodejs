import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import CallingPage from "./pages/CallingPage/CallingPage";
import Homepage from "./pages/Homepage";
import JoinRoomPage from "./pages/JoinRoomPage/JoinRoomPage";

type Props = {};

export default function AppRoutes({}: Props) {
  return (
    <Routes>
      <Route path="/join" element={<JoinRoomPage />} />
      <Route path="/:roomId" element={<CallingPage />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}
