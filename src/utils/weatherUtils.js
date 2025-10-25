// Weather utility functions

export const getWeatherEmoji = (id) => {
  if (id >= 200 && id < 300) return '⛈️';
  if (id >= 300 && id < 400) return '🌦️';
  if (id >= 500 && id < 600) return '🌧️';
  if (id >= 600 && id < 700) return '❄️';
  if (id >= 700 && id < 800) return '🌫️';
  if (id === 800) return '☀️';
  if (id >= 801 && id < 810) return '☁️';
  return '❓';
};

export const formatTemperature = (temp, unit) => {
  return `${Math.round(temp)}°`;
};

export const formatWindSpeed = (speed, unit) => {
  const unitText = unit === 'metric' ? 'm/s' : 'mph';
  return `${speed} ${unitText}`;
};

export const formatVisibility = (visibility) => {
  return `${(visibility / 1000).toFixed(1)} km`;
};
