import { ReactNode, useReducer, createContext } from "react";

interface Stock {
  _id: string;
  quantity: number;
  size: string;
}
interface DataType {
  _id: string;
  image: string[];
  productName: string;
  productPrice: string;
  manage?: string;
  delete?: string;
  type: string;
  stock: Stock[];
}
interface valueType {
  [key: string]: any;
  all: [] | DataType[];
  cargos: [] | DataType[];
  sweatpants: [] | DataType[];
  tshirts: [] | DataType[];
  shirts: [] | DataType[];
  hoodies: [] | DataType[];
  search: [] | DataType[];
}
interface actionType {
  type: string;
  payload: any;
}

const intialValue: valueType = {
  all: [],
  cargos: [],
  sweatpants: [],
  tshirts: [],
  shirts: [],
  hoodies: [],
  search: [],
};

function reducer(state: valueType, action: actionType) {
  switch (action.type) {
    case "search":
      return { ...state, search: action.payload };
    case "all":
      return { ...state, all: action.payload };
    case "cargos":
      return { ...state, cargos: action.payload };
    case "sweatpants":
      return { ...state, sweatpants: action.payload };
    case "tshirts":
      return { ...state, tshirts: action.payload };
    case "shirts":
      return { ...state, shirts: action.payload };
    case "hoodies":
      return { ...state, hoodies: action.payload };
    default:
      return { ...state };
  }
}

interface ContextType {
  productListState: valueType;
  productListDispatch: React.Dispatch<any>;
}

const ProductListContext = createContext<ContextType>({
  productListState: intialValue,
  productListDispatch: () => {},
});

function ProductListContextProvider({ children }: { children: ReactNode }) {
  const [productListState, productListDispatch] = useReducer(
    reducer,
    intialValue
  );

  return (
    <ProductListContext.Provider
      value={{ productListState, productListDispatch }}
    >
      {children}
    </ProductListContext.Provider>
  );
}

export { ProductListContextProvider, ProductListContext };
