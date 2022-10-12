import React from "react";
import Image from "next/image";
import { getStaticProps } from "../pages";
import { InferGetStaticPropsType } from "next";
import { formatDate } from "./tools/formatTime";
interface forecastProps {
  unit: string;
  temp: string;
  weather: string;
  icon: string;
  dt: number;
  cloud: number;
}

const Forecast: React.FC<forecastProps> = ({
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
      <section>
        <input placeholder="City" className="input-box" />
      </section>
      <section>
        <div className="w-52 h-52">
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
      <section style={{ minHeight: "32vh" }}>
        <div>
          <p className="text-sm capitalize">{weather}</p>
          <p className="text-sm">Cloud - {cloud}%</p>
          <div className="h-32 rounded-3xl text-white flex-center drop-shadow-2xl background">
            New York
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forecast;
