// ArtistDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllArtists, getAllArtworks } from '../../services/resourceServices.js';
import { Artwork } from '../Artwork/Artwork.jsx';
import './Artist.css'; // Import CSS for ArtistDetails styling

export const ArtistDetails = () => {
    const [artist, setArtist] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const { artistId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allArtists = await getAllArtists();
                const matchingArtist = allArtists.find(artist => artist.id === parseInt(artistId));
                if (matchingArtist) {
                    setArtist(matchingArtist);
                    const allArtworks = await getAllArtworks();
                    const filteredArtworks = allArtworks.filter(artwork => artwork.artist.id === parseInt(artistId));
                    setArtworks(filteredArtworks);
                } else {
                    console.error('Artist not found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [artistId]);

    return (
        <div className="artist-details-container"> {/* Apply container class */}
        <h1>Artist's Active Stock</h1>
            {artist ? (
                <div className="artist-details">
                    <h2 className="artist-name">{artist.user?.first_name} {artist.user?.last_name}</h2>
                    <p className="artist-bio">Bio: {artist.bio}</p>
                    <h3 className="artworks-header">Artworks</h3>
                    <ul className="artworks-list"> {/* Apply list class */}
                        {artworks.map((artwork) => (
                            <li key={artwork.id} className="artwork-item" style={{
                                backgroundImage: `url(${artwork.picture_url})`, // Assuming artwork has an image property
                              }}> {/* Apply item class */}
                                <Artwork artwork={artwork} />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
