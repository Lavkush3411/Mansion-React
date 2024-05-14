import { NavLink } from "react-router-dom";
import "./bottom.scss";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListIcon from "@mui/icons-material/List";

function Bottom({
  setShowCart,
  setShowMobileNavbar,
}: {
  setShowCart: any;
  setShowMobileNavbar: any;
}) {
  return (
    <div className="bottom">
      <NavLink
        className="bottom-item"
        to="/home"
        onClick={() => {
          setShowMobileNavbar(() => false);
          setShowCart(() => false);
        }}
      >
        <HomeIcon />
      </NavLink>
      <NavLink
        className="bottom-item"
        to=""
        onClick={() => setShowMobileNavbar((prev: boolean) => !prev)}
      >
        <ListIcon />
      </NavLink>
      <NavLink
        className="bottom-item"
        to=""
        onClick={() => setShowCart((prev: boolean) => !prev)}
      >
        <ShoppingCartIcon />
      </NavLink>
      <NavLink
        className="bottom-item"
        to=""
        onClick={() => {
          setShowMobileNavbar(() => false);
          setShowCart(() => false);
        }}
      >
        <AccountCircleIcon />
      </NavLink>
    </div>
  );
}

export default Bottom;
