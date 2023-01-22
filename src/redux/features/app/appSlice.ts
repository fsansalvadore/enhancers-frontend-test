import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import axios from 'axios';

export enum SAVED_CITIES_NAMES {
  TURIN = "Turin",
  LONDON = "London",
  ROME = "Rome",
}

export enum STATUS {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

export const SAVED_CITIES = {
  [SAVED_CITIES_NAMES.TURIN]: {
    name: SAVED_CITIES_NAMES.TURIN,
    coord: {
      lat: "45.0677551",
      lon: "7.6824892",
    },
  },
  [SAVED_CITIES_NAMES.LONDON]: {
    name: SAVED_CITIES_NAMES.LONDON,
    coord: {
      lat: "51.5073219",
      lon: "-0.1276474",
    },
  },
  [SAVED_CITIES_NAMES.ROME]: {
    name: SAVED_CITIES_NAMES.ROME,
    coord: {
      lat: "41.8933203",
      lon: "12.4829321",
    },
  },
}

export interface SavedCity {
  name: SAVED_CITIES_NAMES;
  coord: {
    lat: string;
    lon: string;
  }
}

export type StatusType = STATUS;

export interface AppState {
  savedCities: SavedCity[];
  cities: {
    status: StatusType;
    data: any[] | null;
  };
  activeCity: {
    preview: SavedCity;
    status: StatusType;
    data: any;
  };
}

const initialState: AppState = {
  savedCities: [
    SAVED_CITIES[SAVED_CITIES_NAMES.TURIN],  
    SAVED_CITIES[SAVED_CITIES_NAMES.LONDON],  
    SAVED_CITIES[SAVED_CITIES_NAMES.ROME],  
  ],
  cities: {
    status: STATUS.IDLE,
    data: null,
  },
  activeCity: {
    preview: SAVED_CITIES[SAVED_CITIES_NAMES.TURIN],
    status: STATUS.IDLE,
    data: null,
  }
};

export const getCitiesPreviews = createAsyncThunk(
  'app/getCitiesPreviews',
  async (savedCities: SavedCity[]) => {
    const cities = Promise.all(savedCities.map((savedCity) => getCityPreview(savedCity)))

    return cities;
  }
);

const getCityPreview = async (city: SavedCity) => {
  const cityData = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely,daily,hourly,alerts&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API}`)

  return {...city, ...cityData.data}
}

export const fetchActiveCityData = createAsyncThunk(
  'app/fetchCity',
  async (city: SavedCity) => {
    const activeCity = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude={part}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API}`)
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
      });
  },
});

export const { activeCitySelected, addCityToResults } = appSlice.actions;

// Selectors
export const selectActiveCity = (state: RootState) => state.app.activeCity;
export const selectCities = (state: RootState) => state.app.cities;
export const selectSavedCities = (state: RootState) => state.app.savedCities;

export default appSlice.reducer;
