import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMediums, getCategories, getArtwork, getArtworkCategories, updateArtwork } from "../../services/resourceServices.js";

export const EditArtwork = () => {
  const [artwork, setArtwork] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [allMediums, setAllMediums] = useState([]);
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const fetchedArtwork = await getArtwork(id);
        setArtwork({ ...fetchedArtwork });
      } catch (error) {
        console.error("Error fetching artwork:", error);
      }
    };

    const fetchArtworkCategories = async () => {
      try {
        const allArtworkCategories = await getArtworkCategories();
        const artworkCategoriesForArtwork = allArtworkCategories.filter(artworkCategory => artworkCategory.artwork_id === id);
        const categoryIds = artworkCategoriesForArtwork.map(artworkCategory => artworkCategory.category_id);
        setSelectedCategories(categoryIds);
      } catch (error) {
        console.error("Error fetching artwork categories:", error);
      }
    };

    fetchArtwork();
    fetchArtworkCategories();
  }, [id]);
  
  useEffect(() => {
    getMediums().then(setAllMediums);
    getCategories().then(setAllCategories);
  }, []);

  const handleMediumChange = (event) => {
    setArtwork({ ...artwork, medium_id: parseInt(event.target.value) });
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
  
  const handleSave = async (event) => {
    event.preventDefault();
  
    if (artwork.description && artwork.picture_url && artwork.medium_id && artwork.price && selectedCategories.length > 0) {
      try {
        const updatedArtwork = {
          ...artwork, 
          artist_id: artwork.artist.id,
        };

  
        await updateArtwork(updatedArtwork);
        navigate("/artworks");
      } catch (error) {
        console.error("Error updating artwork:", error.message);
        window.alert("Failed to update artwork. Please try again.");
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
            <h1 className="knockout">Edit Artwork</h1>
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
            value={artwork.description || ""}
            onChange={(event) => setArtwork({ ...artwork, description: event.target.value })}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Medium</label>
          <select
  className="form-control"
  value={artwork.medium?.id || ""}
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
            value={artwork.price || ""}
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
                  checked={selectedCategories.includes(category.id) || (artwork.categories && artwork.categories.some(cat => cat.id === category.id))}
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
            value={artwork.picture_url || ""}
            onChange={(event) => setArtwork({ ...artwork, picture_url: event.target.value })}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <button className="btn-dark text-center text-dark" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </fieldset>
    </form>
  );
};