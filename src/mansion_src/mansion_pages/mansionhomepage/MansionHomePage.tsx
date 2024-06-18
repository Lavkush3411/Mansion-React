import {
  Link,
  LoaderFunction,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./mansionhomepage.scss";
import { useContext, useEffect, useRef, useState } from "react";
import Cart from "../../mansion_components/Cart/Cart";
import { UserContext } from "../../../UserContextProvider";
import useAuth from "../../hooks/useAuth";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Navbar from "../../mansion_components/navbar/Navbar";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Footer from "../../mansion_components/footer/Footer";
import { ProductListContext } from "../../../ProductListContextProvider";
import Bottom from "../../mansion_components/bottom/Bottom";
import { useQueryClient } from "@tanstack/react-query";
import { prefetch } from "../../../queryClient";
import StyledButton from "../../mansion_components/button/StyledButton";
import { useDispatch } from "react-redux";
import { open, toggle } from "../../../redux/sidebarSlice";

const loader: LoaderFunction = async () => {
  return null;
};

function MansionHomePage() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuerry, setSearchQuerry] = useState<string>("");
  const { loggedinuser, userDispatch } = useContext(UserContext);
  const [showMobileNavbar, setShowMobileNavbar] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoad] = useState(true);
  const { productListDispatch } = useContext(ProductListContext);
  const navigate = useNavigate();
  const btnRef = useRef(null);
  const disptach = useDispatch();
  const querycl = useQueryClient();
  // this effect is used to check authentication status of user
  const location = useLocation();
  const pathname = location.pathname;
  const showSearchAndProductList =
    pathname.includes("cargos") ||
    pathname.includes("bottoms") ||
    pathname.includes("tshirts") ||
    pathname.includes("shirts") ||
    pathname.includes("hoodies");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    useAuth("user/verify")
      .then((res) => {
        setAuthenticated(res as boolean);
        setLoad(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoad(false);
      });
  }, [loggedinuser]);

  // this effect will fetch data in background after 2 seconds of loading website
  useEffect(() => {
    const fetch = setTimeout(prefetch, 2000);
    return () => clearTimeout(fetch);
  }, []);

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

  function onLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    localStorage.removeItem("Token");
    userDispatch({ type: "logout" });
    setAuthenticated(false);
    navigate("/login");
  }
  return (
    <div className="homepage-wrapper">
      <div
        className="menu-btn"
        onClick={() => setShowMobileNavbar(!showMobileNavbar)}
      >
        {showMobileNavbar ? (
          <KeyboardDoubleArrowLeftIcon
            className="menu-btn"
            style={{
              color: "black",
              fontSize: "2rem",
              position: "fixed",
              right: "10px",
            }}
          />
        ) : (
          <MenuOpenIcon
            className="menu-btn"
            style={{
              color: "white",
              fontSize: "2rem",
              position: "fixed",
              left: "10px",
            }}
          />
        )}
      </div>
      <div className="mansionhomepage">
        <header className="header-section">
          <div className="container">
            <Link to="/home">
              <h1 className="logo">Mansion</h1>
            </Link>
            {showSearch ? (
              <div className="search-section">
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
                  onChange={(e) =>
                    setSearchQuerry(e.target.value.toLocaleUpperCase())
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSearch();
                    }
                  }}
                />
                <div
                  className="close-button"
                  onClick={() => setShowSearch(false)}
                >
                  X
                </div>
              </div>
            ) : (
              showSearchAndProductList && (
                <div
                  className="search"
                  onClick={() => setShowSearch(true)}
                  onFocus={() => setShowSearch(true)}
                  onBlur={() => setShowSearch(false)}
                >
                  Search
                </div>
              )
            )}

            <div className="login-cart-buttons">
              {loading ? (
                <Link
                  to={"/login"}
                  onClick={(e) => onLogout(e)}
                  className="login"
                >
                  <StyledButton>Logout</StyledButton>
                </Link>
              ) : (
                !showSearch &&
                (!authenticated ? (
                  <Link to={"/login"} className="login">
                    <StyledButton>Login</StyledButton>
                  </Link>
                ) : (
                  <Link
                    to={"/login"}
                    onClick={(e) => onLogout(e)}
                    className="login"
                  >
                    <StyledButton>Logout</StyledButton>
                  </Link>
                ))
              )}
              {!showSearch && (
                <div className="cart" onClick={() => disptach(open())}>
                  {/* button to open cart */}
                  <button
                    className="cart-button"
                    ref={btnRef}
                    onClick={() => disptach(open())}
                  >
                    Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="product-container">
          {showSearchAndProductList && (
            <Navbar
              showMobileNavbar={showMobileNavbar}
              setShowMobileNavbar={setShowMobileNavbar}
            />
          )}
          <div className="product-list-wrapper">
            <Outlet />
          </div>
        </main>
      </div>

      <Cart />

      <Footer />
      <Bottom
        setShowCart={disptach(toggle())}
        setShowMobileNavbar={setShowMobileNavbar}
      />
    </div>
  );
}

export default MansionHomePage;
export { loader };
