import React from 'react';
import './Forecast.css';

const Forecast = ({ forecastData, getWeatherEmoji }) => {
  if (!forecastData) return null;

  const getDailyForecast = () => {
    return forecastData.list
      .filter(item => item.dt_txt.includes('12:00:00'))
      .slice(0, 5);
  };

  return (
    <div className="forecast-card">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {getDailyForecast().map((day) => {
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          return (
            <div key={day.dt} className="forecast-item">
              <p className="forecast-day">{dayName}</p>
              <div className="forecast-icon">
                {getWeatherEmoji(day.weather[0].id)}
              </div>
              <p className="forecast-temp">
                {Math.round(day.main.temp)}°
              </p>
              <p className="forecast-desc">
                {day.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
