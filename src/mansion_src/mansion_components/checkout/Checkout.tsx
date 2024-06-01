import "./checkout.scss";
import { useContext } from "react";
import { CheckOutContext } from "../../../CheckOutContextProvider";
import axios from "axios";
import Button from "../button/Button";
const env = import.meta.env;
function Checkout() {
  const { setCheckoutState } = useContext(CheckOutContext);
  async function onCheckOut() {
    const response = await axios.post(env.VITE_BASE_URL + "test/buy");
    window.location.href = response.data.url;
  }

  return (
    <div className="checkout">
      <div className="checkout-box">
        <span className="close-btn" onClick={() => setCheckoutState(false)}>
          X
        </span>
        <div className="title">CHECKOUT</div>

        <main className="main-section">
          <form action="">
            <input
              required
              type="text"
              className="form-input"
              name=""
              placeholder="Address1"
              id=""
            />
            <input
              required
              type="text"
              className="form-input"
              name=""
              placeholder="Address2"
              id=""
            />

            <input
              required
              type="text"
              className="form-input"
              name=""
              placeholder="City"
              id=""
            />
            <input
              required
              type="text"
              className="form-input"
              name=""
              placeholder="State"
              id=""
            />
            <input
              required
              type="text"
              className="form-input"
              name="pincode"
              placeholder="PinCode"
              id=""
            />
            <h1>Order Summary </h1>
          </form>
          <div className="button-wrapper">
            <Button onClick={onCheckOut} type="submit">
              Checkout
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Checkout;
