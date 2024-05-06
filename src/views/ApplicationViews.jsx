import { useState, useEffect } from "react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/Nav/NavBar.jsx";
import { Outlet } from "react-router-dom";
import { Welcome } from "../components/Welcome/Welcome.jsx";
import { ArtworkView } from "../components/Artwork/ArtworkView.jsx";
import { NewArtwork } from "../components/Artwork/NewArtwork.jsx";
import { ArtistView } from "../components/Artist/ArtistView.jsx"; 
import { MyArt } from "../components/Artwork/MyArt.jsx";
import { EditArtwork } from "../components/Artwork/EditArtwork.jsx";
import Cart from "../components/Cart/Cart.jsx";
import { ArtworkDetails } from "../components/Artwork/ArtworkDetails.jsx";
import { ArtistDetails } from "../components/Artist/ArtistDetails.jsx";

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
      const localArtUser = localStorage.getItem("art_user");
      const ArtUserObject = JSON.parse(localArtUser);
  
      setCurrentUser(ArtUserObject);
    }, []);
    
    return (
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Outlet />
            </>
          }
        >
          <Route index element={<Welcome currentUser={currentUser} />} />
          <Route path="/artworks" element={<ArtworkView />} />
          <Route path="/new-listing" element={<NewArtwork currentUser={currentUser} />} />
          <Route path="/artists" element={<ArtistView />} /> 
          <Route path="/my-works" element={<MyArt currentUser={currentUser}/>} /> 
          <Route path="/edit-artwork/:id" element={<EditArtwork currentUser={currentUser}/>} /> 
          <Route path="/artworks/:artworkId" element={<ArtworkDetails />} />
          <Route path="/artists/:artistId" element={<ArtistDetails />} />
          <Route path="/cart" element={<Cart currentUser={currentUser}/>} /> 
        </Route>
      </Routes>
    );
  };

