import { useContext, useEffect } from "react";
import ProductCard from "../../mansion_components/productcard/ProductCard";

import "./mansionsearchpage.scss";
import { ProductListContext } from "../../../ProductListContextProvider";
import SortingButton from "../../mansion_components/button/SortingButton";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import fetchData from "../utils/fetchData";

function MansionSearchPage() {
  const { productListState } = useContext(ProductListContext);
  const [urlPrams] = useSearchParams();
  const searchQuerry = urlPrams.get("searchkey");
  const querycl = useQueryClient();
  const { productListDispatch } = useContext(ProductListContext);

  useEffect(() => {
    const searchWorker = new Worker("/search.js");
    fetchData().then(() => {
      searchWorker.postMessage({
        products: querycl.getQueryData(["all"]),
        query: searchQuerry ? searchQuerry : "",
      });
    });

    searchWorker.onmessage = (event) => {
      productListDispatch({ type: "search", payload: event.data });
    };
  }, [searchQuerry]);

  return (
    <>
      <SortingButton />
      <div className="product-list-container">
        <div className="product-list">
          {productListState.search.length !== 0 ? (
            productListState.search.map((productItem) => (
              <ProductCard key={productItem._id} productItem={productItem} />
            ))
          ) : (
            <div className="empty-search-items">
              <span style={{ color: "red" }}>Sorry, </span> No Items Found for
              your search !
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MansionSearchPage;
