import { useContext } from "react";
import "./cart.scss";
import { CartContext } from "../../../CartContextProvider";
import CartItem from "./CartItem";
import { CheckOutContext } from "../../../CheckOutContextProvider";
import CheckOutPage from "../../mansion_pages/checkoutpage/CheckOutPage";
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
  const { checkoutState, setCheckoutState } = useContext(CheckOutContext);

  async function onCheckout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setShowCart(true);
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
