import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useEffect, useMemo, useState } from "react";
import Forecast from "../components/forecast";
import Highlight from "../components/highlight";
import Navbar from "../components/navbar";
import Head from "next/head";
import { formatDate, formatTime } from "../components/tools/formatTime";
import changeF from "../components/tools/changeF";

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
  const [load, setLoad] = useState(false);
  const [nav, setNav] = useState(1);

  const handleUnit = () => {
    setUnit(() => (unit === "c" ? "f" : "c"));
  };
  const handleInput = (val: string) => {
    setInVal(val);
  };
  const handleLocation = (val: string) => {
    setLocation(val);
  };
  const handleNav = (val: number) => {
    setNav(val);
  };

  //Data Fetching
  useEffect(() => {
    setLoad(true);
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => setCorr([result[0].lat, result[0].lon]));
  }, [apiKey, location]);
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${corr[0]}&lon=${corr[1]}&units=metric&appid=${apiKey}`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoad(false);
      });
  }, [apiKey, corr]);

  //changing datas
  const temperature = useMemo(() => {
    return unit === "f" ? changeF(data.main.temp) : data.main.temp;
  }, [data.main.temp, unit]);
  const time = useMemo(() => {
    return formatDate(data.dt);
  }, [data.dt]);
  const sunrise = useMemo(() => {
    return formatTime(data.sys.sunrise);
  }, [data.sys.sunrise]);
  const sunset = useMemo(() => {
    return formatTime(data.sys.sunset);
  }, [data.sys.sunset]);
  const windSpeed: number = useMemo(() => {
    return parseFloat((data.wind.speed * 3.6).toFixed(2));
  }, [data.wind.speed]);
  const visible = useMemo(() => {
    return data.visibility / 1000;
  }, [data.visibility]);
  const min_temp: number = useMemo(
    () => (unit === "f" ? changeF(data.main.temp_min) : data.main.temp_min),
    [data.main.temp_min, unit]
  );
  const max_temp: number = useMemo(
    () => (unit === "f" ? changeF(data.main.temp_max) : data.main.temp_max),
    [data.main.temp_max, unit]
  );
  const feelLike: number = useMemo(
    () => (unit === "f" ? changeF(data.main.feels_like) : data.main.feels_like),
    [data.main.feels_like, unit]
  );

  return load ? (
    <>
      <Head>
        <title>Weather</title>
      </Head>
      <div className="bg-white-custom h-screen flex-center">
        <div className="text-4xl">Loading...</div>
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>Weather</title>
      </Head>
      <div className="md:grid md:grid-cols-7 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-1 flex justify-center">
          <Forecast
            unit={unit}
            nav={nav}
            inVal={inVal}
            handleInput={handleInput}
            handleLoc={handleLocation}
            humidity={data.main.humidity}
            weather={data.weather[0]}
            temperature={temperature}
            sunrise={sunrise}
            sunset={sunset}
            time={time}
            windSpeed={windSpeed}
            visible={visible}
            city={data.name}
            clouds={data.clouds.all}
          />
        </div>
        <div className="hidden md:block md:col-span-5 lg:col-span-3">
          <Highlight
            unit={unit}
            data={{ ...data }}
            handleUnit={handleUnit}
            sunrise={sunrise}
            sunset={sunset}
            windSpeed={windSpeed}
            visible={visible}
            humidity={data.main.humidity}
            wind={data.wind}
            min_temp={min_temp}
            max_temp={max_temp}
            feelLike={feelLike}
          />
        </div>
        <footer className="flex md:hidden justify-center">
          <nav className="bg-white fixed bottom-0">
            <Navbar handleNav={handleNav} />
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Home;
