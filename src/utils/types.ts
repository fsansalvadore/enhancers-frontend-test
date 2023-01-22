import { SAVED_CITIES_NAMES, STATUS } from "./constants";

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
    monthly: any;
  };
}

export interface SavedCity {
  name: SAVED_CITIES_NAMES;
  coord: {
    lat: string;
    lon: string;
  }
}

export type StatusType = STATUS;
