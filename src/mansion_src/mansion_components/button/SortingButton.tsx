import { useState } from "react";
import Button from "./Button";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface Stock {
  _id: string;
  size: string;
  quantity: number;
}

interface Data {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  stock: Stock[];
}

function SortingButton() {
  // const {}=useContext()
  const location = useLocation();
  const queryKey = location.pathname.replace("/", "");
  const queryClient = useQueryClient();
  const [ascendingSort, setAscendingSort] = useState(true);
  function onSort() {
    queryClient.setQueryData([queryKey], (olddata: Data[]) => {
      if (!olddata) return;
      if (ascendingSort) {
        return [...olddata].sort(
          (first, second) =>
            Number(first.productPrice) - Number(second.productPrice)
        );
      } else {
        return [...olddata].sort(
          (first, second) =>
            Number(second.productPrice) - Number(first.productPrice)
        );
      }
    });
    setAscendingSort((ascendingSort) => !ascendingSort);
  }

  return (
    <Button onClick={onSort} className="sort-button">
      Sort By Price
    </Button>
  );
}

export default SortingButton;
