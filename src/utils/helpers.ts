import { SAVED_CITIES_NAMES } from "../redux/features/app/appSlice";

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

export const WEATHER_GRADIENTS = {
  THUNDERSTORM: "radial-gradient(circle at left top, #1b2549 0%, #14346b 100%)",
  DRIZZLE: "radial-gradient(circle at left top, #5374E7 0%, #77B9F5 100%)",
  RAIN: "radial-gradient(circle at left top, #616161 0%, #9BC5C3 100%)",
  SNOW: "radial-gradient(circle at left top, #274046 0%, #E6DADA 100%)",
  ATMOSPHERE: "radial-gradient(circle at left top, #5374E7 0%, #77B9F5 100%)",
  CLEAR: "radial-gradient(circle at left top, #5374E7 0%, #77B9F5 100%)",
  CLOUDS: "radial-gradient(circle at left top, #464C64 0%, #99A9B9 100%)",
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