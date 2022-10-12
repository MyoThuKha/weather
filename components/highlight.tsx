import React, { useMemo, useState } from "react";
import ChangeUnit from "./tools/btn";
import { formatTime } from "./tools/formatTime";

interface highlightProps {
  handleUnit: () => void;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  humidity: string;
  visibility: number;
  sys: {
    rise: number;
    set: number;
  };
}

const Highlight: React.FC<highlightProps> = ({
  handleUnit,
  humidity,
  wind,
  visibility,
  sys,
}) => {
  const windSpeed = (wind.speed * 3.6).toFixed(2);
  const visible = (visibility / 1000).toString();
  const windDirection = wind.deg.toString() + "°";
  const sunrise = formatTime(sys.rise);
  const sunset = formatTime(sys.set);

  const vi_condition: string = useMemo(() => {
    if (visibility > 6660) {
      return "clear";
    } else if (visibility > 3330) {
      return "average";
    }
    return "foggy";
  }, [visibility]);

  const h_condition: string = useMemo(() => {
    const humid = parseFloat(humidity);
    if (humid >= 30 && humid < 50) {
      return "good";
    } else if ((humid >= 60 && humid < 70) || (humid >= 25 && humid < 30)) {
      return "fair";
    } else return "poor";
  }, [humidity]);

  const [curr, setCurr] = useState(true);
  const handleChange = () => {
    setCurr(() => !curr);
    handleUnit();
  };
  return (
    <div className="min-h-screen px-14 text-lg py-8 bg-white-custom">
      <header className="flex justify-between">
        <h2 className="text-lg">Today</h2>
        <div className="flex justify-between">
          <ChangeUnit curr={curr} isC={true} handleChange={handleChange}>
            °C
          </ChangeUnit>
          <ChangeUnit curr={curr} isC={false} handleChange={handleChange}>
            °F
          </ChangeUnit>
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
          <Item
            header="wind status"
            body={windSpeed}
            unit={"km/h"}
            footer={windDirection}
          />

          <div className="hightlight-item">
            <div>
              <p className="hl-h">sunrise & sunset</p>
              <div className="main-text uppercase">
                <p className="text-2xl">{sunrise}</p>
                <p className="text-2xl">{sunset}</p>
              </div>
            </div>
          </div>
          <Item
            header="humidity"
            body={humidity}
            unit={"%"}
            footer={h_condition}
          />
          <Item
            header="visibility"
            body={visible}
            unit={"km"}
            footer={vi_condition}
          />

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

interface itemProps {
  header: string;
  body: string;
  unit: string;
  footer: string;
}
const Item: React.FC<itemProps> = ({ header, body, unit, footer }) => {
  return (
    <div className="hightlight-item">
      <div>
        <p className="hl-h">{header}</p>
        <p className="main-text">
          {body}
          <span className="sec-text"> {unit}</span>
        </p>
        <p className="hl-f">{footer}</p>
      </div>
    </div>
  );
};

export default Highlight;
