import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface UserType {
  name: string;
  email: string;
  contact: number;
  isAdmin: boolean;
  orders: string[];
}

const initialState: UserType | null = localStorage.getItem("Token")
  ? jwtDecode(localStorage.getItem("Token") || "")
  : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(_, action) {
      return action.payload;
    },
    logout() {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
