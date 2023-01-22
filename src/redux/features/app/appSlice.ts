import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../../store';
import { initialState, STATUS } from '../../../utils/constants';
import { SavedCity } from '../../../utils/types';
import { getCityPreviewData } from '../../../utils/helpers';

export const getCitiesPreviews = createAsyncThunk(
  'app/getCitiesPreviews',
  async (savedCities: SavedCity[]) => Promise.all(savedCities.map((savedCity) => getCityPreviewData(savedCity)))
);

export const fetchActiveCityData = createAsyncThunk(
  'app/fetchCity',
  async (city: SavedCity) => {
    const activeCity = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API}`)
    return activeCity.data;
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    activeCitySelected: (state, action: PayloadAction<SavedCity>) => {
      state.activeCity.preview = action.payload;
    },
    addCityToResults: (state, action: PayloadAction<any>) => {
      state.cities.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCitiesPreviews.pending, (state) => {
        state.cities.status = STATUS.LOADING;
      })
      .addCase(getCitiesPreviews.fulfilled, (state, action) => {
        state.cities.status = STATUS.IDLE;
        state.cities.data = action.payload;
      })
      .addCase(getCitiesPreviews.rejected, (state) => {
        state.cities.status = STATUS.FAILED;
      })
      .addCase(fetchActiveCityData.pending, (state) => {
        state.activeCity.status = STATUS.LOADING;
      })
      .addCase(fetchActiveCityData.fulfilled, (state, action) => {
        state.activeCity.status = STATUS.IDLE;
        state.activeCity.data = action.payload;
      })
      .addCase(fetchActiveCityData.rejected, (state) => {
        state.activeCity.status = STATUS.FAILED;
      })
  },
});

export const { activeCitySelected, addCityToResults } = appSlice.actions;

// Selectors
export const selectActiveCity = (state: RootState) => state.app.activeCity;
export const selectCities = (state: RootState) => state.app.cities;
export const selectSavedCities = (state: RootState) => state.app.savedCities;

export default appSlice.reducer;
