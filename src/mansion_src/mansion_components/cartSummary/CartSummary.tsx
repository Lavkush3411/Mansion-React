const env = import.meta.env;
import axios from "axios";
import Button from "../button/Button";
import { SetStateAction } from "react";
import "./cartsummary.scss";
import { useSelector } from "react-redux";
import SummaryItem from "../summaryItem/SummaryItem";
interface Data {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  size: string;
  qty: number;
}

function CartSummary({
  onButtonClick,
}: {
  onButtonClick: React.Dispatch<SetStateAction<boolean>>;
}) {
  const checkoutProducts = useSelector(
    (store: any) => store.checkoutProducts
  ) as Data[];
  const subtotal = checkoutProducts.reduce((total, product) => {
    return total + Number(product.productPrice) * Number(product.qty);
  }, 0);
  async function onCheckOut(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const response = await axios.post(env.VITE_BASE_URL + "test/buy");
    window.location.href = response.data.url;
  }
  return (
    <main
      className="main-section"
      style={{ paddingBottom: checkoutProducts.length > 4 ? "50px" : "0px" }}
    >
      <div className="checkout-products-list">
        {checkoutProducts.map((product) => {
          return <SummaryItem key={product._id} product={product} />;
        })}
      </div>
      <div className="bottom-section-wrapper">
        <div className="subtotal">
          <h1>Total : {subtotal}</h1>
        </div>
        <div className="button-wrapper">
          <Button onClick={onCheckOut} type="submit">
            Checkout
          </Button>
          <Button onClick={() => onButtonClick(true)} type="submit">
            Back
          </Button>
        </div>
      </div>
    </main>
  );
}

export default CartSummary;
