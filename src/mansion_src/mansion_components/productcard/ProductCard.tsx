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

// this is a product card rendered inside productlistmansion on home component
function ProductCard({ productItem }: ProductCardProps) {
  // function onAddToCart

  return (
    <div className="product-card-wrapper">
      <Link
        to={`/product/${productItem._id}`}
        state={{ productItem }}
        className="product-card"
      >
        <div className="img-wrapper">
          <img
            src={productItem.image[0]}
            alt={productItem.productName}
            className="product-img"
          />
        </div>
        <span className="product-name">{productItem.productName}</span>
        <span className="product-price">₹{[productItem.productPrice]}</span>
      </Link>
    </div>
  );
}

export default ProductCard;
