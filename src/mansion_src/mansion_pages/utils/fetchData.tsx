import axios from "axios";
const env = import.meta.env;

export default async function fetchData(productName = "all") {
  const res = await axios.get(env.VITE_BASE_URL + "products/" + productName);
  return res.data;
}

export const fetchOrders = async (email: string | null) => {
  if (!email) return [];
  const res = await axios.get(env.VITE_BASE_URL + "order/userOrders", {
    withCredentials: true,
  });
  return res.data;
};

export const findData = async (path: string | null) => {
  //finding user data
  try {
    const res = await axios.get(env.VITE_BASE_URL + path, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const updateUserData = async (data: any) => {
  try {
    const res = await axios.post(env.VITE_BASE_URL + "user", data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
