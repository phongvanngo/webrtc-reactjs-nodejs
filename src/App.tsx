import { useEffect, useState } from "react";
import "./App.css";
import { DemoSocketContext } from "./components/DemoSocketContext";
import CreateRoomScreen from "./components/Meeting/CreateRoomScreen";
import AppRoutes from "./routes";

function App() {
  useEffect(() => {
    console.log("hifsef");
  }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
