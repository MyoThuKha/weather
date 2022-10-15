import React, { useMemo } from "react";
import Image from "next/image";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { formatDate, formatTime } from "./tools/formatTime";
import changeF from "./tools/changeF";
import _ from "lodash";

interface smforecastProps {
  inVal: string;
  nav: number;
  handleInput: (val: string) => void;
  handleLoc: (val: string) => void;
  unit: string;
  data: InferGetStaticPropsType<GetStaticProps>;
}

const SMForecast: React.FC<smforecastProps> = ({
  unit,
  nav,
  inVal,
  handleInput,
  handleLoc,
  data,
}) => {
  const temperature = unit === "f" ? changeF(data.main.temp) : data.main.temp;
  const time = formatDate(data.dt);

  const Display = useMemo(() => {
    if (nav === 1) {
      return (
        <p>
          {data.main.temp}°<sup className="text-5xl">{unit}</sup>
        </p>
      );
    }
    if (nav === 2)
      return (
        <p>
          {_.ceil(data.wind.speed * 3.6, 2)}
          <span className="text-4xl lowercase"> km/h</span>
        </p>
      );
    if (nav === 3)
      return (
        <div className="text-5xl uppercase">
          <p className="hl-h">sunrise</p>
          <p>{formatTime(data.sys.sunrise)}</p>
          <p className="hl-h">sunset</p>
          <p>{formatTime(data.sys.sunset)}</p>
        </div>
      );
    if (nav === 4)
      return (
        <p>
          {data.main.humidity}
          <span className="text-4xl lowercase"> %</span>
        </p>
      );
    if (nav === 5)
      return (
        <p>
          {data.visibility / 1000}
          <span className="text-4xl lowercase"> km</span>
        </p>
      );
  }, [nav, data, unit]);

  return (
    <div className="px-10 py-8 min-h-screen mb-16">
      <section className="" style={{ minHeight: "50vh" }}>
        <input
          placeholder="City"
          className="input-box"
          value={inVal}
          onChange={(e) => {
            handleInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLoc(inVal);
            }
          }}
        />
        <div className="">
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="icon"
            width={120}
            height={120}
          />
        </div>
        <div>
          <div className="text-7xl capitalize">
            {/* {Display}°<sup className="text-5xl">{unit}</sup> */}
            {Display}
          </div>
          <p className="text-lg capitalize">
            {time[0]}, <span className=" text-gray-400">{time[1]}</span>
          </p>
        </div>
      </section>
      <hr />
      <section style={{ minHeight: "40vh" }} className="flex items-center">
        <div className="">
          <div className="py-4">
            <div className="flex items-center">
              <Image
                src={`http://openweathermap.org/img/wn/50d@2x.png`}
                alt="icon"
                width={40}
                height={40}
              />
              <p className="text-sm capitalize py-1">
                {data.weather[0].description}
              </p>
            </div>
            <div className="flex items-center">
              <Image
                src="http://openweathermap.org/img/wn/04d@2x.png"
                alt="icon"
                width={40}
                height={40}
              />
              <p className="text-sm">Cloud - {data.clouds.all}%</p>
            </div>
          </div>
          <div className="w-60 h-32 rounded-3xl text-white flex-center drop-shadow-2xl background">
            {data.name}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SMForecast;
