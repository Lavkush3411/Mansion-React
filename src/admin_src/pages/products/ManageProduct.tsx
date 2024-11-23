import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./manageproduct.scss";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { ButtonContext, LoaderContext } from "../../../ContextProvider";
import { v4 as uuid } from "uuid";
import axios from "axios";
import queryClient from "../../../queryClient";
import toast from "react-hot-toast";
const env = import.meta.env;

interface sizeListItem {
  _id: string;
  size: string;
  quantity: number;
}

interface Stock {
  _id: string;
  quantity: number;
  size: string;
}
interface DataType {
  _id: string;
  image: string[];
  productName: string;
  productPrice: string;
  manage?: string;
  delete?: string;
  type: string;
  stock: Stock[];
}

function ManageProduct() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>("");
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | undefined>(
    undefined
  );
  const { loaderDispatch } = useContext(LoaderContext);
  const [src, setSrc] = useState<string[]>([]);
  const [sizeList, setSizeList] = useState<sizeListItem[] | []>([]);
  const [type, setType] = useState<string>("");
  const location = useLocation();
  const params = useParams();

  //hiding the new button if we are on manage page by clicking on manage
  const { state, dispatch } = useContext(ButtonContext);
  useEffect(() => {
    dispatch({ type: "hide" });
  }, []);

  //   checking and finding the data from database based on queryparams passed
  useEffect(() => {
    axios
      .get(env.VITE_BASE_URL + "products/id/" + location.state._id)
      .then((res) => {
        const data: DataType = res.data;
        setType(data.type);
        setImage(data.image[0]);
        setSizeList(data.stock);
        // console.log(data);
        setProductName(data.productName);
        setProductPrice(Number(data.productPrice));
        setSrc(data.image);
      })
      .catch(() => {
        console.log("Unable to fetch product");
      });
  }, [params.table_row]);

  const addSize = () => {
    setSizeList((prev) => {
      return [...prev, { _id: uuid(), size: "", quantity: 0 }];
    });
  };

  const removeSize = (removeSizeID: string): void => {
    setSizeList(sizeList.filter((size) => size._id !== removeSizeID));
  };

  const updateSize = (e: ChangeEvent<HTMLSelectElement>, id: string): void => {
    // console.log(sizeList);

    setSizeList((prev): sizeListItem[] => {
      const newSizeList = prev.map((item) => {
        if (item._id === id) {
          item.size = e.target.value;
        }
        return item;
      });
      return newSizeList;
    });
  };

  const updateQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    // console.log(sizeList);
    setSizeList((prev): sizeListItem[] => {
      const newSizeList = prev.map((item) => {
        if (item._id === id) {
          item.quantity = Number(e.target.value);
        }
        return item;
      });
      return newSizeList;
    });
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sizeList.length === 0) {
      alert("Add Size and Quantity by clicking on Add new Size Button");
      return;
    }
    loaderDispatch({ type: "hide-product-loader" });
    navigate("/admin/products/" + `${type}-list`);

    //form data
    const formdata = new FormData();
    formdata.append("productName", String(productName));
    formdata.append("productPrice", String(productPrice));
    formdata.append("stock", JSON.stringify(sizeList));
    formdata.append("type", String(type));
    const res = await fetch(env.VITE_BASE_URL + "admin/" + location.state._id, {
      method: "PATCH",
      body: formdata,
      credentials: "include",
    });
    const data = await res.json();
    // console.log(data);
    toast.success("Product Updated Successfully.");
    dispatch({ type: "show" });
    queryClient.invalidateQueries({ queryKey: ["all"] });
    loaderDispatch({ type: "hide-product-loader" });
  };
  return (
    <div className="manageproduct">
      <aside className="bigimage">
        <img src={image ? image : ""} alt="" />
      </aside>
      <article>
        <form onSubmit={(e) => submitForm(e)}>
          <select
            value={type}
            required
            className="product-type"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" hidden>
              Type
            </option>
            {state.productItems.map(
              (product: { name: string; image: string }) => (
                <option key={product.name} value={product.name}>
                  {!(product.name === "thrifted")
                    ? product.name.slice(0, -1)
                    : product.name}
                </option>
              )
            )}
          </select>
          <label>Name</label>
          <input
            required
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Name"
          />
          <label>Price</label>
          <input
            required
            type="number"
            value={productPrice ? productPrice : ""}
            onChange={(e) => setProductPrice(Number(e.target.value))}
            placeholder="Price"
          />
          <label>Stock</label>
          {sizeList.map((size) => (
            <div className="size-quantity" key={size._id}>
              <select
                required
                value={size.size}
                className="size"
                onChange={(e) => updateSize(e, size._id)}
              >
                <option value="" hidden>
                  Size
                </option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
              <input
                required
                type="number"
                className="quantity"
                value={size.quantity}
                onChange={(e) => updateQuantity(e, size._id)}
              />
              {sizeList.length > 1 && (
                <button
                  type="button"
                  className="close-button"
                  onClick={() => removeSize(size._id)}
                >
                  X
                </button>
              )}
            </div>
          ))}
          {sizeList.length < 5 && (
            <button type="button" className="new-size" onClick={addSize}>
              Add New Size
            </button>
          )}

          <label>Photos</label>
          <div className="selected-images">
            {src &&
              src.map((image) => (
                <div key={image} className="added-images">
                  <img src={image} alt="" />
                </div>
              ))}
          </div>
          <button type="submit">Update</button>
        </form>
      </article>
    </div>
  );
}

export default ManageProduct;
