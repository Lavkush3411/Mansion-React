import { configureStore } from "@reduxjs/toolkit";
import checkOutProductsReducer from "./checkOutProductsSlice";
import sidebarSlice from "./sidebarSlice";
import mobileNavbarSlice from "./mobileNavbarSlice";
const store = configureStore({
  reducer: {
    checkoutProducts: checkOutProductsReducer,
    sidebar: sidebarSlice,
    mobileNavbar: mobileNavbarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
