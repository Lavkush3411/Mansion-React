import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./manageproduct.scss";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import products from "../../../assets/admin/productsdata.json";
import { ButtonContext } from "../../../ContextProvider";
import { v4 as uuid } from "uuid";

interface Size {
  id: string;
  quantity: number;
  size: string;
}

function ManageProduct() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>("");
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | undefined>(
    undefined
  );
  const [src, setSrc] = useState<string[]>([]);

  const [sizeList, setSizeList] = useState<Size[] | []>([]);
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
    console.log(location.state);
    setType(location.state.type);
    setImage(location.state.image[0]);
    setSizeList(location.state.stock);
    setProductName(location.state.name);
    setProductPrice(location.state.price);
    setSrc(location.state.image);
  }, [params.table_row, products]);

  const addSize = () => {
    setSizeList((prevList: Size[]): Size[] => {
      return [...prevList, { id: uuid(), size: "", quantity: 0 }];
    });
  };

  const updateSize = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
    setSizeList((prev): Size[] =>
      prev.map((item: Size): Size => {
        if (id === item.id) {
          item.size = e.target.value;
        }
        return item;
      })
    );
  };
  const updateQuantity = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setSizeList((prev): Size[] => {
      return prev.map((item: Size): Size => {
        if (item.id === id) {
          item.quantity = Number(e.target.value);
        }
        return item;
      });
    });
  };
  const removeSize = (id: string) => {
    setSizeList((prev): Size[] => {
      return prev.filter((item): boolean => item.id !== id);
    });
  };

  const selectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    if (file) {
      // Check if the selected file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setImage(reader.result);
          }
        };
      } else {
        alert("Please select an image file.");
        setImage(null);
      }
    }
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(-1);
    dispatch({ type: "show" });
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
            {state.productItems.map((product: string) => (
              <option key={product} value={product}>
                {product.slice(0, -1)}
              </option>
            ))}
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
            <div className="size-quantity" key={size.id}>
              <select
                required
                className="size"
                onChange={(e) => updateSize(e, size.id)}
                value={size.size}
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
                value={size.quantity ? size.quantity : ""}
                onChange={(e) => updateQuantity(e, size.id)}
              />
              {sizeList.length > 1 && (
                <button
                  type="button"
                  className="close-button"
                  onClick={() => removeSize(size.id)}
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

          <label>Image</label>
          <input
            type="file"
            required
            onChange={(e) => selectImage(e)}
            accept="image/*"
            multiple
          />
          <div className="selected-images">
            {src && src.map((image) => <img key={image} src={image} alt="" />)}
          </div>
          <button type="submit">Update</button>
        </form>
      </article>
    </div>
  );
}

export default ManageProduct;
