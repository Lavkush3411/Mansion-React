import "./checkout.scss";
import { useContext } from "react";
import { CheckOutContext } from "../../../CheckOutContextProvider";

function Checkout() {
  const { setCheckoutState } = useContext(CheckOutContext);

  return (
    <div className="checkout">
      <div className="checkout-box">
        <span className="close-btn" onClick={() => setCheckoutState(false)}>
          X
        </span>
        <div className="title">CHECKOUT</div>

        <main>
          <div>We are designing the checkoutpage</div>
          <div>Thank You for your patience.</div>
        </main>
      </div>
    </div>
  );
}

export default Checkout;
