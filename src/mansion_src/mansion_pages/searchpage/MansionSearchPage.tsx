import { useContext } from "react";
import ProductCard from "../../mansion_components/productcard/ProductCard";

import "./mansionsearchpage.scss";
import { ProductListContext } from "../../../ProductListContextProvider";

function MansionSearchPage() {
  const { productListState } = useContext(ProductListContext);

  return (
    <div className="product-list-container">
      <div className="product-list">
        {productListState.search.length !== 0 ? (
          productListState.search.map((productItem) => (
            <ProductCard key={productItem._id} productItem={productItem} />
          ))
        ) : (
          <div>Nothing Found</div>
        )}
      </div>
    </div>
  );
}

export default MansionSearchPage;
