// MyArt.jsx
import React, { useEffect, useState } from "react";
import { getAllArtists, getAllArtworks, deleteArtwork } from "../../services/resourceServices.js";
import { Artwork } from "./Artwork.jsx"; // Import your Artwork component
import { Link } from "react-router-dom";
import { ArtworkSearchBar } from "./ArtworkSearchBar.jsx"; // Assuming you have an ArtworkSearchBar component
import "./Artwork.css"; // Import the CSS file for MyArt styling

export const MyArt = ({ currentUser }) => {
  const [allArtworks, setAllArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userArtistId, setUserArtistId] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const artists = await getAllArtists();
        if (artists && artists.length > 0) {
          const userArtist = artists.find((artist) => artist.user.id === currentUser.id);
          if (userArtist) {
            setUserArtistId(userArtist.id);
            const artworks = await getAllArtworks();
            setAllArtworks(artworks.filter((artwork) => artwork.artist.id === userArtist.id));
          }
        } else {
          console.log("No artists found.");
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };
  
    fetchArtworks();
  }, [currentUser]);
  

  useEffect(() => {
    const foundArtworks = allArtworks.filter((artwork) => {
      return artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredArtworks(foundArtworks);
  }, [searchTerm, allArtworks]);

  const handleDelete = async (artworkId) => {
    try {
      await deleteArtwork(artworkId);
      // Remove the deleted artwork from the state
      setAllArtworks((prevArtworks) => prevArtworks.filter((artwork) => artwork.id !== artworkId));
    } catch (error) {
      console.error("Error deleting artwork:", error);
      // Handle the error (e.g., show error message to the user)
    }
  };

  return (
    <div>
      <div className="main">
        <div className="border">
          <div className="inner-cutout">
            <h1 className="marble-text">
             My Works
            </h1>
          </div>
        </div>
      </div>
      <article className="text-light">
        <div className="text-dark artwork-search">
          <ArtworkSearchBar setSearchTerm={setSearchTerm} />
        </div>
        {filteredArtworks.map((artwork) => (
          <div
            style={{
              backgroundImage: `url(${artwork.picture_url})`, // Assuming artwork has an image property
            }}
            className="artworks artwork-item"
            key={artwork.id} // Assuming artwork has an id property
          >
            <Link to={`/artworks/${artwork.id}`}>
              <Artwork
                artwork={artwork}
                key={artwork.id}
                currentUser={currentUser}
              />
            </Link>
            <Link to={`/edit-artwork/${artwork.id}`}>
              <button className="edit-button">Edit</button>
            </Link>
            <button className="delete-button" onClick={() => handleDelete(artwork.id)}>Delete</button>
          </div>
        ))}
      </article>
    </div>
  );
};
