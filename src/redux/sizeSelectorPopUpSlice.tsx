import { createSlice } from "@reduxjs/toolkit";

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

const initialState: { isOpen: boolean; productItem: null | Data } = {
  isOpen: false,
  productItem: null,
};

const sizeSelectPopUpSlice = createSlice({
  name: "sizeselectorpopup",
  initialState,
  reducers: {
    openSizeSelectPopUp(state, payload) {
      state.isOpen = true;
      console.log(payload.payload);
      state.productItem = payload.payload;
    },
    closeSizeSelectPopUp(state) {
      state.isOpen = false;
      state.productItem = null;
    },
    toggleSizeSelectPopUp(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export default sizeSelectPopUpSlice.reducer;
export const {
  openSizeSelectPopUp,
  closeSizeSelectPopUp,
  toggleSizeSelectPopUp,
} = sizeSelectPopUpSlice.actions;
