import React, { useMemo, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";
import Image from "next/image";
import changeF from "./tools/changeF";

interface highlightProps {
  unit: string;
  handleUnit: () => void;
  data: InferGetStaticPropsType<GetStaticProps>;
  sunrise: string;
  sunset: string;
  windSpeed: number;
  visible: number;
  humidity: number;
  wind: { speed: number; deg: number };
  min_temp: number;
  max_temp: number;
  feelLike: number;
}

const Highlight: React.FC<highlightProps> = ({
  unit,
  handleUnit,
  // data,
  sunrise,
  sunset,
  windSpeed,
  visible,
  humidity,
  wind,
  min_temp,
  max_temp,
  feelLike,
}) => {
  const temp_condition: string = useMemo(() => {
    const value = unit === "c" ? changeF(feelLike) : feelLike;
    if (value > 80) return "hot";
    else if (value > 60) return "warm";
    else if (value > 40) return "cool";
    else return "cold";
  }, [feelLike, unit]);

  const vi_condition: string = useMemo(() => {
    if (visible > 6.66) return "clear";
    else if (visible > 3.33) return "average";
    return "foggy";
  }, [visible]);

  const h_condition: string = useMemo(() => {
    if (humidity >= 30 && humidity < 50) return "good";
    else if (humidity < 25 || humidity >= 70) return "poor";
    else return "fair";
  }, [humidity]);

  const [isC, setIsC] = useState(unit === "c" ? true : false);
  const handleChange = (curr: boolean) => {
    if (isC === curr) return;
    setIsC(() => !isC);
    handleUnit();
  };
  return (
    <div className="min-h-screen px-14 text-lg pb-8 pt-6  bg-white-custom">
      <header className="flex justify-between items-center mb-6">
        {/* <h2 className="text-lg">Today</h2> */}
        <h2 className="text-2xl capitalize">forecast hightLights</h2>
        <div className="flex justify-between bg-slate-200 rounded-full py-2">
          <button
            onClick={() => handleChange(true)}
            className={isC ? "active-btn" : "other-btn"}
          >
            °C
          </button>
          <div
            onClick={() => handleChange(false)}
            className={isC ? "other-btn" : "active-btn"}
          >
            °F
          </div>
        </div>
      </header>
      <section className="h-2/3">
        {/* <h2 className="text-2xl pb-8 capitalize">forecast hightLights</h2> */}
        <div className="grid grid-cols-3 md:gap-2 lg:gap-8">
          {/* feel like */}
          <div className="hightlight-item">
            <div>
              <p className="hl-h">feel like</p>
              <p className="main-text capitalize">
                {feelLike}
                <span>°{unit}</span>
              </p>
              <p className="hl-f">{temp_condition}</p>
            </div>
          </div>

          <div className="hightlight-item">
            <div>
              <p className="hl-h">wind status</p>
              <p className="main-text">
                {windSpeed}
                <span className="sec-text"> km/h</span>
              </p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-compass"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                  <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                </svg>
                <p className="hl-f px-2">{wind.deg}°</p>
              </div>
            </div>
          </div>

          <div className="hightlight-item">
            <div>
              <p className="hl-h">sunrise & sunset</p>
              <div className="main-text uppercase">
                <div className="flex items-center">
                  <div className="md:hidden lg:inline-block">
                    <Image
                      src="http://openweathermap.org/img/wn/02d@2x.png"
                      alt="sunrise"
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="md:text-xl lg:text-2xl">{sunrise}</p>
                </div>
                <div className="flex items-center">
                  <div className="md:hidden lg:inline-block">
                    <Image
                      src="http://openweathermap.org/img/wn/02n@2x.png"
                      alt="sunset"
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="md:text-xl lg:text-2xl">{sunset}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hightlight-item">
            <div>
              <p className="hl-h">humidity</p>
              <p className="main-text">
                {humidity}
                <span className="sec-text"> %</span>
              </p>
              <p className="hl-f">{h_condition}</p>
            </div>
          </div>

          <div className="hightlight-item">
            <div>
              <p className="hl-h">visibility</p>
              <p className="main-text">
                {visible}
                <span className="sec-text"> km</span>
              </p>
              <p className="hl-f">{vi_condition}</p>
            </div>
          </div>

          <div className="hightlight-item">
            <div className="w-full">
              <p className="hl-h">max & min</p>
              <div className="flex items-center justify-around">
                <div className="main-text text-center">
                  <p className="text-2xl">
                    {max_temp}
                    <span className="capitalize">°{unit}</span>
                  </p>
                  <p className="text-2xl">
                    {min_temp}
                    <span className="capitalize">°{unit}</span>
                  </p>
                </div>
                <div className="md:hidden lg:block">
                  <Image
                    src="/temperature.png"
                    alt="temp"
                    width={40}
                    height={83.2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Highlight;
