import React from "react";
import "./Artwork.css"

export const ArtworkSearchBar = ({ setSearchTerm }) => {
  return (
    <input
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
      type="text"
      placeholder="Search Artworks"
      className="search-bar"
    />
  );
};

  