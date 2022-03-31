import React from "react";
import { MapProvider, PlacesProvider } from "./context";
import { HomePage } from "./screens";
import mapboxgl from "mapbox-gl";
import "./styles.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWd1ZXlyYXVkIiwiYSI6ImNsMWU3OGxndTBoMTIza24yMXV2N3E2OGcifQ.pn-G2RDb2BbDAvmiMwXfUQ";

const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomePage />
      </MapProvider>
    </PlacesProvider>
  );
};

export default MapsApp;
