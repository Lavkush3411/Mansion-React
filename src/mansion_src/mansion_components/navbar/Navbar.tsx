import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { useContext } from "react";
import { ButtonContext } from "../../../ContextProvider";

function Navbar() {
  const { state } = useContext(ButtonContext);
  return (
    <>
      <div className={`navbar`}>
        <div className="navbar-items">
          {state.productItems.map(
            (product: { name: string; image: string }) => (
              <NavLink key={product.name} to={`/${product.name}`}>
                {product.name}
              </NavLink>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
