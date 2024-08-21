import axios from "axios";
import { CartItemType } from "../../types/cart";
const env = import.meta.env;

async function availiblityCheck(cartList: CartItemType[]) {
  try {
    const res = await axios.post(
      env.VITE_BASE_URL + "products/availiblity-check",
      { cartList }
    );
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
}

export { availiblityCheck };
