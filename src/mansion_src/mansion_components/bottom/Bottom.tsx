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

function Bottom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="bottom">
      <NavLink
        className="bottom-item"
        to="/home"
        onClick={(e) => {
          e.preventDefault();
          navigate("/home");
          dispatch(close());
        }}
      >
        <HomeIcon />
      </NavLink>
      <NavLink
        className="bottom-item"
        to=""
        onClick={(e) => {
          e.preventDefault();
          dispatch(toggleMenu());
        }}
      >
        <ListIcon />
      </NavLink>
      <NavLink
        className="bottom-item"
        to=""
        onClick={(e) => {
          e.preventDefault();
          dispatch(toggle());
        }}
      >
        <ShoppingCartIcon />
      </NavLink>
      <NavLink
        className="bottom-item"
        to=""
        onClick={(e) => {
          e.preventDefault();
          dispatch(close());
          dispatch(toggleUserDrawer());
        }}
      >
        <AccountCircleIcon />
      </NavLink>
    </div>
  );
}

export default Bottom;
