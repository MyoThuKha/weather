import React, { useEffect, useState } from "react";
import Image from "next/image";
import { InferGetStaticPropsType } from "next";
import { formatDate } from "./tools/formatTime";
interface forecastProps {
  inVal: string;
  handleInput: (val: string) => void;
  handleLoc: (val: string) => void;
  unit: string;
  temp: string;
  weather: string;
  icon: string;
  dt: number;
  cloud: number;
}

const Forecast: React.FC<forecastProps> = ({
  inVal,
  handleInput,
  handleLoc,
  unit,
  temp,
  weather,
  icon,
  dt,
  cloud,
}) => {
  let temperature = temp;
  if (unit === "f") {
    temperature = ((parseFloat(temp) * 9) / 5 + 32).toFixed(2);
  }
  const time = formatDate(dt);

  return (
    <div className="px-10 py-8 min-h-screen">
      <section style={{ height: "50vh" }}>
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
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="icon"
            width={120}
            height={120}
          />
        </div>
        <div>
          <p className="text-7xl capitalize">
            {temperature}°<sup>{unit}</sup>
          </p>
          <p className="text-lg capitalize">
            {time[0]}, <span className=" text-gray-400">{time[1]}</span>
          </p>
        </div>
      </section>
      <hr />
      <section style={{ height: "40vh" }} className="flex items-center">
        <div className="">
          <div className="py-4">
            <div className="flex items-center">
              <Image
                src={`http://openweathermap.org/img/wn/50d@2x.png`}
                alt="icon"
                width={40}
                height={40}
              />
              <p className="text-sm capitalize py-1">{weather}</p>
            </div>
            <div className="flex items-center">
              <Image
                src="http://openweathermap.org/img/wn/04d@2x.png"
                alt="icon"
                width={40}
                height={40}
              />
              <p className="text-sm">Cloud - {cloud}%</p>
            </div>
          </div>
          <div className="w-60 h-32 rounded-3xl text-white flex-center drop-shadow-2xl background">
            New York
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forecast;
