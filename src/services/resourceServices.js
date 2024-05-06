const token = localStorage.getItem("art_user") ? JSON.parse(localStorage.getItem("art_user")).token : null;

export const getMediums = () => {
    return fetch(
      "http://localhost:8000/mediums"
    ).then((res) => res.json());
  };

export const getOrderArtworks = () => {
    return fetch(
      "http://localhost:8000/orderArtworks"
    ).then((res) => res.json());
  };

export const getAllArtworks = () => {
    return fetch(
      "http://localhost:8000/artworks"
    ).then((res) => res.json());
  };

export const getCategories = () => {
    return fetch(
      "http://localhost:8000/categories"
    ).then((res) => res.json());
  };

export const getAllArtists = () => {
    return fetch(
      "http://localhost:8000/artists"
    ).then((res) => res.json());
  };

export const getArtworkCategories = () => {
    return fetch(
      "http://localhost:8000/artworkCategory"
    ).then((res) => res.json());
  };

export const createArtwork = (artworkObj) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("art_user") ? JSON.parse(localStorage.getItem("art_user")).token : null;

    // Check if token is available
    if (!token) {
      // Handle the case when token is not available (e.g., throw an error, redirect to login, etc.)
      throw new Error("Token not found in local storage");
    }

    return fetch("http://localhost:8000/artworks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}` // Correct syntax for setting Authorization header
      },
      body: JSON.stringify(artworkObj), 
    }).then((res) => res.json());
  };

  export const updateArtwork = (artworkObj) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("art_user") ? JSON.parse(localStorage.getItem("art_user")).token : null;

    // Check if token is available
    if (!token) {
      // Handle the case when token is not available (e.g., throw an error, redirect to login, etc.)
      throw new Error("Token not found in local storage");
    }

    return fetch(`http://localhost:8000/artworks/${artworkObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}` // Correct syntax for setting Authorization header
      },
      body: JSON.stringify(artworkObj), 
    }).then((res) => res.json());
  };


  export const createArtworkCategory = async (artworkId, categoryId) => {
    try {
      const response = await fetch("http://localhost:8000/artworkCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ artwork: artworkId, category: categoryId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create artwork category");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating artwork category:", error.message);
      throw error;
    }
  };

  export const deleteArtwork = async (artworkId) => {
    try {
      const response = await fetch(`http://localhost:8000/artworks/${artworkId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete artwork");
      }
  
    } catch (error) {
      console.error("Error deleting artwork:", error);
      throw error;
    }
  };

  export const getArtwork = async (artworkId) => {
    try {
      const response = await fetch(`http://localhost:8000/artworks/${artworkId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch artwork");
      }
      const artwork = await response.json();
      return artwork;
    } catch (error) {
      console.error("Error fetching artwork:", error);
      throw error;
    }
  };

  export const updateArtworkCategory = async (artworkCategoryId, artworkId, categoryId) => {
    try {
      const url = `http://localhost:8000/artworkCategory/${artworkCategoryId}`;
  
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ artwork: artworkId, category: categoryId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update artwork category");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating artwork category:", error.message);
      throw error;
    }
  };

  export const getOrders = () => {
    return fetch(
      "http://localhost:8000/orders"
    ).then((res) => res.json());
  }; 

  export const deleteOrderArtwork = async (artworkId) => {
    try {
      const response = await fetch(`http://localhost:8000/orderArtworks/${artworkId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete order item");
      }
  
    } catch (error) {
      console.error("Error deleting order item:", error);
      throw error;
    }
  };

  export const createOrder = async (orderArtObj) => {
    console.log(orderArtObj)
    try {
      const response = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify(orderArtObj),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating artwork category:", error.message);
      throw error;
    }
  };

  export const createOrderArtwork = async (artworkId, orderId) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("art_user") ? JSON.parse(localStorage.getItem("art_user")).token : null;
  
    // Check if token is available
    if (!token) {
      // Handle the case when token is not available (e.g., throw an error, redirect to login, etc.)
      throw new Error("Token not found in local storage");
    }
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify({
        
        artwork: artworkId.id,
        order: orderId.id
      })
    };
  
    const response = await fetch(`http://localhost:8000/orderArtworks`, requestOptions);
    if (!response.ok) {
      throw new Error(`Error creating order artwork: ${response.statusText}`);
    }
  };
  
  
  
  
  





