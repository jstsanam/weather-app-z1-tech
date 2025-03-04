import React from "react";
import { CurrentWeather as CurrentWeatherType } from "../types/Weather.ts";

interface CurrentWeatherProps {
  data: CurrentWeatherType;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div>
      <div>
        <h2>
          {data.city}, {data.country}
        </h2>
        <img
          src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
        />
      </div>

      <div>
        <div>
          <div>{Math.round(data.temperature)}°C</div>
          <div>{data.description}</div>
          <div>Feels like: {Math.round(data.feelsLike)}°C</div>
        </div>

        <div>
          <div>
            <span>Humidity:</span>
            <span>{data.humidity}%</span>
          </div>
          <div>
            <span>Wind:</span>
            <span>{data.windSpeed} m/s</span>
          </div>
          <div>
            <span>Pressure:</span>
            <span>{data.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
