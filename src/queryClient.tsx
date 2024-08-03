import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
const env = import.meta.env;

const staleMinutes = 60;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: staleMinutes * 1000 * 60,
    },
  },
});

function prefetch() {
  async function fetchData(productName: string) {
    const res = await axios.get(env.VITE_BASE_URL + "products/" + productName);
    return res.data;
  }

  const products = ["all", "cargos", "bottoms", "tshirts", "shirts", "hoodies"];

  products.forEach((product) =>
    queryClient.prefetchQuery({
      queryKey: [product],
      queryFn: () => fetchData(product),
    })
  );
}

export { prefetch };
export default queryClient;
