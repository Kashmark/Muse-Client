export const ArtistSearchBar = ({ setSearchTerm }) => {
    return (
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Artists"
        className="artist-search"
      />
    );
  };