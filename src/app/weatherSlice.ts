import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherState, CurrentWeather, ForecastData } from '../types/Weather.ts';
import { fetchCurrentWeather, fetchForecast } from '../services/ApiService.ts';

const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,
  city: '',
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string, { rejectWithValue }) => {
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);

      const currentWeather: CurrentWeather = {
        city: weatherResponse.name,
        country: weatherResponse.sys.country,
        temperature: weatherResponse.main.temp,
        description: weatherResponse.weather[0].description,
        icon: weatherResponse.weather[0].icon,
        humidity: weatherResponse.main.humidity,
        windSpeed: weatherResponse.wind.speed,
        pressure: weatherResponse.main.pressure,
        feelsLike: weatherResponse.main.feels_like,
      };

      const forecastMap = new Map<string, ForecastData>();
      
      forecastResponse.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0];
        
        if (!forecastMap.has(date) || item.dt_txt.includes('12:00')) {
          forecastMap.set(date, {
            date,
            temperature: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
          });
        }
      });
      
      const forecast = Array.from(forecastMap.values()).slice(0, 5);

      return { currentWeather, forecast, city };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    clearWeatherData: (state) => {
      state.currentWeather = null;
      state.forecast = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.currentWeather;
        state.forecast = action.payload.forecast;
        state.city = action.payload.city;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCity, clearWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;