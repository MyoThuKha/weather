import React from "react";
import axios from "axios";
import Forecast from "./components/forecast";
import Highlight from "./components/highlight";

const App: React.FC = () => {
  const api: string =
    "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=6f4ce8fe8d083f8d130b00284a08378b";
  console.log(api);

  return (
    <div className=" grid grid-cols-4">
      <div className="col-span-1">
        <Forecast />
      </div>
      <div className=" col-span-3">
        <Highlight />
      </div>
    </div>
  );
};

export default App;
