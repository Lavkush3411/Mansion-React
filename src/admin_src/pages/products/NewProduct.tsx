import { useNavigate } from "react-router-dom";
import "./newproduct.scss";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { ButtonContext, LoaderContext } from "../../../ContextProvider";
const env = import.meta.env;

function NewProduct() {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | undefined>(
    undefined
  );
  const [stock, setStock] = useState<number | undefined>(undefined);
  const [type, setType] = useState<string>("");
  const [src, setSrc] = useState<string[]>([]);
  const { state, dispatch } = useContext(ButtonContext);

  const { loaderDispatch } = useContext(LoaderContext);

  // function executed when images are selected
  const selectImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // we are creating array even if there is one file is selected
      const files: File[] = Array.from(e.target.files);
      setImages(files);

      const sources: string[] = await Promise.all(
        files.map((file) => {
          return new Promise<string>((resolve) => {
            const filereader = new FileReader();

            filereader.onloadend = () => {
              if (typeof filereader.result === "string") {
                resolve(filereader.result);
              } else {
                resolve("");
              }
            };

            filereader.readAsDataURL(file);
          });
        })
      );
      const filteredSources = sources.filter(
        (source) => source !== null || source !== ""
      );
      if (filteredSources) {
        setSrc(filteredSources);
      }
    }
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loaderDispatch({ type: "show-product-loader" });
    navigate("/admin/products/" + `${type}-list`);

    //form data
    const formdata = new FormData();
    if (images) {
      images.forEach((image) => {
        formdata.append("image", image);
      });
    }
    formdata.append("productName", String(productName));
    formdata.append("productPrice", String(productPrice));
    formdata.append("stock", String(stock));
    formdata.append("type", String(type));

    const res = await fetch(env.VITE_BASE_URL + "admin/new/" + type, {
      method: "POST",
      body: formdata,
    });
    const data = await res.json();
    dispatch({ type: "show" });
    console.log(data);
    loaderDispatch({ type: "hide-product-loader" });
  };
  return (
    <div className="newproduct">
      <article>
        <form onSubmit={(e) => submitForm(e)}>
          <select
            required
            defaultValue={"type"}
            className="product-type"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="type" disabled hidden>
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
          <input
            type="number"
            min={0}
            max={100}
            value={stock ? stock : ""}
            onChange={(e) => setStock(Number(e.target.value))}
          />
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
          <button type="submit">Create</button>
        </form>
      </article>
    </div>
  );
}

export default NewProduct;
