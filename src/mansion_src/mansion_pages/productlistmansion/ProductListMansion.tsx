import { useContext, useEffect, useState } from "react";
import ProductCard from "../../mansion_components/productcard/ProductCard";

import "./productlistmansion.scss";
import LoadOnApiCall from "../../../loadonapicall/LoadOnApiCall";
import { ProductListContext } from "../../../ProductListContextProvider";
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
  stock: Stock[];
}
interface productListProps {
  productName: string;
}
function ProductListMansion({ productName }: productListProps) {
  const [cargoList, setCarogList] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { productListState, productListDispatch } =
    useContext(ProductListContext);

  useEffect(() => {
    setIsLoading(true);
    if (productListState[productName].length === 0) {
      fetch(env.VITE_BASE_URL + "get/" + productName)
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          productListDispatch({ type: productName, payload: data });
          return setCarogList(data);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setCarogList(productListState[productName]);
    }
  }, [productName]);

  return (
    <LoadOnApiCall isLoading={isLoading}>
      <div className="product-list-container">
        <div className="product-list">
          {cargoList &&
            cargoList.map((productItem) => (
              <ProductCard key={productItem._id} productItem={productItem} />
            ))}
        </div>
      </div>
    </LoadOnApiCall>
  );
}

export default ProductListMansion;
