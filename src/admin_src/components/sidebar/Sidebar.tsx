import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import { BiSolidDashboard } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { PiUsersFourFill } from "react-icons/pi";
import { BsBarChartFill } from "react-icons/bs";
import { GiPieChart } from "react-icons/gi";
import { PiChartLineFill } from "react-icons/pi";
import { useContext } from "react";
import { ButtonContext } from "../../../ContextProvider";
function Sidebar() {
  const context = useContext(ButtonContext);
  let dispatch: React.Dispatch<any>;

  if (context) {
    const { dispatch: dispatchContext } = context;
    dispatch = dispatchContext;
  }

  return (
    <aside className="sidebar">
      <img className="sidebar-logo" src="/mansion.svg" alt="Mansion Logo" />

      <div className="sidebar-section">
        <h4 className="sidebar-dashboard-title">Dashboard</h4>

        {/* Dashboard */}
        <div className="sidebar-dashboard-items">
          <NavLink to={"dashboard"} className={"sidebar-dashboard-item"}>
            <BiSolidDashboard />
            Dashboard
          </NavLink>
          <NavLink
            to={"products"}
            className={"sidebar-dashboard-item"}
            onClick={() => dispatch({ type: "show" })}
          >
            <FaBoxOpen /> Products
          </NavLink>
          <NavLink to={"transactions"} className={"sidebar-dashboard-item"}>
            <AiFillDollarCircle /> Transactions
          </NavLink>
          <NavLink to={"users"} className={"sidebar-dashboard-item"}>
            <PiUsersFourFill /> Users
          </NavLink>
        </div>

        {/* Charts */}
        <h4 className="sidebar-chart-title">Chart</h4>
        <div className="sidebar-chart-items">
          <NavLink to={"bar-chart"} className={"sidebar-chart-item"}>
            <BsBarChartFill /> Bar
          </NavLink>
          <NavLink to={"pie-chart"} className={"sidebar-chart-item"}>
            <GiPieChart />
            Pie
          </NavLink>
          <NavLink to={"line-chart"} className={"sidebar-chart-item"}>
            <PiChartLineFill />
            Line
          </NavLink>
        </div>

        {/* Game section if ever wanted to introduce a game */}
      </div>
    </aside>
  );
}

export default Sidebar;
