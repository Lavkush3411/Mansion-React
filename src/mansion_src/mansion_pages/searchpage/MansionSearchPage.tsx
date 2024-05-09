import { useContext } from "react";
import ProductCard from "../../mansion_components/productcard/ProductCard";

// import "./productlistmansion.scss";
// import LoadOnApiCall from "../../../loadonapicall/LoadOnApiCall";
import { ProductListContext } from "../../../ProductListContextProvider";

function MansionSearchPage() {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { productListState } = useContext(ProductListContext);

  return (
    // <LoadOnApiCall isLoading={isLoading}>
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
    // </LoadOnApiCall>
  );
}

export default MansionSearchPage;
