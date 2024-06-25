import { createSlice } from "@reduxjs/toolkit";

interface CartItemType {
  _id: string;
  productName: string;
  image: string[];
  productPrice: number;
  qty: number;
  size: string;
}

const initialState: { isOpen: boolean; deletionItem: null | CartItemType } = {
  isOpen: false,
  deletionItem: null,
};

const popUpSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopUp(state, payload) {
      state.isOpen = true;
      state.deletionItem = payload.payload;
    },
    closePopUp(state) {
      state.isOpen = false;
      state.deletionItem = null;
    },
    togglePopUp(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export default popUpSlice.reducer;
export const { openPopUp, closePopUp, togglePopUp } = popUpSlice.actions;
