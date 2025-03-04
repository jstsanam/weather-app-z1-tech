import React from "react";
import { ForecastData } from "../types/Weather.ts";
import ForecastItem from "./ForecastItem.tsx";

interface ForecastListProps {
  forecast: ForecastData[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  return (
    <div>
      <h2>5-Day Forecast</h2>
      <div>
        {forecast.map((item, index) => (
          <ForecastItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
