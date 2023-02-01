import { useEffect, useState } from "react";
import "./App.css";
import {
  DemoSocketContext
} from "./components/DemoSocketContext";

function App() {
  useEffect(() => {
    console.log("hifsef");
  }, [])
  
  return (
    <div className="App">
      <DemoSocketContext />
    </div>
  );
}

export default App;
