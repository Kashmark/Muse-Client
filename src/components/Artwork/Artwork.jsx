import React, { useState, useEffect } from "react";
import { createOrder, createOrderArtwork } from "../../services/resourceServices.js";
import "./Artwork.css";

export const Artwork = ({ artwork }) => {
    const [currentUser, setCurrentUser] = useState({});
  
    useEffect(() => {
      const localArtUser = localStorage.getItem("art_user");
      const ArtUserObject = JSON.parse(localArtUser);
  
      setCurrentUser(ArtUserObject);
    }, []);
  
    const handleAddToCart = async () => {
      try {
        const newOrder = await createOrder({
          payment_type: 4,
          user: currentUser.id
        });
  
        await createOrderArtwork(artwork, newOrder);
  
        console.log("Artwork added to cart successfully!");
      } catch (error) {
        console.error("Error adding artwork to cart:", error);
      }
    };
  
    return (
      <section className="artwork-container">
        <div className="artwork-card">
          <img src={artwork.imageUrl} alt={artwork.title} />
          <div className="artwork-text">
            <h2 className="artwork-title">{artwork.title}</h2>
            <p className="artwork-artist"> {artwork.artist.user.first_name} {artwork.artist.user.last_name}</p>
            <p className="artwork-medium"> {artwork.medium.type}</p>
            <p className="artwork-price"> - Price - {artwork.price}</p>
            <p className="artwork-description">- Title - {artwork.description}</p>
          </div>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
      </section>
    );
  };

  

