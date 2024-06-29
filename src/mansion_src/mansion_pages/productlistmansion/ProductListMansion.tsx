import ProductCard from "../../mansion_components/productcard/ProductCard";
import { useNavigation } from "react-router-dom";
import "./productlistmansion.scss";

import { useParams } from "react-router-dom";
import Loader from "../../../admin_src/components/loader/Loader";
import axios from "axios";
const env = import.meta.env;
import { useQuery } from "@tanstack/react-query";
import SortingButton from "../../mansion_components/button/SortingButton";
interface Stock {
  _id: string;
  size: string;
  quantity: number;
}

interface Data {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  stock: Stock[];
}
async function fetchData(productName: string) {
  const res = await axios.get(env.VITE_BASE_URL + "get/" + productName);
  return res.data;
}
function ProductListMansion() {
  const parms = useParams();
  const { state } = useNavigation(); // used to check if loader function is running

  const { data, isFetching } = useQuery({
    queryKey: [parms.productName],
    queryFn: () => fetchData(parms.productName || "all"),
  });

  if (isFetching || state === "loading") return <Loader />;
  return (
    <>
      <SortingButton />
      <div className="product-list-container">
        <div className="product-list">
          {data &&
            data.map((productItem: Data) => (
              <ProductCard key={productItem._id} productItem={productItem} />
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductListMansion;
