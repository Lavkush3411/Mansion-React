import { createSlice } from "@reduxjs/toolkit";

const initialState: { authenticated: boolean } = { authenticated: false };

const authenticationSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    authenticate() {
      return { authenticated: true };
    },
    deauthenticate() {
      return { authenticated: false };
    },
    setAuthentiation(_, actions) {
      return actions.payload;
    },
  },
});

export default authenticationSlice.reducer;
export const { authenticate, deauthenticate, setAuthentiation } =
  authenticationSlice.actions;
