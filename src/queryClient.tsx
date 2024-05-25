import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
const env = import.meta.env;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30 * 60,
    },
  },
});

function prefetch() {
  async function fetchData(productName: string) {
    const res = await axios.get(env.VITE_BASE_URL + "get/" + productName);
    return res.data;
  }

  const products = [
    "all",
    "cargos",
    "sweatpants",
    "tshirts",
    "shirts",
    "hoodies",
  ];

  products.forEach((product) =>
    queryClient.prefetchQuery({
      queryKey: [product],
      queryFn: () => fetchData(product),
    })
  );
}

prefetch();
export default queryClient;
