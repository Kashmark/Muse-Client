import React, { useEffect, useState } from "react";
import { getAllArtworks } from "../../services/resourceServices.js";
import { Artwork } from "./Artwork.jsx"; // Import your Artwork component
import { Link } from "react-router-dom";
import { ArtworkSearchBar } from "./ArtworkSearchBar.jsx"; // Assuming you have an ArtworkSearchBar component

export const ArtworkView = ({ currentUser }) => {
  const [allArtworks, setAllArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAndSetArtworks = () => {
    getAllArtworks().then(setAllArtworks);
  };

  useEffect(() => {
    getAndSetArtworks();
  }, []);

  useEffect(() => {
    const foundArtworks = allArtworks.filter((artwork) => {
      return artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredArtworks(foundArtworks);
  }, [searchTerm, allArtworks]);

  return (
    <div className="main" style={{ paddingTop: "80px" }}> {/* Adjust the padding-top value as needed */}
      <div className="border">
        <div className="inner-cutout">
          <h1 className="marble-text">
            Artworks
          </h1>
        </div>
      </div>
      <article className="artwork-container">
        <div className="text-dark search-bar-container">
          <ArtworkSearchBar setSearchTerm={setSearchTerm} />
        </div>
        {filteredArtworks.map((artwork) => (
          <div
            style={{
              backgroundImage: `url(${artwork.picture_url})`, // Assuming artwork has an image property
            }}
            className="artworks artwork-item img"
            key={artwork.id} // Assuming artwork has an id property
          >
            <Link to={`/artworks/${artwork.id}`} className="artwork-link">
              <Artwork
                artwork={artwork}
                key={artwork.id}
                currentUser={currentUser}
                className="artwork-details"
              />
            </Link>
          </div>
        ))}
      </article>
    </div>
  );
};

