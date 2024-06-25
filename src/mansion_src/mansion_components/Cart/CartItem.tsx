import { useContext } from "react";
import "./cartitem.scss";
import { CartContext } from "../../../CartContextProvider";
import { useDispatch } from "react-redux";
import { openPopUp } from "../../../redux/deleteCartPopUpSlice";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img className="image" src={`${cartItem.image[0]}`} alt="" />
      <section className="details">
        <div className="name">{cartItem.productName.toLocaleUpperCase()}</div>
        <div className="handle-quantity">
          <div className="quantity">
            <button
              onClick={() => {
                if (cartItem.qty > 1) {
                  cartDispatch({ type: "remove", payload: cartItem });
                } else {
                  dispatch(openPopUp(cartItem));
                }
              }}
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
            onClick={() => dispatch(openPopUp(cartItem))}
          >
            <DeleteIcon />
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
