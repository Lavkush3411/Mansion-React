import {
  Link,
  LoaderFunction,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./mansionhomepage.scss";
import { useContext, useEffect, useState } from "react";
import Cart from "../../mansion_components/Cart/Cart";
import { UserContext } from "../../../UserContextProvider";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../mansion_components/navbar/Navbar";
import Footer from "../../mansion_components/footer/Footer";
import Bottom from "../../mansion_components/bottom/Bottom";
import { prefetch } from "../../../queryClient";
import StyledButton from "../../mansion_components/button/StyledButton";
import { useDispatch } from "react-redux";
import { open } from "../../../redux/sidebarSlice";
import MobileNavBar from "../../mansion_components/navbar/MobileNavBar";
import SearchBar from "../../mansion_components/searchbar/SearchBar";
import { openUserDrawer } from "../../../redux/userDrawerSlice";
import UserSection from "../userdetails/UserSection";
import { FaRegUserCircle } from "react-icons/fa";
import DeleteCartPopUp from "../../mansion_components/popups/deleteCartPopUp";
import SizePopUp from "../../mansion_components/popups/sizePopUp";

const loader: LoaderFunction = async () => {
  return null;
};

function MansionHomePage() {
  const { loggedinuser, userDispatch } = useContext(UserContext);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoad] = useState(true);

  const navigate = useNavigate();
  const disptach = useDispatch();

  // this effect is used to check authentication status of user
  const location = useLocation();
  const pathname = location.pathname;
  const showSearchAndProductList =
    pathname.includes("cargos") ||
    pathname.includes("bottoms") ||
    pathname.includes("tshirts") ||
    pathname.includes("shirts") ||
    pathname.includes("hoodies") ||
    pathname.includes("search");
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

  function onLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    localStorage.removeItem("Token");
    userDispatch({ type: "logout" });
    setAuthenticated(false);
    navigate("/login");
  }
  return (
    <div className="homepage-wrapper">
      <MobileNavBar />
      <div className="mansionhomepage">
        <header className="header-section">
          <div className="container">
            <Link to="/home">
              <h1 className="logo">Mansion</h1>
            </Link>
            <SearchBar />
            <div className="login-cart-buttons" id="login-cart-buttons">
              {loading ? (
                <Link
                  to={"/login"}
                  onClick={(e) => onLogout(e)}
                  className="login"
                >
                  <StyledButton>Logout</StyledButton>
                </Link>
              ) : !authenticated ? (
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
              )}

              <div className="cart" onClick={() => disptach(open())}>
                {/* button to open cart */}
                <button className="cart-button">Cart</button>
              </div>

              {/* button to open profile section */}
              <FaRegUserCircle
                className="user-profile"
                onClick={() => disptach(openUserDrawer())}
              />
            </div>
          </div>
        </header>
        <main className="product-container">
          {showSearchAndProductList && <Navbar />}
          <div className="product-list-wrapper">
            <Outlet />
          </div>
        </main>
      </div>

      <Cart />
      <UserSection />
      <SizePopUp />
      <DeleteCartPopUp />
      <Footer />
      <Bottom />
    </div>
  );
}

export default MansionHomePage;
export { loader };
