import React, { useContext } from "react";
import { PlacesContext } from "../context";
import { MapContext } from "../context/map/MapContext";

const BtnMyLocation = () => {
  const { userLocation } = useContext(PlacesContext);
  const { map, isMapReady } = useContext(MapContext);

  const handleClick = () => {
    if (!isMapReady) throw new Error("Mapa no esta listo");
    if (!userLocation) throw new Error("No hay ubicacion para este usuario");

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  return (
    <button
      className="btn btn-primary"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
      }}
      onClick={handleClick}
    >
      Mi Ubicacion
    </button>
  );
};

export default BtnMyLocation;
