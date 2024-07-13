import {
  Link,
  LoaderFunction,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./mansionhomepage.scss";
import { lazy, useContext, useEffect, useState } from "react";
import SearchBar from "../../mansion_components/searchbar/SearchBar";
import {
  closeUserDrawer,
  openUserDrawer,
} from "../../../redux/userDrawerSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from "../../../UserContextProvider";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../mansion_components/navbar/Navbar";
import Footer from "../../mansion_components/footer/Footer";
import { prefetch } from "../../../queryClient";
import StyledButton from "../../mansion_components/button/StyledButton";
import { useDispatch, useSelector } from "react-redux";
import { close, open } from "../../../redux/sidebarSlice";
import { logout } from "../../../redux/userSlice";
import { RootState } from "../../../redux/store";
import {
  deauthenticate,
  setAuthentiation,
} from "../../../redux/authenticatedSlice";
import { closeMenu } from "../../../redux/mobileNavbarSlice";
import { closePopUp } from "../../../redux/deleteCartPopUpSlice";
import { closeSizeSelectPopUp } from "../../../redux/sizeSelectorPopUpSlice";
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
  const { loggedinuser } = useContext(UserContext);
  const [loading, setLoad] = useState(true);
  const authenticated = useSelector(
    (store: RootState) => store.authentication.authenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title = "Mansion";
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

  const { mobNav, sideBar, user, sizeSelector, popup } = useSelector(
    (store: RootState) => ({
      mobNav: store.mobileNavbar.isOpen,
      sideBar: store.sidebar.isOpen,
      user: store.userDrawer.isOpen,
      sizeSelector: store.sizeSelectPopUp.isOpen,
      popup: store.popUp.isOpen,
    })
  );

  console.log(mobNav);

  useEffect(() => {
    function backButtonFunc() {
      if (mobNav || sideBar || user || sizeSelector || popup) {
        dispatch(close());
        dispatch(closeMenu());
        dispatch(closePopUp());
        dispatch(closeSizeSelectPopUp());
        dispatch(closeUserDrawer());
        navigate(1);
      }
    }

    window.addEventListener("popstate", backButtonFunc);

    return () => {
      window.removeEventListener("popstate", backButtonFunc);
    };
  }, [mobNav, sideBar, user, sizeSelector, popup]);

  useEffect(() => {
    useAuth("user/verify")
      .then((res) => {
        dispatch(setAuthentiation({ authenticated: res as boolean }));
        setLoad(false);
      })
      .catch(() => {
        dispatch(deauthenticate());
        setLoad(false);
      });
  }, [loggedinuser, dispatch]);

  // this effect will fetch data in background after 2 seconds of loading website
  useEffect(() => {
    const fetch = setTimeout(prefetch, 2000);
    return () => clearTimeout(fetch);
  }, []);

  function onLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    dispatch(logout());
    dispatch(deauthenticate());
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
                {title.split("").map((char, index) => (
                  <div key={index}>{char}</div>
                ))}
              </h1>
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
      <DeleteCartPopUp />
      <Footer />
      <Bottom />
    </div>
  );
}

export default MansionHomePage;
export { loader };
