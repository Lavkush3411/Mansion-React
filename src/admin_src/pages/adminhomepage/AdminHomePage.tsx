import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import "./adminhomepage.scss";

//Page for spliting sidebar and mainPage

function AdminHomePage() {
  return (
    <div className="adminhomepage">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default AdminHomePage;
