import axios from "axios";
const env = import.meta.env;

export default async function fetchData(productName = "all") {
  const res = await axios.get(env.VITE_BASE_URL + "products/" + productName);
  return res.data;
}

export const fetchOrders = async (email: string | null) => {
  if (!email) return [];
  const res = await axios.post(env.VITE_BASE_URL + "order/userOrders", {
    email: email,
  });
  return res.data;
};
