import React, { useEffect, useState } from "react";
import { getAllArtists } from "../../services/resourceServices.js";
import { Artist } from "./Artist.jsx"; 
import { Link } from "react-router-dom";
import { ArtistSearchBar } from "./ArtistSearchBar.jsx"; 

export const ArtistView = ({ currentUser }) => {
  const [allArtists, setAllArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAndSetArtists = () => {
    getAllArtists().then(setAllArtists);
  };

  useEffect(() => {
    getAndSetArtists();
  }, []);

  useEffect(() => {
    const foundArtists = allArtists.filter((artist) => {
      const fullName = `${artist.user.first_name} ${artist.user.last_name}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
    setFilteredArtists(foundArtists);
  }, [searchTerm, allArtists]);
  

  return (
    <div>
      <div className="main">
        <div className="border">
          <div className="inner-cutout">
            <h1 className="artist-header">
             Artists
            </h1>
          </div>
        </div>
      </div>
      <article className="text-light">
        <div className="search-bar-container">
          <ArtistSearchBar setSearchTerm={setSearchTerm} />
        </div>
        <div className="artist-container">
          {filteredArtists.map((artist) => (
            <div
              className="artist-item"
              key={artist.id} 
            >
              <Link to={`/artists/${artist.id}`}>
                <Artist
                  artist={artist}
                  key={artist.id}
                  currentUser={currentUser}
                />
              </Link>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};
