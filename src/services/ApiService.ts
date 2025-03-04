import axios from "axios";
import { WeatherResponse, ForecastResponse } from "../types/Weather.ts";

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const BASE_URL = process.env.REACT_APP_OPENWEATHERMAP_BASE_URL;

export const fetchCurrentWeather = async (
  city: string
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch weather data"
      );
    }
    throw new Error("Failed to fetch weather data");
  }
};

export const fetchForecast = async (
  city: string
): Promise<ForecastResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch forecast data"
      );
    }
    throw new Error("Failed to fetch forecast data");
  }
};
