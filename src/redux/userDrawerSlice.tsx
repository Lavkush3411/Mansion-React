import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const userDrawerSlice = createSlice({
  name: "userdrawer",
  initialState,
  reducers: {
    openUserDrawer(state) {
      state.isOpen = true;
    },
    closeUserDrawer(state) {
      state.isOpen = false;
    },
    toggleUserDrawer(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export default userDrawerSlice.reducer;
export const { openUserDrawer, closeUserDrawer, toggleUserDrawer } =
  userDrawerSlice.actions;
