import { NavLink, useNavigate } from "react-router-dom";
import "./bottom.scss";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListIcon from "@mui/icons-material/List";
import { useDispatch } from "react-redux";
import { toggle, close } from "../../../redux/sidebarSlice";
import { toggleMenu } from "../../../redux/mobileNavbarSlice";
import { toggleUserDrawer } from "../../../redux/userDrawerSlice";
import { useState } from "react";

function Bottom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState<string>("");
  return (
    <div className="bottom">
      <NavLink
        className={`bottom-item ${currentItem === "home" ? "activated" : ""}`}
        to="/home"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate("/home");
          dispatch(close());
          setCurrentItem("home");
        }}
      >
        <HomeIcon />
      </NavLink>
      <NavLink
        className={`bottom-item ${
          currentItem === "products" ? "activated" : ""
        }`}
        to=""
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(toggleMenu());
          setCurrentItem("products");
        }}
      >
        <ListIcon />
      </NavLink>
      <NavLink
        className={`bottom-item ${currentItem === "cart" ? "activated" : ""}`}
        to=""
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(toggle());
          setCurrentItem("cart");
        }}
      >
        <ShoppingCartIcon />
      </NavLink>
      <NavLink
        className={`bottom-item ${
          currentItem === "profile" ? "activated" : ""
        }`}
        to=""
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(close());
          dispatch(toggleUserDrawer());
          setCurrentItem("profile");
        }}
      >
        <AccountCircleIcon />
      </NavLink>
    </div>
  );
}

export default Bottom;
