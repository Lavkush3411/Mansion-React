import { useNavigate, useParams } from "react-router-dom";
import "./manageproduct.scss";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import products from "../../../assets/admin/productsdata.json";
import { ButtonContext } from "../../../ContextProvider";

interface DataType {
  id?: number;
  image: string;
  product: string;
  amount: string;
  manage?: string;
  type: string;
  stock: number;
}
function ManageProduct() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>("");
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [type, setType] = useState<string>("");

  const params = useParams();

  //hiding the new button if we are on manage page by clicking on manage
  const { state, dispatch } = useContext(ButtonContext);
  useEffect(() => {
    dispatch({ type: "hide" });
  }, []);

  //   checking and finding the data from database based on queryparams passed
  useEffect(() => {
    const table_row = params.table_row;
    if (table_row) {
      const [table, rowStr] = table_row.split("_");
      const row = parseInt(rowStr);

      // Type assertion for products object
      const typedProducts: { [key: string]: DataType[] } = products.products;

      if (typedProducts.hasOwnProperty(table) && !isNaN(row)) {
        const data = typedProducts[table][row - 1];
        if (data) {
          setProductName(data.product);
          setProductPrice(data.amount);
          setStock(data.stock);
          setImage(data.image);
        }
      }
    }
  }, [params.table_row, products]);

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
            required
            className="product-type"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled selected hidden>
              Type
            </option>
            {state.productItems.map((product: string) => (
              <option value={product}>{product.slice(0, -1)}</option>
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
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Price"
          />
          <label>Stock</label>
          <input
            type="number"
            min={0}
            max={100}
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
          <label>Image</label>
          <input
            type="file"
            onChange={(e) => selectImage(e)}
            accept="image/*"
          />
          {image && <img src={image} alt="" />}
          <button type="submit">Update</button>
        </form>
      </article>
    </div>
  );
}

export default ManageProduct;
