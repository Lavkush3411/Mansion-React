import "./productcard.scss";

interface data {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  stock: number;
}
interface ProductCardProps {
  key: string;
  productItem: data;
}

function ProductCard({ productItem }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={productItem.image[0]} alt="" className="product-img" />
      <span className="product-name">{productItem.productName}</span>
      <span className="product-price">{[productItem.productPrice]}</span>
    </div>
  );
}

export default ProductCard;
