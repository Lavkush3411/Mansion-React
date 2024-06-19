import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { ProductListContext } from "../../../ProductListContextProvider";
import { useNavigate } from "react-router-dom";
import "./searchbar.scss";

function SearchBar() {
  const querycl = useQueryClient();
  const [searchQuerry, setSearchQuerry] = useState<string>("");
  const { productListDispatch } = useContext(ProductListContext);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const navigate = useNavigate();
  function onSearch() {
    const searchWorker = new Worker("/search.js");
    searchWorker.postMessage({
      products: querycl.getQueryData(["all"]),
      query: searchQuerry.toLowerCase(),
    });

    searchWorker.onmessage = (event) => {
      setSearchQuerry("");
      productListDispatch({ type: "search", payload: event.data });
      setShowSearch(false);
      navigate("search");
    };
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
