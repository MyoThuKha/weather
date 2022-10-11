import React from "react";
import Image from "next/image";
import { getStaticProps } from "../pages";
import { InferGetStaticPropsType } from "next";
interface forecastProps {
  unit: string;
  // data: typeof getStaticProps;
  data: InferGetStaticPropsType<typeof getStaticProps>;
}

const Forecast: React.FC<forecastProps> = ({ unit, data }) => {
  const temp: string = data.main.temp;
  const weather: string = data.weather[0].description;
  return (
    <div className="px-10 py-8 min-h-screen">
      <section>
        <input placeholder="City" className="input-box" />
      </section>
      <section>
        <div className="w-52 h-52">
          <Image
            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt="icon"
            width={200}
            height={200}
          />
        </div>
        <div>
          <p className="text-7xl">
            {temp}°<sup>c</sup>
          </p>
          <p className="text-lg">
            Monday, <span className=" text-gray-400">16:00</span>
          </p>
        </div>
      </section>
      <hr />
      <section style={{ minHeight: "32vh" }}>
        <div>
          <p className="text-sm capitalize">{weather}</p>
          <p className="text-sm">Rain - 30%</p>
          <div className="h-32 rounded-3xl text-white flex-center drop-shadow-2xl background">
            New York
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forecast;