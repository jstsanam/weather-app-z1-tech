import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store.ts";
import { fetchWeatherData, setCity } from "../app/weatherSlice.ts";

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setCity(searchInput));
      dispatch(fetchWeatherData(searchInput));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={(e: any) => setSearchInput(e.target.value)}
          placeholder="Enter city name..."
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;
