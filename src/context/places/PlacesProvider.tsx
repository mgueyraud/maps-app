import React, { useReducer, useEffect } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers/getUserLocation";
import searchApi from "../../apis/searchApi";
import { Feature, PlacesResponse } from "../../interfaces/places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

const PlacesProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((coords) =>
      dispatch({ type: "SET_USER", payload: coords })
    );
  }, []);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: "SET_PLACES", payload: [] });
      return [];
    } //TODO:
    if (!state.userLocation) throw new Error("No hay ubicacion del user");

    dispatch({ type: "SET_LOADING_PLACES" });

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });

    dispatch({ type: "SET_PLACES", payload: resp.data.features });

    return resp.data.features;
  };

  return (
    <PlacesContext.Provider
      value={{ ...state, searchPlacesByTerm }}
      {...props}
    />
  );
};

export default PlacesProvider;
