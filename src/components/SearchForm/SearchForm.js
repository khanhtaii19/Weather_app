import React from 'react';
import './SearchForm.css';

const SearchForm = ({ 
  city, 
  setCity, 
  handleSubmit, 
  handleGeolocation, 
  loading, 
  recentSearches, 
  fetchWeather, 
  weatherData 
}) => {
  return (
    <div className="search-card">
      <div className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          placeholder="Enter city name..."
          className="search-input"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
        <button
          onClick={handleGeolocation}
          disabled={loading}
          className="btn btn-success"
        >
          📍 My Location
        </button>
      </div>

      {recentSearches.length > 0 && !weatherData && (
        <div className="recent-searches">
          <p className="recent-label">Recent searches:</p>
          <div className="recent-tags">
            {recentSearches.map((cityName) => (
              <button
                key={cityName}
                onClick={() => fetchWeather(cityName)}
                className="tag"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
