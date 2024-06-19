import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
};

const mobileNavbar = createSlice({
  name: "mobileNavbar",
  initialState,
  reducers: {
    openMenu(state) {
      state.isOpen = true;
    },
    closeMenu(state) {
      state.isOpen = false;
    },
    toggleMenu(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openMenu, closeMenu, toggleMenu } = mobileNavbar.actions;
export default mobileNavbar.reducer;
