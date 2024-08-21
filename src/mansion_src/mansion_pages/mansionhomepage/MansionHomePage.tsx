import { Link, LoaderFunction, Outlet, useNavigate } from "react-router-dom";
import "./mansionhomepage.scss";
import { lazy } from "react";
import SearchBar from "../../mansion_components/searchbar/SearchBar";
import { openUserDrawer } from "../../../redux/userDrawerSlice";
import { FaRegUserCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../mansion_components/navbar/Navbar";
import Footer from "../../mansion_components/footer/Footer";
import StyledButton from "../../mansion_components/button/StyledButton";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../../redux/sidebarSlice";
import { logout } from "../../../redux/userSlice";
import { RootState } from "../../../redux/store";
import { deauthenticate } from "../../../redux/authenticatedSlice";
import { useBackToClosePopup } from "../../hooks/useBackToClosePopup";
import { useScrollToTop } from "../../hooks/useScrolltoTop";
import useShowSearchAndProductList from "../../hooks/useShowSearchAndProductList";
import { usePrefetch } from "../../hooks/usePrefetch";
import axios from "axios";
import UnavailibilityPopup from "../../mansion_components/popups/unavailibilityPopUp";
const env = import.meta.env;
const Bottom = lazy(() => import("../../mansion_components/bottom/Bottom"));
const Cart = lazy(() => import("../../mansion_components/Cart/Cart"));
const MobileNavBar = lazy(
  () => import("../../mansion_components/navbar/MobileNavBar")
);

const UserSection = lazy(() => import("../userdetails/UserSection"));
const DeleteCartPopUp = lazy(
  () => import("../../mansion_components/popups/deleteCartPopUp")
);
const SizePopUp = lazy(
  () => import("../../mansion_components/popups/sizePopUp")
);

const loader: LoaderFunction = async () => {
  return null;
};

function MansionHomePage() {
  useAuth();
  useBackToClosePopup();
  useScrollToTop();
  usePrefetch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSearchAndProductList = useShowSearchAndProductList();
  const authenticated = useSelector(
    (store: RootState) => store.authentication.authenticated
  );

  async function onLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    dispatch(logout());
    dispatch(deauthenticate());
    await axios.get(env.VITE_BASE_URL + "user/logout", {
      withCredentials: true,
    });
    navigate("/login");
  }
  return (
    <div className="homepage-wrapper">
      <MobileNavBar />
      <div className="mansionhomepage">
        <header className="header-section">
          <div className="container">
            <Link to="/home">
              <h1 className="logo">
                {"Mansion".split("").map((char, index) => (
                  <div key={index}>{char}</div>
                ))}
              </h1>
            </Link>
            <SearchBar />
            <div className="login-cart-buttons" id="login-cart-buttons">
              {!authenticated ? (
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

              <div className="cart" onClick={() => dispatch(open())}>
                {/* button to open cart */}
                <button className="cart-button">Cart</button>
              </div>

              {/* button to open profile section */}
              <FaRegUserCircle
                className="user-profile"
                onClick={() => dispatch(openUserDrawer())}
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
      <UnavailibilityPopup />
      <DeleteCartPopUp />
      <Footer />
      <Bottom />
    </div>
  );
}

export default MansionHomePage;
export { loader };
