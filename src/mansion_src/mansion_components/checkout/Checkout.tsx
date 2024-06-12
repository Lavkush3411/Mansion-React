import "./checkout.scss";
import { useContext, useState } from "react";
import { CheckOutContext } from "../../../CheckOutContextProvider";

import Address from "../addressComponent/Address";
import CartSummary from "../cartSummary/CartSummary";

function Checkout() {
  const { setCheckoutState } = useContext(CheckOutContext);
  const [isAddressPage, setIsAddressPage] = useState<boolean>(true);
  return (
    <div className="checkout">
      <div className="checkout-box">
        <span className="close-btn" onClick={() => setCheckoutState(false)}>
          X
        </span>
        <h1 className="title">{isAddressPage ? "ADDRESS" : "CHECKOUT"}</h1>

        {isAddressPage ? (
          <Address onButtonClick={setIsAddressPage} />
        ) : (
          <CartSummary onButtonClick={setIsAddressPage} />
        )}
      </div>
    </div>
  );
}

export default Checkout;
