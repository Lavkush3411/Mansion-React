import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { closeMenu } from "../../../redux/mobileNavbarSlice";
import "./styledlink.scss";
function StyledLink({ name }: { name: string }) {
  const dispatch = useDispatch();
  return (
    <NavLink
      className="nav-item-link"
      onClick={() => dispatch(closeMenu())}
      key={name}
      to={`/get/${name}`}
    >
      <div className="nav-item">{name}</div>
    </NavLink>
  );
}

export default StyledLink;
