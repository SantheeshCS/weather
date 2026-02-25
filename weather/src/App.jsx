import { useState } from "react";
import CitySelector from "./components/CitySelector";
import WeatherCard from "./components/weatherCard";
import Loader from "./components/Loader";
import axios from "axios";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async (cityId) => {
    if (!cityId) return;

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const res = await axios.get(`http://localhost:5000/weather/${cityId}`);
      setWeather(res.data);
    } catch (err) {
      console.log("Error Details:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Indian Weather App</h1>
      <CitySelector onCitySelect={fetchWeatherData} />
      {loading && <Loader />}
      {error && <div className="error">{error}</div>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
