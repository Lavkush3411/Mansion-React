import React, { ReactNode, createContext, useReducer } from "react";

interface State {
  showButton: boolean;
  productItems: { name: string; image: string }[];
}

interface actionType {
  type: string;
  payload: any;
}

interface ContextValue {
  state: any;
  dispatch: React.Dispatch<any>;
}

const initialState: State = {
  showButton: true,
  productItems: [
    { name: "tshirts", image: "/tshirt.png" },
    { name: "cargos", image: "/cargo.png" },
    { name: "bottoms", image: "/jeans.png" },
    { name: "shirts", image: "/shirt.png" },
    { name: "hoodies", image: "/hoodie.png" },
  ],
};

const ButtonContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => {},
});

function reducer(state: State, action: actionType): State {
  switch (action.type) {
    case "show":
      return { ...state, showButton: true };
    case "hide":
      return { ...state, showButton: false };
    default:
      return state;
  }
}

// Loader States

interface LoaderState {
  showLoaderInProductsPlace: boolean;
}
interface LoaderContextValue {
  loaderState: any;
  loaderDispatch: React.Dispatch<any>;
}

const initialLoaderState: LoaderState = {
  showLoaderInProductsPlace: false,
};

function loaderReducer(loaderState: LoaderState, action: actionType) {
  switch (action.type) {
    case "show-product-loader":
      return { ...loaderState, showLoaderInProductsPlace: true };
    case "hide-product-loader":
      return { ...loaderState, showLoaderInProductsPlace: false };

    default:
      return { ...loaderState };
  }
}

const LoaderContext = createContext<LoaderContextValue>({
  loaderState: initialLoaderState,
  loaderDispatch: () => {},
});

function ContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loaderState, loaderDispatch] = useReducer(
    loaderReducer,
    initialLoaderState
  );

  return (
    <LoaderContext.Provider value={{ loaderState, loaderDispatch }}>
      <ButtonContext.Provider value={{ state, dispatch }}>
        {children}
      </ButtonContext.Provider>
    </LoaderContext.Provider>
  );
}

export { ContextProvider, ButtonContext, LoaderContext };
