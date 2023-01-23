import { AppState } from './types';

export enum SAVED_CITIES_NAMES {
  TURIN = 'Turin',
  LONDON = 'London',
  ROME = 'Rome',
}

export enum STATUS {
  IDLE = 'idle',
  LOADING = 'loading',
  FAILED = 'failed',
}

export const SAVED_CITIES = {
  [SAVED_CITIES_NAMES.TURIN]: {
    name: SAVED_CITIES_NAMES.TURIN,
    coord: {
      lat: '45.0677551',
      lon: '7.6824892',
    },
  },
  [SAVED_CITIES_NAMES.LONDON]: {
    name: SAVED_CITIES_NAMES.LONDON,
    coord: {
      lat: '51.5073219',
      lon: '-0.1276474',
    },
  },
  [SAVED_CITIES_NAMES.ROME]: {
    name: SAVED_CITIES_NAMES.ROME,
    coord: {
      lat: '41.8933203',
      lon: '12.4829321',
    },
  },
};

export enum WEATHER_GRADIENTS {
  THUNDERSTORM = 'radial-gradient(circle at left top, #1b2549 0%, #14346b 100%)',
  DRIZZLE = 'radial-gradient(circle at left top, #5374E7 0%, #77B9F5 100%)',
  RAIN = 'radial-gradient(circle at left top, #616161 0%, #9BC5C3 100%)',
  SNOW = 'radial-gradient(circle at left top, #274046 0%, #E6DADA 100%)',
  ATMOSPHERE = 'radial-gradient(circle at left top, #5374E7 0%, #77B9F5 100%)',
  CLEAR = 'radial-gradient(circle at left top, #5374E7 0%, #77B9F5 100%)',
  CLOUDS = 'radial-gradient(circle at left top, #464C64 0%, #99A9B9 100%)',
}

export const initialState: AppState = {
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
    monthly: null,
  },
};
