const env = import.meta.env;
import axios from "axios";
import Button from "../button/Button";
import { SetStateAction } from "react";
import "./cartsummary.scss";

function CartSummary({
  onButtonClick,
}: {
  onButtonClick: React.Dispatch<SetStateAction<boolean>>;
}) {
  async function onCheckOut(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const response = await axios.post(env.VITE_BASE_URL + "test/buy");
    window.location.href = response.data.url;
  }
  return (
    <main className="main-section">
      <div className="checkout-products-list">
        
      </div>
      <div className="subtotal">
        <h1>Total : 500</h1>
      </div>
      <div className="button-wrapper">
        <Button onClick={onCheckOut} type="submit">
          Checkout
        </Button>
        <Button onClick={() => onButtonClick(true)} type="submit">
          Back
        </Button>
      </div>
    </main>
  );
}

export default CartSummary;
