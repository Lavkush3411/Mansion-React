import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
};

const sidebar = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    },
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { open, close, toggle } = sidebar.actions;
export default sidebar.reducer;
