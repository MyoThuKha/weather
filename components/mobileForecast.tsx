import React from "react";
import Image from "next/image";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { formatDate } from "./tools/formatTime";
import changeF from "./tools/changeF";
import _ from "lodash";

interface smforecastProps {
  inVal: string;
  handleInput: (val: string) => void;
  handleLoc: (val: string) => void;
  unit: string;
  data: InferGetStaticPropsType<GetStaticProps>;
}

const SMForecast: React.FC<smforecastProps> = ({
  unit,
  inVal,
  handleInput,
  handleLoc,
  data,
}) => {
  const temperature = unit === "f" ? changeF(data.main.temp) : data.main.temp;
  const time = formatDate(data.dt);

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
          <p className="text-7xl capitalize">
            {temperature}°<sup className="text-5xl">{unit}</sup>
          </p>
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
