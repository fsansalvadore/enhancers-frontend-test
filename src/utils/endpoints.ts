export const getCityWeatherEndpoint = (
  lat: string,
  lon: string,
  isPreview?: boolean
) => {
  return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}${
    isPreview ? '&exclude=minutely,daily,hourly,alerts' : ''
  }&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API}`;
};
