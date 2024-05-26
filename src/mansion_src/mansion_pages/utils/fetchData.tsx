import axios from "axios";
const env = import.meta.env;

export default async function fetchData(productName = "all") {
  const res = await axios.get(env.VITE_BASE_URL + "get/" + productName);
  return res.data;
}
