const env = import.meta.env;
import axios from "axios";
import Button from "../button/Button";
import { SetStateAction, useContext, useState } from "react";
import "./cartsummary.scss";
import { useDispatch, useSelector } from "react-redux";
import SummaryItem from "../summaryItem/SummaryItem";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../UserContextProvider";
import { Spinner } from "@chakra-ui/react";
import { showUnavailibility } from "../../../redux/unavailibilitypopupSlice";
import { toast } from "react-hot-toast";
import { CheckOutContext } from "../../../CheckOutContextProvider";
import { CartContext } from "../../../CartContextProvider";
import queryClient from "../../../queryClient";

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
  const { setCheckoutState } = useContext(CheckOutContext);
  const { cartDispatch } = useContext(CartContext);

  const dispatch = useDispatch();
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
        env.VITE_BASE_URL + "payment/initiate-cod", //cod order
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
      toast.success(response.data.message);
      cartDispatch({ type: "clear", payload: [] });
      setCheckoutButtonDisabled(false);
      setCheckoutState(false);
      queryClient.refetchQueries();

      // console.log(response.data.url);
      // window.location.href = response.data.url;
    } catch (e: any) {
      toast.error(e.message);
      dispatch(showUnavailibility(e.response.data.msg));
      setCheckoutButtonDisabled(false);
    }
  }
  return (
    <main
      className="main-section"
      style={{ paddingBottom: checkoutProducts.length > 4 ? "50px" : "0px" }}
    >
      <div className="checkout-products-list">
        {checkoutProducts.map((product) => {
          return (
            <SummaryItem key={product._id + product.size} product={product} />
          );
        })}
      </div>
      <div className="cod-message">We are currently accepting COD orders</div>
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
            {checkOutButtonDisabled ? <Spinner /> : "Place COD Order"}
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
