import React, { useContext, useReducer, useEffect } from "react";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { DirectionsResponse } from "../../interfaces/directions";
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { PlacesContext } from "../places/PlacesContext";
import directionsApi from "../../apis/navigationApi";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  markers: [],
};

const MapProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(
      `
          <h4>Aqui estoy</h4>
          <p>En algun lugar del mundo</p>
        `
    );

    new Marker()
      .setLngLat(map.getCenter())
      .addTo(map)
      .setPopup(myLocationPopup);

    dispatch({ type: "ADD_MAP", payload: map });
  };

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());

    const newMarkers: Marker[] = places.map((place) => {
      const [lng, lat] = place.center;

      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>
      `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      return newMarker;
    });

    dispatch({ type: "SET_MARKERS", payload: newMarkers });
  }, [places]);

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const response = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );

    const {
      geometry: { coordinates },
    } = response.data.routes[0];

    const bounds = new LngLatBounds(start, start);

    coordinates.forEach((coord) => {
      bounds.extend(coord as [number, number]);
    });

    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    //Polyline

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer("RouteString")) {
      state.map?.removeLayer("RouteString");
      state.map?.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourceData);
    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 3,
      },
    });
  };

  return (
    <MapContext.Provider
      value={{ ...state, setMap, getRouteBetweenPoints }}
      {...props}
    />
  );
};

export default MapProvider;
