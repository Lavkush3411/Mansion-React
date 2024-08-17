import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deauthenticate } from "../../redux/authenticatedSlice";
import axios from "axios";
const env = import.meta.env;

export const useAdminAuth = <T,>(token: T) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        dispatch(deauthenticate());
        setAuthenticated(false);
        return;
      }
      try {
        await axios.get(env.VITE_BASE_URL + "user/verify-admin", {
          withCredentials: true,
        });
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
    }
    checkAuth();
  });

  return authenticated;
};
