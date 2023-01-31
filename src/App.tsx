import { useState } from "react";
import "./App.css";
import DemoSocketIO from "./components/DemoSocketIO";

function App() {
  const [first, setFirst] = useState(null);
  return (
    <div className="App">
      <DemoSocketIO />
    </div>
  );
}

export default App;
