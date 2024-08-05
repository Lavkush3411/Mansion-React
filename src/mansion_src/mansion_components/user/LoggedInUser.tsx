import { NavLink, useNavigate } from "react-router-dom";
import "./loggedinuser.scss";
import { useDispatch } from "react-redux";
import { closeUserDrawer } from "../../../redux/userDrawerSlice";
import { logout } from "../../../redux/userSlice";
import { deauthenticate } from "../../../redux/authenticatedSlice";
import { open } from "../../../redux/sidebarSlice";

function LoggedInUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onShowOrders(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    dispatch(closeUserDrawer());
    navigate("/orders");
  }
  return (
    <div className="logged-in-user">
      <div className="dashboard-wrapper">
        <h3>DASHBOARD</h3>
        <section className="dashboard">
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              dispatch(closeUserDrawer());
            }}
            className="dashboard-item"
            to={"/"}
          >
            Profile
          </NavLink>
          <NavLink
            onClick={(e) => onShowOrders(e)}
            className="dashboard-item"
            to={"/orders"}
          >
            Orders
          </NavLink>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              dispatch(closeUserDrawer());
              dispatch(open());
            }}
            className="dashboard-item"
            to={""}
          >
            Cart
          </NavLink>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              dispatch(closeUserDrawer());
            }}
            className="dashboard-item"
            to={""}
          >
            Support
          </NavLink>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              dispatch(logout());
              dispatch(deauthenticate());
              dispatch(closeUserDrawer());
              navigate("/login");
            }}
            className="dashboard-item"
            to={""}
          >
            LogOut
          </NavLink>
        </section>
      </div>
    </div>
  );
}

export default LoggedInUser;
