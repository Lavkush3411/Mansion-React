import { ReactNode, createContext, useReducer, useState } from "react";
import { CartItemType } from "./mansion_src/types/cart";

interface actionType {
  type: string;
  payload: any;
}
interface initialContext {
  cartList: any;
  cartDispatch: React.Dispatch<any>;
  showCart: boolean;
  setShowCart: any;
}

const initalState: CartItemType[] | [] = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "")
  : [];

//this reducer function is used to change the cart state
function reducer(
  state: CartItemType[] | [],
  action: actionType
): CartItemType[] | [] {
  const isItemExists = state.some(
    (item) =>
      item._id === action.payload._id && item.size === action.payload.size
  ); // check if item is in cart
  const qtyIsMorethanOne =
    isItemExists &&
    state.some(
      (item) =>
        item._id === action.payload._id &&
        item.size === action.payload.size &&
        action.payload.qty > 1
    ); // if qty is more than one this is helpful while removing the elements
  const maxQtyExceeded =
    isItemExists &&
    state.some(
      (item) =>
        item._id === action.payload._id &&
        item.size === action.payload.size &&
        item.qty > 4
    );
  console.log(maxQtyExceeded); // if max qty 5 is exceeded we will not add same item in cart anymore.
  if (maxQtyExceeded && action.type === "add") {
    return [...state];
  }
  switch (action.type) {
    case "add": {
      //if item exists
      const cart = isItemExists
        ? state.map(
            (item) =>
              item._id === action.payload._id &&
              item.size === action.payload.size // if currently mapped item is item we have tried to add in cart
                ? { ...item, qty: item.qty + 1 } // we will increase the quantity
                : item // retrun the item without touching if currently mapped item is not our item
          )
        : // if item does not exists in cart we will add new in cart
          [...state, { ...action.payload, qty: 1 }];
      localStorage.setItem("cart", JSON.stringify(cart)); // save the cart to localstorage
      return cart; // finally return the cart as a state
    }
    case "remove": {
      const cart = qtyIsMorethanOne
        ? state.map((item) =>
            item._id === action.payload._id && item.size === action.payload.size
              ? { ...item, qty: item.qty - 1 }
              : item
          )
        : state.filter(
            (item) =>
              !(
                item._id === action.payload?._id &&
                item.size === action.payload.size
              )
          );
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }
    case "delete": {
      const cart = state.filter(
        (item) =>
          !(
            item._id === action.payload?._id &&
            item.size === action.payload.size
          )
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }
    case "clear":
      return [];
    default:
      return [...state];
  }
}
const CartContext = createContext<initialContext>({
  cartList: initalState,
  cartDispatch: () => {},
  showCart: false,
  setShowCart: () => {},
});

function CartContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const [showCart, setShowCart] = useState<boolean>(false);

  return (
    <CartContext.Provider
      value={{ cartList: state, cartDispatch: dispatch, showCart, setShowCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContextProvider, CartContext };
