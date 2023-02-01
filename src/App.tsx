import { useEffect, useState } from "react";
import "./App.css";
import { DemoSocketContext } from "./components/DemoSocketContext";
import CreateRoomScreen from "./components/Meeting/CreateRoomScreen";

function App() {
  useEffect(() => {
    console.log("hifsef");
  }, []);

  return (
    <div className="App">
      <CreateRoomScreen />
    </div>
  );
}

export default App;
