import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchbar.scss";

function SearchBar() {
  const [searchQuerry, setSearchQuerry] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const navigate = useNavigate();

  function onSearch() {
    navigate(`search?searchkey=${searchQuerry.toLocaleLowerCase()}`);
  }
  return showSearch ? (
    <div className="search-section" id="search-bar">
      <div>Search</div>
      <input
        value={searchQuerry}
        type="search"
        autoCapitalize="on"
        autoFocus
        className="search"
        placeholder="Search"
        onFocus={() => setShowSearch(true)}
        onBlur={() => setShowSearch(false)}
        onChange={(e) => setSearchQuerry(e.target.value.toLocaleUpperCase())}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />
      <div className="close-button" onClick={() => setShowSearch(false)}>
        X
      </div>
    </div>
  ) : (
    <div
      className="search"
      id="search"
      onClick={() => setShowSearch(true)}
      onFocus={() => setShowSearch(true)}
      onBlur={() => setShowSearch(false)}
    >
      Search
    </div>
  );
}

export default SearchBar;
