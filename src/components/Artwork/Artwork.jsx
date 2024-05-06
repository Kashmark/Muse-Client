import React from "react";
import { createOrder, createOrderArtwork } from "../../services/resourceServices.js";
import "./Artwork.css";
import { useState, useEffect } from "react";

export const Artwork = ({ artwork }) => {
    const [currentUser, setCurrentUser] = useState({});
  
    useEffect(() => {
      const localArtUser = localStorage.getItem("art_user");
      const ArtUserObject = JSON.parse(localArtUser);
  
      setCurrentUser(ArtUserObject);
    }, []);
  
    const handleAddToCart = async () => {
      try {
        // Create a new order
        console.log(currentUser.id);
        const newOrder = await createOrder({
          payment_type: 1,
          user: currentUser.id
        });
  
        // Create a new order artwork with the artwork id and the order id
        await createOrderArtwork(artwork, newOrder);
  
        // You can add any success notification or redirect logic here if needed
        console.log("Artwork added to cart successfully!");
      } catch (error) {
        console.error("Error adding artwork to cart:", error);
        // You can add error handling logic here if needed
      }
    };
  
    return (
      <section className="artwork-container">
        <header className="artwork-info">
          <span className="marble-text">{artwork.title}</span>
        </header>
        <div className="artwork-info">
          Artist: <span className="marble-text">{artwork.artist.user.first_name} {artwork.artist.user.last_name}</span>
        </div>
        <div className="artwork-info">
          Medium: <span className="marble-text">{artwork.medium.type}</span>
        </div>
        <div className="artwork-info">
          Price: <span className="marble-text">{artwork.price}</span>
        </div>
        <div className="artwork-info">
          Description: <span className="marble-text">{artwork.description}</span>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
      </section>
    );
  };
  

