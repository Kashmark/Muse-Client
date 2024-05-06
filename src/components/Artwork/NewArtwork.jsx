import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllArtists, getMediums } from "../../services/resourceServices";
import { getCategories, createArtworkCategory } from "../../services/resourceServices";
import { createArtwork } from "../../services/resourceServices";

export const NewArtwork = ({ currentUser }) => {
  const [artwork, setArtwork] = useState({
    description: "",
    picture_url: "",
    medium: 0,
    price: 0,
    artist: 0
  });
  const [allCategories, setAllCategories] = useState([]);
  const [allMediums, setAllMediums] = useState([]);
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    getMediums().then(setAllMediums);
    getCategories().then(setAllCategories);
  }, []);

  const handleMediumChange = (event) => {
    setArtwork({ ...artwork, medium: parseInt(event.target.value) });
  };
  
  const handleCategoryChange = (event) => {
    const categoryValue = parseInt(event.target.value);
    const isChecked = event.target.checked;
    setSelectedCategories(prevCategories => {
      if (isChecked) {
        return [...prevCategories, categoryValue];
      } else {
        return prevCategories.filter(category => category !== categoryValue);
      }
    });
  };
  
  const getArtistIdByUserId = async () => {
    const artists = await getAllArtists();
    const artist = artists.find(artist => artist.user.id === currentUser.id);
    if (artist) {
      return artist.id;
    } else {
      console.log("Are you even an artist, BRO");
      return null;
    }
  };
  
  const handleSave = async (event) => {
    event.preventDefault();

    if (artwork.description && artwork.picture_url && artwork.medium && artwork.price && selectedCategories.length > 0) {
      const artistId = await getArtistIdByUserId();
      
      if (artistId) {
        try {
          const newArtwork = {
            artist_id: artistId,
            description: artwork.description,
            picture_url: artwork.picture_url,
            medium_id: artwork.medium,
            price: artwork.price,
          };
    
          const createdArtwork = await createArtwork(newArtwork);
          
          if (createdArtwork) {
            // Create artwork category for each selected category
            for (const categoryId of selectedCategories) {
              await createArtworkCategory(createdArtwork.id, categoryId);
            }
            navigate("/my-works");
          } else {
            window.alert("Failed to create artwork. Please try again.");
          }
        } catch (error) {
          console.error("Error creating artwork:", error.message);
          window.alert("Failed to create artwork. Please try again.");
        }
      } else {
        console.log("Artist not found.");
      }
    } else {
      window.alert("Please fill out all fields");
    }
  };

  return (
    <form className="create-container">
      <div className="main">
        <div className="border">
          <div className="inner-cutout">
            <h1 className="knockout">New Artwork</h1>
          </div>
        </div>
      </div>
      <fieldset>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description of the artwork"
            value={artwork.description}
            onChange={(event) => setArtwork({ ...artwork, description: event.target.value })}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Medium</label>
          <select
            className="form-control"
            value={artwork.medium}
            onChange={handleMediumChange}
          >
            <option value="">Select Medium</option>
            {allMediums.map((medium) => (
              <option key={medium.id} value={medium.id}>
                {medium.type}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Price of the artwork"
            value={artwork.price}
            onChange={(event) => setArtwork({ ...artwork, price: parseFloat(event.target.value) })}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Category</label>
          {allCategories.map((category) => (
            <div key={category.id}>
              <label>
                <input
                  type="checkbox"
                  value={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onChange={handleCategoryChange}
                />
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Picture URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="URL of the artwork picture"
            value={artwork.picture_url}
            onChange={(event) => setArtwork({ ...artwork, picture_url: event.target.value })}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <button className="btn-dark text-center text-dark" onClick={handleSave}>
            Post Artwork
          </button>
        </div>
      </fieldset>
    </form>
  );
};

