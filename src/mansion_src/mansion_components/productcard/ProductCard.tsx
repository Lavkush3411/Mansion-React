import { Link } from "react-router-dom";
import "./productcard.scss";

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
interface ProductCardProps {
  key: string;
  productItem: Data;
}
// this is a product card rendered inside productlistmansion component
function ProductCard({ productItem }: ProductCardProps) {
  // function onAddToCart

  return (
    <Link
      to={`/home/product/${productItem.productName}`}
      state={{ productItem }}
      className="product-card"
    >
      <img src={productItem.image[0]} alt="" className="product-img" />
      <span className="product-name">{productItem.productName}</span>
      <span className="product-price">₹{[productItem.productPrice]}</span>
    </Link>
  );
}

export default ProductCard;
