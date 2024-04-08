import { useLocation } from "react-router-dom";
interface Stock {
  _id: string;
  size: string;
  quantity: number;
}
interface data {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  stock: Stock;
}
function ProductItem() {
  const location = useLocation();
  // const { _id, productName, image, productPrice, stock }: data =
  //   location.state.productItem;
  const {productName}:data=location.state.productItem
  return (
    <div>
      <div className="name">{productName}</div>
    </div>
  );
}

export default ProductItem;
