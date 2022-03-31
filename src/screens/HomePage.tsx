import React from "react";
import { BtnMyLocation, MapView, SearchBar } from "../components";

const HomePage = () => {
  return (
    <div>
      <MapView />
      <SearchBar />
      <BtnMyLocation />
    </div>
  );
};

export default HomePage;
