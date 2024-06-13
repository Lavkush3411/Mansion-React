import { createSlice } from "@reduxjs/toolkit";

interface Data {
  _id: string;
  productName: string;
  image: string[];
  productPrice: string;
  size: string;
  qty: number;
}

const initialState: Data[] | [] = [];

const checkOutProductsSlice = createSlice({
  name: "checkoutproducts",
  initialState,
  reducers: {
    add(_, action) {
      return action.payload;
    },
  },
});
export const { add } = checkOutProductsSlice.actions;
export default checkOutProductsSlice.reducer;
