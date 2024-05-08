import React from "react";
import "./Artist.css";

export const Artist = ({ artist }) => {
  return (
    <section className="artist">
      <header className="artist-info">
        <span className="artist-item-name">{artist.user.first_name} {artist.user.last_name}</span>
      </header>
      <div>
        <span className="white-text">Bio:</span> <span className="artist-item-description">{artist.bio}</span>
      </div>
      <div>
        <span className="white-text">Preferred Medium:</span> <span className="artist-item-description">{artist.preferred_medium.type}</span>
      </div>
    </section>
  );
};

