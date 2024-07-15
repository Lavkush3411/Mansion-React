import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useShowSearchAndProductList() {
  const [showSearchAndProductList, setShowSearchAndProductList] =
    useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (
      pathname.includes("cargos") ||
      pathname.includes("bottoms") ||
      pathname.includes("tshirts") ||
      pathname.includes("shirts") ||
      pathname.includes("hoodies") ||
      pathname.includes("search")
    ) {
      setShowSearchAndProductList(true);
    } else {
      setShowSearchAndProductList(false);
    }
  }, [pathname]);
  return showSearchAndProductList;
}

export default useShowSearchAndProductList;
