import { useNavigate } from "react-router-dom";
import "./newproduct.scss";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { ButtonContext, LoaderContext } from "../../../ContextProvider";
import { v4 as uuid } from "uuid";
import resizeImage from "../../utils/resizeImage";
import CancelIcon from "@mui/icons-material/Cancel";
import queryClient from "../../../queryClient";
const env = import.meta.env;

interface sizeListItem {
  _id: string;
  size: string;
  quantity: number;
}

interface AddedImages {
  id: string;
  file: File;
}

interface SrcOfAddedImages {
  id: string;
  source: string;
}

function NewProduct() {
  const navigate = useNavigate();
  const [images, setImages] = useState<AddedImages[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | undefined>(
    undefined
  );
  const [key, setKey] = useState(0);
  const [type, setType] = useState<string>("");
  const [sizeList, setSizeList] = useState<sizeListItem[] | []>([]);
  const [src, setSrc] = useState<SrcOfAddedImages[]>([]);
  const { state, dispatch } = useContext(ButtonContext);

  const { loaderDispatch } = useContext(LoaderContext);

  // function executed when images are selected
  const addSize = () => {
    setSizeList((prev) => {
      return [...prev, { _id: uuid(), size: "", quantity: 0 }];
    });
  };

  const removeSize = (removeSizeID: string): void => {
    setSizeList(sizeList.filter((size) => size._id !== removeSizeID));
  };

  const updateSize = (e: ChangeEvent<HTMLSelectElement>, id: string): void => {
    console.log(sizeList);

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
    console.log(sizeList);
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
  // this effect used to update image state when new image is added in collection
  useEffect(() => {
    (async function () {
      // force rerender if images are empty by updating the key
      console.log("effect ran");
      setKey((prev) => prev + 1);

      //executing function normally
      const sources: SrcOfAddedImages[] = await Promise.all(
        images.map((file) => {
          return new Promise<SrcOfAddedImages>((resolve) => {
            const filereader = new FileReader();

            filereader.onloadend = () => {
              if (typeof filereader.result === "string") {
                resolve({ source: filereader.result, id: file.id });
              } else {
                resolve({ source: "", id: file.id });
              }
            };

            filereader.readAsDataURL(file.file);
          });
        })
      );
      const filteredSources = sources.filter(
        (src) => src.source !== null || src.source !== ""
      );
      if (filteredSources) {
        setSrc(filteredSources);
      }
    })();
  }, [images]);
  const selectImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // we are creating array even if there is one file is selected
      const files: AddedImages[] = Array.from(e.target.files, (file) => ({
        id: uuid(),
        file: file,
      }));
      setImages((prev) => {
        return [...prev, ...files];
      });
    }
  };

  function removeImage(id: string) {
    // images.filter((image) => image.id !== id);

    setImages((prev) => prev.filter((image) => image.id !== id));
  }

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sizeList.length === 0) {
      alert("Add Size and Quantity by clicking on Add new Size Button");
      return;
    }
    if (images.length === 0) {
      alert("Add Atleast one product Image");
      return;
    }
    loaderDispatch({ type: "show-product-loader" });
    navigate("/admin/products/" + `${type}-list`);

    //form data
    const formdata = new FormData();
    const token: string | null = localStorage.getItem("Token");
    if (images) {
      // images.forEach((image) => {
      //   formdata.append("image", image.file);
      // });
      const blobs = await resizeImage(images);
      blobs.forEach((blob) => {
        formdata.append("image", blob as Blob);
      });
    }
    formdata.append("productName", String(productName));
    formdata.append("productPrice", String(productPrice));
    formdata.append("stock", JSON.stringify(sizeList));
    formdata.append("type", String(type));
    formdata.append("Token", String(token));
    const res = await fetch(env.VITE_BASE_URL + "admin/new/" + type, {
      method: "POST",
      body: formdata,
      credentials: "include",
    });
    const data = await res.json();
    dispatch({ type: "show" });
    console.log(data);
    loaderDispatch({ type: "hide-product-loader" });
    queryClient.invalidateQueries({ queryKey: ["all"] });
  };
  return (
    <div className="newproduct">
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
                  {product.name.slice(0, -1)}
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

          <label>Image</label>
          <input
            key={key}
            type="file"
            onChange={(e) => selectImage(e)}
            accept="image/*"
            multiple
          />
          <div className="selected-images">
            {src &&
              src.map((image) => (
                <div key={image.id} className="added-images">
                  <div
                    className="removeX"
                    onClick={() => removeImage(image.id)}
                  >
                    <CancelIcon />
                  </div>
                  <img src={image.source} alt="" />
                </div>
              ))}
          </div>
          <button type="submit">Create</button>
        </form>
      </article>
    </div>
  );
}

export default NewProduct;
