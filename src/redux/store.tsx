import { configureStore } from "@reduxjs/toolkit";
import checkOutProductsReducer from "./checkOutProductsSlice";
import sidebarSlice from "./sidebarSlice";
import mobileNavbarSlice from "./mobileNavbarSlice";
import userDrawerSlice from "./userDrawerSlice";
import popUpSlice from "./deleteCartPopUpSlice";
import sizeSelectorPopUpSlice from "./sizeSelectorPopUpSlice";
import userSlice from "./userSlice";
import authenticatedSlice from "./authenticatedSlice";
const store = configureStore({
  reducer: {
    checkoutProducts: checkOutProductsReducer,
    sidebar: sidebarSlice,
    mobileNavbar: mobileNavbarSlice,
    userDrawer: userDrawerSlice,
    popUp: popUpSlice,
    sizeSelectPopUp: sizeSelectorPopUpSlice,
    user: userSlice,
    authentication: authenticatedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
