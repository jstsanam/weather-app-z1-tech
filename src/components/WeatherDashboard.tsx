import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store.ts";
import { fetchWeatherData } from "../app/weatherSlice.ts";
import SearchBar from "./SearchBar.tsx";
import CurrentWeather from "./CurrentWeather.tsx";
import ForecastList from "./ForecastList.tsx";

const WeatherDashboard: React.FC = () => {
  const { currentWeather, forecast, error, city } = useSelector(
    (state: RootState) => state.weather
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!city && !currentWeather) {
      dispatch(fetchWeatherData("London"));
    }
  }, [dispatch, city, currentWeather]);

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <SearchBar />

      {error && <div>{error}</div>}

      <>
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast.length > 0 && <ForecastList forecast={forecast} />}
      </>
    </div>
  );
};

export default WeatherDashboard;
