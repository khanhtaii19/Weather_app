import React from 'react';
import './Loading.css';

const Loading = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Fetching weather data...</p>
    </div>
  );
};

export default Loading;
