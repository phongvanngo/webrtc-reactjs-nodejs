import { useState } from "react";
import "./App.css";
import {
  DemoSocketContext
} from "./components/DemoSocketContext";

function App() {
  const [first, setFirst] = useState(null);
  return (
    <div className="App">
      <DemoSocketContext />
    </div>
  );
}

export default App;
