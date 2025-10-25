import React from 'react';
import './EmptyState.css';

const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">🌍</div>
      <h3 className="empty-title">Welcome to Weather App</h3>
      <p className="empty-text">
        Enter a city name or use your location to get started
      </p>
    </div>
  );
};

export default EmptyState;
