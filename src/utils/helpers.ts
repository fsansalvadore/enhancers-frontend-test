import { SAVED_CITIES_NAMES, WEATHER_GRADIENTS } from "./constants";
import { SavedCity } from "./types";
import axios from 'axios';

export const getOtherCitiesToShow = (cities: any, activeCity: any) => {
  const citiesToShow = cities.data?.filter((city: any) => {
    const isLonEqual = city?.lon === activeCity.data?.lon;
    const isLatEqual = city?.lat === activeCity.data?.lat;
  
    return !isLonEqual && !isLatEqual;
  })?.slice(0,2);

  return citiesToShow;
}

export const getCityPreviewData = async (city: SavedCity) => {
  const cityData = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely,daily,hourly,alerts&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API}`)

  return {...city, ...cityData.data}
}

export const getCoverByCity = (name: SAVED_CITIES_NAMES) => {
  switch (name) {
    case SAVED_CITIES_NAMES.TURIN:
      return "./images/cover-Turin.jpeg";
    case SAVED_CITIES_NAMES.LONDON:
      return "./images/cover-London.jpeg";
    case SAVED_CITIES_NAMES.ROME:
      return "./images/cover-Rome.jpeg";
  }
}

export const mapWeatherToBackground = (id: number) => {
  switch (String(id)[0]) {
    // Group 2xx: Thunderstorm
    case "2":
      return WEATHER_GRADIENTS.THUNDERSTORM;
    // Group 3xx: Drizzle
    case "3":
      return WEATHER_GRADIENTS.DRIZZLE;
    // Group 5xx: Rain
    case "5":
      return WEATHER_GRADIENTS.RAIN;
    // Group 6xx: Snow
    case "6":
      return WEATHER_GRADIENTS.SNOW;
    // Group 7xx: Atmosphere
    case "7":
      return WEATHER_GRADIENTS.ATMOSPHERE;
    case "8":
      // Group 800: Clear
      if (id === 800) {
        return WEATHER_GRADIENTS.CLEAR;
      } else {
        // Group 80x: Clouds
        return WEATHER_GRADIENTS.CLOUDS;
      }
    default:
      return WEATHER_GRADIENTS.CLEAR;
  }
}