import { NavLink, Outlet } from "react-router-dom";
import "./mansionhomepage.scss";
import { useState } from "react";
function MansionHomePage() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuerry, setSearchQuerry] = useState<string>("");

  return (
    <div className="mansionhomepage">
      <div className="topbar">
        <span>Style you Need</span>
      </div>

      <div className="container">
        {!showSearch && (
          <div className="logo">
            <img src="mansion.svg" alt="" />
          </div>
        )}

        {showSearch ? (
          <div className="search-section">
            <div>Search</div>
            <input
              value={searchQuerry}
              type="text"
              autoCapitalize="on"
              autoFocus
              className="search"
              placeholder="Search"
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
              onChange={(e) =>
                setSearchQuerry(e.target.value.toLocaleUpperCase())
              }
            />
          </div>
        ) : (
          <div
            className="search"
            onClick={() => setShowSearch(true)}
            onFocus={() => setShowSearch(true)}
            onBlur={() => setShowSearch(false)}
          >
            Search
          </div>
        )}

        {!showSearch && <div className="login">Login</div>}
        {!showSearch && <div className="cart">Cart</div>}
      </div>

      <div className="navbar">
        <div className="navbar-items">
          <NavLink to={"shirts"}>Shirts</NavLink>
          <NavLink to={"tshirts"}>T-shirts</NavLink>
          <NavLink to={"hoodies"}>Hoodies</NavLink>
          <NavLink to={"cargos"}>Cargos</NavLink>
          <NavLink to={"sweatpants"}>Sweatpants</NavLink>
        </div>
      </div>

      <div className="product-list">
        <Outlet />
      </div>
    </div>
  );
}

export default MansionHomePage;
