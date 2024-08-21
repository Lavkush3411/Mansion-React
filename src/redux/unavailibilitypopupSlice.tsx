import { createSlice } from "@reduxjs/toolkit";

const unavailibilityPopupSlice = createSlice({
  name: "unavailibility",
  initialState: { isOpen: false, msg: [""] },
  reducers: {
    showUnavailibility(state, payload) {
      state.isOpen = true;
      state.msg = payload.payload;
    },
    hideUnavailibility(state) {
      state.isOpen = false;
      state.msg = [""];
    },
  },
});

export default unavailibilityPopupSlice.reducer;
export const { showUnavailibility, hideUnavailibility } =
  unavailibilityPopupSlice.actions;
