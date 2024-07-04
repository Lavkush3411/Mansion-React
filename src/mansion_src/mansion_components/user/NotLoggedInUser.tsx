import { NavLink } from "react-router-dom";
import StyledButton from "../button/StyledButton";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { closeUserDrawer } from "../../../redux/userDrawerSlice";

function NotLoggedInUser() {
  const dispatch = useDispatch();
  return (
    // if not login then show
    <div className="user-login-buttons">
      <NavLink to={"/login"} onClick={() => dispatch(closeUserDrawer())}>
        <Button>Login</Button>
      </NavLink>
      <NavLink to={"/signup"} onClick={() => dispatch(closeUserDrawer())}>
        <StyledButton bgCol="black">SignUp</StyledButton>
      </NavLink>
    </div>
  );
}

export default NotLoggedInUser;
