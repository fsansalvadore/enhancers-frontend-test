import './App.css';
import WeatherPage from './pages/WeatherPage';
import {
  fetchActiveCityData,
  getCitiesPreviews,
  selectActiveCity,
  selectSavedCities,
} from './redux/features/app/appSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { useEffect } from 'react';
import { SavedCity } from './utils/types';

function App() {
  const savedCities = useAppSelector(selectSavedCities);
  const activeCity = useAppSelector(selectActiveCity);
  const dispatch = useAppDispatch();

  // Fetch cities preview data
  useEffect(() => {
    dispatch(getCitiesPreviews(savedCities));
  }, [dispatch, savedCities]);

  // Fetch active city data
  useEffect(() => {
    dispatch(
      fetchActiveCityData(
        savedCities.find(
          (city) => city.name === activeCity.preview.name
        ) as SavedCity
      )
    );
  }, [dispatch, activeCity.preview, savedCities]);

  // Update favicon based on current weather
  useEffect(() => {
    if (document !== undefined) {
      const favicon = document.getElementById('favicon');

      if (!!favicon) {
        (
          favicon as any
        ).href = `https://openweathermap.org/img/wn/${activeCity.data?.current?.weather[0]?.icon}.png`;
      }
    }
  }, [activeCity.data]);

  return <WeatherPage />;
}

export default App;
