import { Link } from "react-router-dom";
import "./productcard.scss";
import { MdAddShoppingCart } from "react-icons/md";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { openSizeSelectPopUp } from "../../../redux/sizeSelectorPopUpSlice";

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
  const dispatch = useDispatch();
  // function onAddToCart
  function onAddToCart(e: React.MouseEvent<HTMLDivElement>, productItem: Data) {
    e.preventDefault();
    dispatch(openSizeSelectPopUp(productItem));

    // navigate("/product/" + id);
  }
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
      <div className="cart-btn" onClick={(e) => onAddToCart(e, productItem)}>
        <Button>
          <MdAddShoppingCart style={{ fontSize: "1.5rem", margin: "0 auto" }} />
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
