import { useEffect, useState } from "react";
import ProductCard from "../../mansion_components/productcard/ProductCard";

import "./cargoslist.scss";
const env = import.meta.env;
interface data {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  stock: number;
}
function CargosList() {
  const [cargoList, setCarogList] = useState<data[]>([]);
  useEffect(() => {
    fetch(env.VITE_BASE_URL + "get/cargos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return setCarogList(data);
      });
  }, []);

  return (
    <div className="cargo-list-container">
      <div className="cargo-list">
        {cargoList &&
          cargoList.map((productItem) => (
            <ProductCard key={productItem._id} productItem={productItem} />
          ))}
      </div>
    </div>
  );
}

export default CargosList;
