import React, { useState, useEffect } from "react";
import { getOrderArtworks, deleteOrderArtwork } from "../../services/resourceServices.js";

const Cart = ({ currentUser }) => {
  const [orderArtworks, setOrderArtworks] = useState([]);

  useEffect(() => {
    const fetchOrderArtworks = async () => {
      try {
        const orderArtworksData = await getOrderArtworks();
        const userOrderArtworks = orderArtworksData.filter(orderArtwork => orderArtwork.order.user === currentUser.id);
        setOrderArtworks(userOrderArtworks);
      } catch (error) {
        console.error("Error fetching order artworks:", error);
      }
    };

    fetchOrderArtworks();
  }, [currentUser.id]);

  const handleDeleteOrderArtwork = async (orderArtworkId) => {
    try {
      await deleteOrderArtwork(orderArtworkId);
      setOrderArtworks(orderArtworks.filter(orderArtwork => orderArtwork.id !== orderArtworkId));
    } catch (error) {
      console.error("Error deleting order artwork:", error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <table>
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
                <button onClick={() => handleDeleteOrderArtwork(orderArtwork.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
