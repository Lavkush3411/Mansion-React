import { Outlet, NavLink, useLocation } from "react-router-dom";
import "./products.scss";
import { useContext, useEffect, useRef } from "react";
import { ButtonContext } from "../../../ContextProvider";
function Products() {
  //location.pathname might don't have the reference of current path therefore we need to use useRef and use one useEffect to
  const currentPathRef = useRef("");
  const location = useLocation();
  const { state, dispatch } = useContext(ButtonContext);
  //hiding the new button if we are on managepage|new page by clicking on back button by using the pathname
  useEffect(() => {
    function handleBack() {
      dispatch({
        type:
          currentPathRef.current.includes("new") ||
          currentPathRef.current.includes("manage")
            ? "hide"
            : "show",
      });
      console.log(currentPathRef.current.includes);
    }
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    if (
      location.pathname.includes("new") ||
      location.pathname.includes("manage")
    ) {
      dispatch({
        type: "hide",
      });
    }
  }, []);

  return (
    <div className="products">
      <section className="products-list">
        {state.productItems.map((product: { name: string; image: string }) => (
          <NavLink
            key={product.name}
            to={`${product.name}-list`}
            className="product"
            onClick={() => dispatch({ type: "show" })}
          >
            {product.name}
          </NavLink>
        ))}
      </section>
      <Outlet />
      {state.showButton && (
        <NavLink to={`new`}>
          <button
            className="newitem"
            onClick={() => dispatch({ type: "hide" })}
          >
            {" "}
            +{" "}
          </button>
        </NavLink>
      )}
    </div>
  );
}

export default Products;
