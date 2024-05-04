import { useContext } from "react";
import "./cart.scss";
import { CartContext } from "../../../CartContextProvider";
import CartItem from "./CartItem";
import { CheckOutContext } from "../../../CheckOutContextProvider";
import CheckOutPage from "../../mansion_pages/checkoutpage/CheckOutPage";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
interface CartItemType {
  _id: string;
  productName: string;
  image: string[];
  productPrice: number;
  qty: number;
  size: string;
}
function Cart({ showCart }: { showCart: boolean }) {
  const { cartList, setShowCart } = useContext(CartContext);
  const { setCheckoutState } = useContext(CheckOutContext);
  const { checkoutState } = useContext(CheckOutContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function onCheckout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    //we are checking for user authorisation when user clicks on checkout so if user is authorised checkout will be shown.
    //otherwise login will be prompted.

    useAuth()
      .then((res) => {
        setShowCart(res as boolean);
        setCheckoutState(res as boolean);
        if (!res) {
          navigate("/home/login", { state: { path: location.pathname } });
        }
      })
      .catch(() => {
        setShowCart(false);
        setCheckoutState(false);
        navigate("/home/login", { state: { path: location.pathname } });
      });

    setCheckoutState(true);
  }

  return (
    <>
      <div className={`cartscreen ${showCart ? "active" : ""}`}>
        <div
          className={`leftcart ${showCart ? "active" : ""}`}
          onClick={() => setShowCart(false)}
        ></div>
        <div className="rightcart">
          <button className="close-cart" onClick={() => setShowCart(false)}>
            X
          </button>
          {cartList.length > 0 && <div className="cart-title">YOUR CART</div>}

          {cartList.length ? (
            <div className="cart-list">
              {cartList.map((cartItem: CartItemType) => {
                return (
                  <CartItem
                    key={cartItem._id + cartItem.size}
                    cartItem={cartItem}
                  />
                );
              })}{" "}
            </div>
          ) : (
            <h2 className="empty-cart-title">Your Cart Is Empty</h2>
          )}
          <button className="checkout-btn" onClick={(e) => onCheckout(e)}>
            Checkout
          </button>
        </div>
      </div>
      {checkoutState && <CheckOutPage />}
    </>
  );
}

export default Cart;
