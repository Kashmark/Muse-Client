import "./Artist.css"
export const ArtistSearchBar = ({ setSearchTerm }) => {
    return (
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Artists"
        className="search-bar"
      />
    );
  };