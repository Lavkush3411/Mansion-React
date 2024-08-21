import { useContext } from "react";
import { CartContext } from "../../CartContextProvider";
import { CartItemType } from "../types/cart";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../mansion_pages/utils/fetchData";

function useProductAvailibilityCheck() {
  const { cartList }: { cartList: CartItemType[] } = useContext(CartContext);
  const { data } = useQuery({
    queryKey: ["all"],
    queryFn: () => fetchData(),
  });
  const newCartList: CartItemType[] = [];
  const removedData: CartItemType[] = [];

  const idOfAllProducts: String[] = data.map((product: any) => product._id);
  cartList.forEach((cartItem) => {
    if (idOfAllProducts.includes(cartItem._id)) {
      newCartList.push(cartItem);
    } else {
      removedData.push(cartItem);
    }
  });
  localStorage.setItem("cart", JSON.stringify(newCartList));
  return { cartList: newCartList, removedData };
}

export default useProductAvailibilityCheck;
