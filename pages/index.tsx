import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useEffect, useState } from "react";
import Forecast from "../components/forecast";
import Highlight from "../components/highlight";

export const getStaticProps: GetStaticProps = async () => {
  const apiUrl: string = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=metric&appid=6f4ce8fe8d083f8d130b00284a08378b`;
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
  const [inVal, setInVal] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    const api = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=6f4ce8fe8d083f8d130b00284a08378b`;
  }, [location]);

  const handleInput = (val: string) => {
    setInVal(val);
  };
  const handleLoc = (val: string) => {
    setLocation(val);
  };

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <Forecast
          unit={unit}
          inVal={inVal}
          handleInput={handleInput}
          handleLoc={handleLoc}
          data={{ ...data }}
        />
      </div>
      <div className=" col-span-3">
        <Highlight unit={unit} data={{ ...data }} handleUnit={handleUnit} />
      </div>
    </div>
  );
};

export default Home;
