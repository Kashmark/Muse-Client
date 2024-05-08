import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to navigate
import { getOrderArtworks, deleteOrderArtwork } from "../../services/resourceServices.js";
import "./Cart.css"; // Import the CSS file

const Cart = ({ currentUser }) => {
  const [orderArtworks, setOrderArtworks] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate(); // Get the navigate function for navigation

  useEffect(() => {
    const fetchOrderArtworks = async () => {
      try {
        const orderArtworksData = await getOrderArtworks();
        const userOrderArtworks = orderArtworksData.filter(orderArtwork => orderArtwork.order.user === currentUser.id);
        setOrderArtworks(userOrderArtworks);

        // Calculate total order cost
        const cost = userOrderArtworks.reduce((acc, orderArtwork) => acc + orderArtwork.artwork.price, 0);
        setTotalCost(cost);
      } catch (error) {
        console.error("Error fetching order artworks:", error);
      }
    };

    fetchOrderArtworks();
  }, [currentUser.id]);

  const handleDeleteOrderArtwork = async (orderArtworkId) => {
    try {
      // Delete the order artwork
      await deleteOrderArtwork(orderArtworkId);
      // Remove the deleted order artwork from the state
      setOrderArtworks(orderArtworks.filter(orderArtwork => orderArtwork.id !== orderArtworkId));
      // Recalculate the total cost
      const cost = orderArtworks
        .filter(orderArtwork => orderArtwork.id !== orderArtworkId)
        .reduce((acc, orderArtwork) => acc + orderArtwork.artwork.price, 0);
      setTotalCost(cost);
    } catch (error) {
      console.error("Error deleting order artwork:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      // Delete all order artworks
      await Promise.all(orderArtworks.map(orderArtwork => deleteOrderArtwork(orderArtwork.id)));
      // Navigate back to /artworks
      navigate("/artworks");
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Artist</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderArtworks.map(orderArtwork => (
            <tr key={orderArtwork.id}>
              <td>{orderArtwork.artwork.description}</td>
              <td>${orderArtwork.artwork.price}</td>
              <td>{orderArtwork.artwork.artist ? `${orderArtwork.artwork.artist.user.first_name} ${orderArtwork.artwork.artist.user.last_name}` : "Unknown"}</td>
              <td>
                <button className="cart-action-button" onClick={() => handleDeleteOrderArtwork(orderArtwork.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>Total: ${totalCost}</div>
      <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;

