import { useContext } from "react";
import { ButtonContext } from "../../../ContextProvider";
import "./indexpage.scss";
import { ReactTyped } from "react-typed";
import { NavLink } from "react-router-dom";

function LandingPage() {
  const { state } = useContext(ButtonContext);
  return (
    <div className="landing-page-wrapper">
      <div className="landing-page">
        <h1 className="hero-text">
          <ReactTyped
            style={{ height: "400px" }}
            strings={[`Style You Need &nbsp; !!   Not the style you want !!!`]}
            typeSpeed={80}
            backSpeed={50}
            loop
          ></ReactTyped>
        </h1>
      </div>

      <div className="bottom-products-conatiner">
        {state.productItems.map((product: { name: string; image: string }) => (
          <NavLink key={product.name} to={`/get/${product.name}`}>
            <div className="product-wrapper">
              <img src={product.image} alt="" />
              <div className="text">{product.name}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
