import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { useContext } from "react";
import { ButtonContext } from "../../../ContextProvider";

function Navbar({
  showMobileNavbar,
  setShowMobileNavbar,
}: {
  showMobileNavbar: boolean;
  setShowMobileNavbar: any;
}) {
  const { state } = useContext(ButtonContext);
  return (
    <>
      {showMobileNavbar && <div style={{ color: "black" }}>"Mansion"</div>}
      <div className={`navbar ${showMobileNavbar ? "show" : ""}`}>
        <div className="navbar-items">
          {state.productItems.map(
            (product: { name: string; image: string }) => (
              <NavLink
                key={product.name}
                to={`/${product.name}`}
                onClick={() => setShowMobileNavbar(false)}
              >
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
