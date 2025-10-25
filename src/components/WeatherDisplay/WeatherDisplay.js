import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData, unit, toggleUnit, getWeatherEmoji }) => {
  if (!weatherData) return null;

  return (
    <div className="current-weather">
      <div className="weather-header">
        <div className="city-info">
          <h2 className="city-name">{weatherData.name}</h2>
          <p className="country">{weatherData.sys.country}</p>
        </div>
        <button onClick={toggleUnit} className="unit-toggle">
          °{unit === 'metric' ? 'C' : 'F'} / °{unit === 'metric' ? 'F' : 'C'}
        </button>
      </div>

      <div className="weather-main">
        <div className="temp-info">
          <div className="temp-display">
            {Math.round(weatherData.main.temp)}°
          </div>
          <p className="description">
            {weatherData.weather[0].description}
          </p>
          <p className="feels-like">
            Feels like {Math.round(weatherData.main.feels_like)}°
          </p>
        </div>
        <div className="weather-icon">
          {getWeatherEmoji(weatherData.weather[0].id)}
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <p className="detail-label">Humidity</p>
          <p className="detail-value">{weatherData.main.humidity}%</p>
        </div>
        <div className="detail-item">
          <p className="detail-label">Wind Speed</p>
          <p className="detail-value">
            {weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
          </p>
        </div>
        <div className="detail-item">
          <p className="detail-label">Pressure</p>
          <p className="detail-value">{weatherData.main.pressure} hPa</p>
        </div>
        <div className="detail-item">
          <p className="detail-label">Visibility</p>
          <p className="detail-value">
            {(weatherData.visibility / 1000).toFixed(1)} km
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
