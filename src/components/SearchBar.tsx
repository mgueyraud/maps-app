import React, { useContext } from "react";
import { useRef } from "react";
import { PlacesContext } from "../context/places/PlacesContext";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const { searchPlacesByTerm } = useContext(PlacesContext);
  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(e.target.value);
    }, 1000);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        onChange={onQueryChange}
        placeholder="Buscar lugar..."
      />
      <SearchResults />
    </div>
  );
};

export default SearchBar;
