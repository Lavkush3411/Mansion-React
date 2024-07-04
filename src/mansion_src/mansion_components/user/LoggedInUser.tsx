// import { useContext } from "react";
// import { UserContext } from "../../../UserContextProvider";
import { NavLink, useNavigate } from "react-router-dom";
import "./loggedinuser.scss";

function LoggedInUser() {
  //   const { loggedinuser } = useContext(UserContext);
  const navigate = useNavigate();
  function onShowOrders(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    navigate("orders");
  }
  return (
    <div className="logged-in-user">
      <div className="dashboard-wrapper">
        <h3>DASHBOARD</h3>
        <section className="dashboard">
          <NavLink
            onClick={(e) => {
              e.preventDefault();
            }}
            className="dashboard-item"
            to={"/"}
          >
            Profile
          </NavLink>
          <NavLink
            onClick={(e) => onShowOrders(e)}
            className="dashboard-item"
            to={"/"}
          >
            Orders
          </NavLink>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
            }}
            className="dashboard-item"
            to={""}
          >
            Cart
          </NavLink>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
            }}
            className="dashboard-item"
            to={""}
          >
            Support
          </NavLink>
        </section>
      </div>
    </div>
  );
}

export default LoggedInUser;
