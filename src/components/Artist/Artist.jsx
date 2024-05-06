import React from "react";

export const Artist = ({ artist }) => {
  return (
    <section className="artist">
      <header className="artist-info">
        <span className="marble-text">{artist.user.first_name} {artist.user.last_name}</span>
      </header>
      <div>
        Bio: <span className="marble-text">{artist.bio}</span>
      </div>
      <div>
        Preferred Medium: <span className="marble-text">{artist.preferred_medium.type}</span>
      </div>
    </section>
  );
};
