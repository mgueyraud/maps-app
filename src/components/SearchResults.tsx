import React, { useContext, useState } from "react";
import { PlacesContext } from "../context/places/PlacesContext";
import LoadingPlaces from "./LoadingPlaces";
import { MapContext } from "../context/map/MapContext";
import { LngLatLike } from "mapbox-gl";
import { Feature } from "../interfaces/places";

const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);
  const [activeId, setActiveId] = useState("");

  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }

  if (places.length === 0) {
    return null;
  }

  const handleClickPlace = (place: Feature) => {
    map?.flyTo({ zoom: 14, center: place.center as LngLatLike });
    setActiveId(place.id);
  };

  const handleRoute = (place: Feature) => {
    if (!userLocation) return;

    getRouteBetweenPoints(userLocation, place.center as [number, number]);
  };

  return (
    <ul className="list-group mt-3">
      {places.map((place) => (
        <li
          className={`list-group-item list-group-item-action ${
            activeId === place.id ? "active" : ""
          }`}
          style={{ cursor: "pointer" }}
          key={place.id}
          onClick={() => handleClickPlace(place)}
        >
          <h6>{place.text_es}</h6>
          <p style={{ fontSize: 12 }}>{place.place_name}</p>
          <button
            className={`btn btn-sm ${
              activeId === place.id
                ? "btn-outline-light"
                : "btn-outline-primary"
            }`}
            onClick={() => handleRoute(place)}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
