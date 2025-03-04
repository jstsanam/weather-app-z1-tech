import React from "react";
import { ForecastData } from "../types/Weather.ts";

interface ForecastItemProps {
  data: ForecastData;
}

const ForecastItem: React.FC<ForecastItemProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div>{formatDate(data.date)}</div>
      <img
        src={`http://openweathermap.org/img/wn/${data.icon}.png`}
        alt={data.description}
      />
      <div>{Math.round(data.temperature)}°C</div>
      <div>{data.description}</div>
      <div>
        <div>Humidity: {data.humidity}%</div>
        <div>Wind: {data.windSpeed} m/s</div>
      </div>
    </div>
  );
};

export default ForecastItem;
