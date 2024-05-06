import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtwork } from '../../services/resourceServices.js';

export const ArtworkDetails = () => {
    const [artwork, setArtwork] = useState(null);
    const { artworkId } = useParams();

  useEffect(() => {
    console.log(artworkId)
    const fetchArtwork = async () => {
      try {
        const artworkData = await getArtwork(parseInt(artworkId));
        setArtwork(artworkData);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      }
    };

    fetchArtwork();
  }, [artworkId]);

  return (
    <div>
      {artwork ? (
        <div>
          <h2>{artwork.title}</h2>
          {artwork.artist && artwork.artist.user && (
            <p>Artist: {artwork.artist.user.first_name} {artwork.artist.user.last_name}</p>
          )}
          <p>Price: {artwork.price}</p>
          <p>Description: {artwork.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
