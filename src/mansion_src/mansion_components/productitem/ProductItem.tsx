import { useLocation } from "react-router-dom";
import "./productitem.scss";
import { useContext, useState } from "react";
import { CartContext } from "../../../CartContextProvider";
import { CheckOutContext } from "../../../CheckOutContextProvider";
interface Stock {
  _id: string;
  size: string;
  quantity: number;
}
interface DataReceivedFromParentLink {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  stock: Stock[];
  moreinfo: string;
}

interface AddToCartData {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  size: string;
}

function ProductItem() {
  const location = useLocation();
  const {
    _id,
    productName,
    image,
    productPrice,
    stock,
    moreinfo,
  }: DataReceivedFromParentLink = location.state.productItem;
  const { setCheckoutState } = useContext(CheckOutContext);

  const [infoElement, setInfoElement] = useState<string>("discription");
  const [size, setSize] = useState<string>("");
  const [moreInfoText, setMoreInfoText] = useState<string>(moreinfo);
  const { cartList, cartDispatch, setShowCart } = useContext(CartContext);
  const productItem = { _id, productName, image, productPrice };

  function onAddToCart(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productItem: AddToCartData
  ) {
    e.preventDefault();
    if (size !== "") {
      cartDispatch({ type: "add", payload: productItem });
      setShowCart(true);
      console.log("added to cart");
    } else {
      alert("select Size first");
    }
    console.log(cartList);
  }
  function onCheckout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productItem: AddToCartData
  ) {
    e.preventDefault();
    if (size !== "") {
      setCheckoutState(true);
      console.log(productItem);
    } else {
      alert("select Size first");
    }
  }

  function onDescriptionSelect() {
    setInfoElement("discription");
    setMoreInfoText(moreinfo);
  }

  function onShippingSelect() {
    setInfoElement("shipping");
    setMoreInfoText("Currently Shipping in Ahmedabad");
  }

  function onDetailsSelect() {
    setInfoElement("details");
    setMoreInfoText("Fabric and Wash Precautions");
  }

  function onSizeSelect(stockItem: Stock) {
    setSize(stockItem.size);
  }

  return (
    <div className="product" id={_id}>
      <div className="product-left-section">
        <div className="product-details">
          <div className="product-name">{productName}</div>
          <div className="product-price"> ₹{productPrice}</div>
        </div>
        <div className="additional-info">
          <div
            className={`discription ${
              infoElement === "discription" && "active"
            }`}
            onClick={onDescriptionSelect}
          >
            Description
          </div>
          <div
            className={`details ${infoElement === "details" && "active"}`}
            onClick={onDetailsSelect}
          >
            Details
          </div>
          <div
            className={`shipping ${infoElement === "shipping" && "active"}`}
            onClick={onShippingSelect}
          >
            Shipping
          </div>
        </div>
        <div className="moreinfo">{moreInfoText}</div>
      </div>
      <div className="product-mid-section">
        {image &&
          image.map((imagelink) => {
            return <img key={imagelink} src={imagelink} alt={productName} />;
          })}
      </div>
      <div className="product-right-section">
        <div className="stock">
          {stock &&
            stock.map((stockItem) => {
              return stockItem.quantity > 0 ? (
                <button
                  className={`${size === stockItem.size ? "active" : ""}`}
                  key={stockItem.size}
                  onClick={() => onSizeSelect(stockItem)}
                >
                  {stockItem.size}
                </button>
              ) : (
                <button disabled key={stockItem._id}>
                  {stockItem.size}
                </button>
              );
            })}
        </div>
        <div className="buying-buttons">
          <button onClick={(e) => onAddToCart(e, { ...productItem, size })}>
            Add to cart
          </button>
          <button
            className="buy-btn"
            onClick={(e) => onCheckout(e, { ...productItem, size })}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
