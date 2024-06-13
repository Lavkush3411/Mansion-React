import "./summaryitem.scss";
interface Data {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  size: string;
  qty: number;
}

function SummaryItem({ product }: { product: Data }) {
  return (
    <div className="summary-item">
      <img className="image" src={`${product.image[0]}`} alt="" />
      <section className="details">
        <div className="name">{product.productName.toLocaleUpperCase()}</div>
      </section>
      <div className="price-size">
        <div className="price">₹{product.productPrice}</div>
        <div>Qty: {product.qty}</div>
        <div className="size">SIZE : {product.size}</div>
      </div>
    </div>
  );
}

export default SummaryItem;
