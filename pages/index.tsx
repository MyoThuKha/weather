import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useEffect, useMemo, useState } from "react";
import Forecast from "../components/forecast";
import Highlight from "../components/highlight";
import axios from "axios";

export const getStaticProps: GetStaticProps = async () => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=51.5073219&lon=-0.1276474&units=metric&appid=6f4ce8fe8d083f8d130b00284a08378b`;
  const res = await fetch(apiUrl);
  const initdata = await res.json();
  return {
    props: { initdata },
  };
};

interface homeProps {
  initdata: InferGetStaticPropsType<typeof getStaticProps>;
}

const Home: React.FC<homeProps> = ({ initdata }) => {
  const [data, setData] = useState(initdata);
  const [unit, setUnit] = useState("c");
  const [inVal, setInVal] = useState("");
  const [location, setLocation] = useState("london");
  const [corr, setCorr] = useState<number[]>([51.5073219, -0.1276474]);

  const handleInput = (val: string) => {
    setInVal(val);
  };
  const handleLoc = (val: string) => {
    setLocation(val);
  };
  const handleUnit = () => {
    setUnit(() => {
      return unit === "c" ? "f" : "c";
    });
  };
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=6f4ce8fe8d083f8d130b00284a08378b`
      )
      .then((res) => {
        setCorr([res.data[0].lat, res.data[0].lon]);
      });
  }, [location]);
  console.log(corr);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${corr[0]}&lon=${corr[1]}&units=metric&appid=6f4ce8fe8d083f8d130b00284a08378b`
      )
      .then((res) => {
        setData(res.data);
      });
  }, [corr]);
  console.log(data);

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
