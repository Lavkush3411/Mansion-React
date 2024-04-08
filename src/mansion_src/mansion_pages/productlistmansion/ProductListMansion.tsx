import { useEffect, useState } from "react";
import ProductCard from "../../mansion_components/productcard/ProductCard";

import "./productlistmansion.scss";
const env = import.meta.env;
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
  stock: Stock;
}
interface productListProps {
  productName: string;
}
function ProductListMansion({ productName }: productListProps) {
  const [cargoList, setCarogList] = useState<Data[]>([]);
  useEffect(() => {
    fetch(env.VITE_BASE_URL + "get/" + productName)
      .then((res) => res.json())
      .then((data) => {
        return setCarogList(data);
      });
  }, [productName]);

  return (
    <div className="product-list-container">
      <div className="product-list">
        {cargoList &&
          cargoList.map((productItem) => (
            <ProductCard key={productItem._id} productItem={productItem} />
          ))}
      </div>
    </div>
  );
}

export default ProductListMansion;
