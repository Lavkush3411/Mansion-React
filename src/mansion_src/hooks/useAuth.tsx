import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deauthenticate,
  setAuthentiation,
} from "../../redux/authenticatedSlice";
const env = import.meta.env;

function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("Token");
  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        dispatch(deauthenticate());
        setAuthenticated(false);
        return;
      }
      try {
        setLoading(true);
        await axios.get(
          env.VITE_BASE_URL + "user/verify",
          { withCredentials: true }
        );
        dispatch(setAuthentiation({ authenticated: true }));
        setAuthenticated(true);
      } catch (error) {
        dispatch(deauthenticate());
        setAuthentiation(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [token]);

  return [authenticated, loading];
}

export default useAuth;
