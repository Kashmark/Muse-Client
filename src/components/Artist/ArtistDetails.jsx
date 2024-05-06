import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllArtists, getAllArtworks } from '../../services/resourceServices.js';
import { Artwork } from '../Artwork/Artwork.jsx';

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
        <div>
            {artist ? (
                <div>
                    <h2>{artist.user?.first_name} {artist.user?.last_name}</h2>
                    <p>Bio: {artist.bio}</p>
                    <h3>Artworks</h3>
                    <ul>
                        {artworks.map((artwork) => (
                            <li key={artwork.id}>
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

