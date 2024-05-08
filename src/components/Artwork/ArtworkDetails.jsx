import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtwork } from '../../services/resourceServices.js';
import './Artwork.css'; // Import the CSS file for styling

export const ArtworkDetails = () => {
    const [artwork, setArtwork] = useState(null);
    const { artworkId } = useParams();

    useEffect(() => {
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
        <div className="artwork-details-container">
            {artwork ? (
                <div>
                    <h2>{artwork.title}</h2>
                    {artwork.artist && artwork.artist.user && (
                        <p>Artist: {artwork.artist.user.first_name} {artwork.artist.user.last_name}</p>
                    )}
                    <p>Price: {artwork.price}</p>
                    <p>Description: {artwork.description}</p>
                    <img src={artwork.picture_url} alt={artwork.title} className="artwork-details-image" />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

