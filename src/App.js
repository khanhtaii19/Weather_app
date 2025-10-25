import React, { useState, useEffect } from 'react';
import './styles/global.css';
import { 
  Header, 
  SearchForm, 
  WeatherDisplay, 
  Forecast, 
  Loading, 
  ErrorMessage, 
  EmptyState 
} from './components';
import { API_KEY, API_BASE_URL, ENDPOINTS, UNITS, MAX_RECENT_SEARCHES } from './constants/config';
import { getWeatherEmoji } from './utils/weatherUtils';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState(UNITS.METRIC);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(saved);
  }, []);

  const saveToRecent = (cityName) => {
    const updated = [cityName, ...recentSearches.filter(c => c !== cityName)].slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const fetchWeather = async (cityName) => {
    if (!cityName || cityName.trim().length < 2) {
      setError('Please enter a valid city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const weatherRes = await fetch(
        `${API_BASE_URL}${ENDPOINTS.CURRENT_WEATHER}?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );

      if (!weatherRes.ok) {
        if (weatherRes.status === 404) throw new Error('City not found');
        if (weatherRes.status === 401) throw new Error('Invalid API key');
        throw new Error('Could not fetch weather data');
      }

      const weather = await weatherRes.json();

      const forecastRes = await fetch(
        `${API_BASE_URL}${ENDPOINTS.FORECAST}?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );
      const forecast = await forecastRes.json();

      setWeatherData(weather);
      setForecastData(forecast);
      saveToRecent(weather.name);
      setCity('');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `${API_BASE_URL}${ENDPOINTS.CURRENT_WEATHER}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`
          );
          const data = await res.json();
          fetchWeather(data.name);
        } catch (err) {
          setError('Could not get your location');
          setLoading(false);
        }
      },
      () => {
        setError('Permission denied for location access');
        setLoading(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const toggleUnit = () => {
    setUnit(unit === UNITS.METRIC ? UNITS.IMPERIAL : UNITS.METRIC);
    if (weatherData) {
      fetchWeather(weatherData.name);
    }
  };


  return (
    <div className="weather-app">
      <div className="container">
        <Header />

        <SearchForm 
          city={city}
          setCity={setCity}
          handleSubmit={handleSubmit}
          handleGeolocation={handleGeolocation}
          loading={loading}
          recentSearches={recentSearches}
          fetchWeather={fetchWeather}
          weatherData={weatherData}
        />

        <ErrorMessage error={error} />
        <Loading loading={loading} />

        {weatherData && !loading && (
          <div className="weather-content">
            <WeatherDisplay 
              weatherData={weatherData}
              unit={unit}
              toggleUnit={toggleUnit}
              getWeatherEmoji={getWeatherEmoji}
            />
            <Forecast 
              forecastData={forecastData}
              getWeatherEmoji={getWeatherEmoji}
            />
          </div>
        )}

        {!weatherData && !loading && !error && <EmptyState />}

        <div className="footer">
          <p>Data provided by OpenWeatherMap API</p>
        </div>
      </div>
    </div>
  );
}