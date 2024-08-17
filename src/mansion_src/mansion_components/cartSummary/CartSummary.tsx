const env = import.meta.env;
import axios from "axios";
import Button from "../button/Button";
import { SetStateAction, useContext, useState } from "react";
import "./cartsummary.scss";
import { useSelector } from "react-redux";
import SummaryItem from "../summaryItem/SummaryItem";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContextProvider";
import { Spinner } from "@chakra-ui/react";
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
  const [checkOutButtonDisabled, setCheckoutButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const checkoutProducts = useSelector(
    (store: any) => store.checkoutProducts
  ) as Data[];

  const subtotal = checkoutProducts.reduce((total, product) => {
    return total + Number(product.productPrice) * Number(product.qty);
  }, 0);
  const { loggedinuser } = useContext(UserContext);
  const redirectPath = useLocation();

  async function onCheckOut(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setCheckoutButtonDisabled(true);
    try {
      const response = await axios.post(
        env.VITE_BASE_URL + "payment/initiate",
        {
          user: loggedinuser,
          totalAmount: subtotal,
          contactNumber: 7854696543,
          products: checkoutProducts,
          redirectPath: redirectPath.pathname,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.url);
      window.location.href = response.data.url;
    } catch (e) {
      console.log(e);
      navigate("/");
    }
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
          <Button
            onClick={onCheckOut}
            disabledState={checkOutButtonDisabled}
            type="submit"
          >
            {checkOutButtonDisabled ? <Spinner /> : "Checkout"}
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
