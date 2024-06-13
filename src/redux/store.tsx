import { configureStore } from "@reduxjs/toolkit";
import checkOutProductsReducer from "./checkOutProductsSlice";

const store = configureStore({
  reducer: {
    checkoutProducts: checkOutProductsReducer,
  },
});

export default store;
