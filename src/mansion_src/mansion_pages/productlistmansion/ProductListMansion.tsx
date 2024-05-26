import ProductCard from "../../mansion_components/productcard/ProductCard";
import { useLoaderData, useNavigation } from "react-router-dom";
import "./productlistmansion.scss";
import Loader from "../../../admin_src/components/loader/Loader";
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
function ProductListMansion() {
  const { state } = useNavigation(); // used to check if loader function is running
  const data = useLoaderData() as Data[];

  if (state === "loading") return <Loader pos="absolute" />;
  return (
    <div className="product-list-container">
      <div className="product-list">
        {data &&
          data.map((productItem: Data) => (
            <ProductCard key={productItem._id} productItem={productItem} />
          ))}
      </div>
    </div>
  );
}

export default ProductListMansion;
