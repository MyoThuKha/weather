import React, { useState } from "react";

interface highlightProps {
  handleUnit: () => void;
}

const Highlight: React.FC<highlightProps> = ({ handleUnit }) => {
  const [curr, setCurr] = useState(true);
  const handleChange = () => {
    setCurr(() => !curr);
  };
  return (
    <div className="min-h-screen px-14 text-lg py-8 bg-white-custom">
      {/* <section className="h-1/3"> */}
      <header className="flex justify-between">
        <h2 className="text-lg">Today</h2>
        <div className="flex justify-between">
          <ChangeUnit curr={curr} isC={true} handleChange={handleChange}>
            °C
          </ChangeUnit>
          <ChangeUnit curr={curr} isC={false} handleChange={handleChange}>
            °F
          </ChangeUnit>
          {/* <button className="bg-white circle-btn">°F</button> */}
        </div>
      </header>
      <section className="h-2/3">
        <h2 className="text-2xl pb-8">Today HightLights</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="hightlight-item">
            <div>
              <p className="hl-h">UV index</p>
              <p className="main-text">5</p>
              <p className="hl-f">hot</p>
            </div>
          </div>
          <div className="hightlight-item">
            <div>
              <p className="hl-h">wind status</p>
              <p className="main-text">
                7.70 <span className="sec-text">km/h</span>
              </p>
              <p className="hl-f">WSW</p>
            </div>
          </div>
          <div className="hightlight-item">
            <div>
              <p className="hl-h">sunrise & sunset</p>
            </div>
          </div>
          <div className="hightlight-item">
            <div>
              <p className="hl-h">humidity</p>
              <p className="main-text">
                12<sup>%</sup>
              </p>
              <p className="hl-f">Normal</p>
            </div>
          </div>
          <div className="hightlight-item">
            <div>
              <p className="hl-h">visibility</p>
              <p className="main-text">
                5.2 <span className="sec-text">km</span>
              </p>
              <p className="hl-f">Average</p>
            </div>
          </div>
          <div className="hightlight-item">
            <div>
              <p className="hl-h">air quality</p>
              <p className="main-text">105</p>
              <p className="hl-f">Unhealthy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface buttonProps {
  children: string;
  curr: boolean;
  isC: boolean;
  handleChange: () => void;
}
const ChangeUnit: React.FC<buttonProps> = ({
  children,
  curr,
  isC,
  handleChange,
}) => {
  const style =
    curr === isC ? "bg-black text-white circle-btn" : "bg-white circle-btn";
  return (
    <button onClick={() => handleChange()} className={style}>
      {children}
    </button>
  );
};

export default Highlight;
