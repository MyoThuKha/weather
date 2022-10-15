import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useEffect, useMemo, useState } from "react";
import Forecast from "../components/forecast";
import Highlight from "../components/highlight";
import axios from "axios";
import Navbar from "../components/navbar";
import SMForecast from "../components/mobileForecast";

export const getStaticProps: GetStaticProps = async () => {
  const apiKey = process.env.API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=51.5073219&lon=-0.1276474&units=metric&appid=${apiKey}`;
  const res = await fetch(apiUrl);
  const initdata = await res.json();
  return {
    props: { apiKey, initdata },
  };
};

interface homeProps {
  apiKey: string;
  initdata: InferGetStaticPropsType<typeof getStaticProps>;
}

const Home: React.FC<homeProps> = ({ apiKey, initdata }) => {
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
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`
      )
      .then((res) => {
        setCorr([res.data[0].lat, res.data[0].lon]);
      });
  }, [apiKey, location]);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${corr[0]}&lon=${corr[1]}&units=metric&appid=${apiKey}`
      )
      .then((res) => {
        setData(res.data);
      });
  }, [apiKey, corr]);

  return (
    <>
      <div className="hidden md:grid md:grid-cols-4">
        <div className="col-span-1 flex justify-center">
          <Forecast
            unit={unit}
            inVal={inVal}
            handleInput={handleInput}
            handleLoc={handleLoc}
            data={{ ...data }}
          />
        </div>
        <div className="hidden md:block md:col-span-3">
          <Highlight unit={unit} data={{ ...data }} handleUnit={handleUnit} />
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <SMForecast
            unit={unit}
            inVal={inVal}
            handleInput={handleInput}
            handleLoc={handleLoc}
            data={{ ...data }}
          />
        </div>
        <footer className="flex md:hidden justify-center">
          <nav className="bg-white fixed bottom-0">
            <Navbar />
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Home;
