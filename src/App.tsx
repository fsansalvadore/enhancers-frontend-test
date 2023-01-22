
import './App.css';
import WeatherPage from './pages/WeatherPage';
import { fetchActiveCityData, getCitiesPreviews, SavedCity, selectActiveCity, selectSavedCities } from './redux/features/app/appSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { useEffect } from 'react';

function App() {
  const savedCities = useAppSelector(selectSavedCities);
  const activeCity = useAppSelector(selectActiveCity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getCitiesPreviews(savedCities)
    );
  }, [dispatch, savedCities])

  useEffect(() => {
    dispatch(
      fetchActiveCityData(savedCities.find(city => city.name === activeCity.preview.name) as SavedCity)
    )
  }, [dispatch, activeCity.preview, savedCities])

  return (
    <WeatherPage />
  );
}


export default App;
