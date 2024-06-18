import { useLoaderData, useParams } from "react-router-dom";
import "./productitem.scss";
import { useContext, useState } from "react";
import { CartContext } from "../../../CartContextProvider";
import { CheckOutContext } from "../../../CheckOutContextProvider";
import queryClient from "../../../queryClient";
import fetchData from "../../mansion_pages/utils/fetchData";
import Loader from "../../../admin_src/components/loader/Loader";
import { useDispatch } from "react-redux";
import { add } from "../../../redux/checkOutProductsSlice";
import { open } from "../../../redux/sidebarSlice";

import * as React from "react";

interface Stock {
  _id: string;
  size: string;
  quantity: number;
}

interface AddToCartData {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  size: string;
}

interface LoaderData {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  stock: Stock[];
}
function loader() {
  const data = queryClient.fetchQuery({
    queryKey: ["all"],
    queryFn: () => fetchData(),
  });
  return data;
}

function ProductItem() {
  const params = useParams();
  const { setCheckoutState } = useContext(CheckOutContext);
  const allData = useLoaderData() as LoaderData[];
  const dispatch = useDispatch();
  const product = allData
    .filter((currentProduct) => currentProduct._id === params.id)
    .reduce((_, currentProduct) => currentProduct);

  const { _id, productName, image, productPrice, stock }: LoaderData = product;

  const [infoElement, setInfoElement] = useState<string>("discription");
  const [size, setSize] = useState<string>("");
  const [moreInfoText, setMoreInfoText] = useState<string>("  ");
  const { cartDispatch } = useContext(CartContext);
  const productItem = { _id, productName, image, productPrice };

  function onAddToCart(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productItem: AddToCartData
  ) {
    e.preventDefault();
    if (size !== "") {
      cartDispatch({ type: "add", payload: productItem });
      dispatch(open());
      console.log("added to cart");
    } else {
      alert("select Size first");
    }
  }
  function onCheckout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productItem: AddToCartData
  ) {
    e.preventDefault();
    if (size !== "") {
      setCheckoutState(true);
      dispatch(add([{ ...productItem, qty: 1 }]));
    } else {
      alert("select Size first");
    }
  }

  function onDescriptionSelect() {
    setInfoElement("discription");
    setMoreInfoText("");
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

  if (!product) return <Loader />;
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
          <button onClick={(e) => onCheckout(e, { ...productItem, size })}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export { loader };

export default ProductItem;
