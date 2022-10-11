import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import Forecast from "../components/forecast";
import Highlight from "../components/highlight";

export const getStaticProps: GetStaticProps = async () => {
  const apiUrl: string =
    "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=metric&appid=6f4ce8fe8d083f8d130b00284a08378b";
  const res = await fetch(apiUrl);
  const data = await res.json();
  return {
    props: { data },
  };
};

interface homeProps {
  data: InferGetStaticPropsType<typeof getStaticProps>;
}

const Home: React.FC<homeProps> = ({ data }) => {
  const [unit, setUnit] = useState("c");

  const handleUnit = () => {
    setUnit(() => {
      return unit === "c" ? "f" : "c";
    });
  };

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <Forecast unit={unit} data={data} />
      </div>
      <div className=" col-span-3">
        <Highlight handleUnit={handleUnit} />
      </div>
    </div>
  );
};

export default Home;