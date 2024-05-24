import { Link, LoaderFunction, Outlet, useNavigate } from "react-router-dom";
import queryClient from "../../../queryClient";
import "./mansionhomepage.scss";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../CartContextProvider";
import Cart from "../../mansion_components/Cart/Cart";
import { UserContext } from "../../../UserContextProvider";
import useAuth from "../../hooks/useAuth";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Navbar from "../../mansion_components/navbar/Navbar";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Footer from "../../mansion_components/footer/Footer";
import { ProductListContext } from "../../../ProductListContextProvider";
import axios from "axios";
import Bottom from "../../mansion_components/bottom/Bottom";
import { useQuery } from "@tanstack/react-query";
const env = import.meta.env;

async function fetchData(productName: string) {
  const res = await axios.get(env.VITE_BASE_URL + "get/" + productName);
  return res.data;
}

const loader: LoaderFunction = async (path) => {
  const productName = path?.params?.productName;
  const query = await queryClient.prefetchQuery({
    queryKey: [productName],
    queryFn: () => fetchData(productName || "all"),
  });
  console.log(query);

  return null;
};

function MansionHomePage() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuerry, setSearchQuerry] = useState<string>("");
  const { showCart, setShowCart } = useContext(CartContext);
  const { loggedinuser, userDispatch } = useContext(UserContext);
  const [showMobileNavbar, setShowMobileNavbar] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoad] = useState(true);
  const { productListDispatch } = useContext(ProductListContext);
  const navigate = useNavigate();

  const { data: DataForSearch } = useQuery({
    queryKey: ["all"],
    queryFn: () => fetchData("all"),
  });
  // this effect is used to check authentication status of user

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

  function onSearch() {
    const searchWorker = new Worker("/search.js");
    searchWorker.postMessage({
      products: DataForSearch,
      query: searchQuerry.toLowerCase(),
    });

    searchWorker.onmessage = (event) => {
      // console.log("received message");
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
    navigate("/home/login");
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
          <div className="topbar">
            <span>Style you Need</span>
            <span>Not the style you Want</span>
          </div>

          <div className="container">
            {!showSearch && (
              <Link to={"/home"} className="logo">
                <img src="/mansion.svg" alt="logo" />
              </Link>
            )}

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
              <div
                className="search"
                onClick={() => setShowSearch(true)}
                onFocus={() => setShowSearch(true)}
                onBlur={() => setShowSearch(false)}
              >
                Search
              </div>
            )}

            {loading ? (
              <span>Logout</span>
            ) : (
              !showSearch &&
              (!authenticated ? (
                <Link to={"login"} className="login">
                  Login
                </Link>
              ) : (
                <Link
                  to={"login"}
                  onClick={(e) => onLogout(e)}
                  className="login"
                >
                  LogOut
                </Link>
              ))
            )}
            {!showSearch && (
              <div className="cart" onClick={() => setShowCart(true)}>
                Cart
              </div>
            )}
          </div>
          {/* Navbar */}
          <Navbar
            showMobileNavbar={showMobileNavbar}
            setShowMobileNavbar={setShowMobileNavbar}
          />
        </header>
        <main className="product-container">
          <div className="product-list">
            <Outlet />
          </div>
        </main>
      </div>

      <Cart showCart={showCart} />

      <Footer />
      <Bottom
        setShowCart={setShowCart}
        setShowMobileNavbar={setShowMobileNavbar}
      />
    </div>
  );
}

export default MansionHomePage;
export { loader };
