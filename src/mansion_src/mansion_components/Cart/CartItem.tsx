import { useContext } from "react";
import "./cartitem.scss";
import { CartContext } from "../../../CartContextProvider";

interface CartItemType {
  _id: string;
  productName: string;
  image: string[];
  productPrice: number;
  qty: number;
  size: string;
}

interface cartItemProps {
  cartItem: CartItemType;
}
function CartItem({ cartItem }: cartItemProps) {
  const { cartDispatch } = useContext(CartContext);

  return (
    <div className="cart-item">
      <img className="image" src={`${cartItem.image[0]}`} alt="" />
      <section className="details">
        <div className="name">{cartItem.productName.toLocaleUpperCase()}</div>
        <div className="handle-quantity">
          <div className="quantity">
            <button
              onClick={() =>
                cartDispatch({ type: "remove", payload: cartItem })
              }
            >
              -
            </button>
            <span>{cartItem.qty}</span>{" "}
            <button
              onClick={() => cartDispatch({ type: "add", payload: cartItem })}
            >
              +
            </button>
          </div>
          <button
            className="delete-btn"
            onClick={() => cartDispatch({ type: "delete", payload: cartItem })}
          >
            Delete
          </button>
        </div>
      </section>
      <div className="price-size">
        <div className="price">₹{cartItem.productPrice}</div>
        <div className="size">SIZE : {cartItem.size}</div>
      </div>
    </div>
  );
}

export default CartItem;
