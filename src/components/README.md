# Components

This directory contains all the reusable components for the Weather App.

## Structure

Each component is organized in its own folder with:
- `ComponentName.js` - The React component
- `ComponentName.css` - Component-specific styles

## Components

- **Header** - App title and subtitle
- **SearchForm** - City search input and recent searches
- **WeatherDisplay** - Current weather information
- **Forecast** - 5-day weather forecast
- **Loading** - Loading spinner and text
- **ErrorMessage** - Error message display
- **EmptyState** - Welcome screen when no data

## Usage

```javascript
import { Header, SearchForm, WeatherDisplay } from './components';
```

## Styling

Each component imports its own CSS file. Global styles are in `../styles/global.css`.

