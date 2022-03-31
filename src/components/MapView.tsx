import { Map } from "mapbox-gl";
import React, { useContext, useRef, useLayoutEffect } from "react";
import { PlacesContext } from "../context/places/PlacesContext";
import Loading from "./Loading";
import { MapContext } from "../context/map/MapContext";

const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isLoading) return;
    const map = new Map({
      container: mapRef.current!, // container ID
      style: "mapbox://styles/mapbox/light-v10", // style URL
      center: userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    setMap(map);
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <div
      ref={mapRef}
      style={{
        backgroundColor: "red",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default MapView;
