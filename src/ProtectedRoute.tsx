import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "./mansion_src/hooks/useFetch";
import UnAuthorised from "./mansion_src/mansion_pages/unauthorisedpage/UnAuthorised";
import Loader from "./admin_src/components/loader/Loader";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    async function verfiyUser() {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          setAuthenticated(false);
          return;
        }
        const res: any = await useFetch("user/verify-admin", {
          Token: token,
        });
        if (res.status === 200) {
          setAuthenticated(true);
          navigate(location.pathname);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        setAuthenticated(false);
      }
    }
    verfiyUser();
  }, []);

  return authenticated === null ? (
    <Loader />
  ) : authenticated ? (
    children
  ) : (
    <UnAuthorised />
  );
}

export default ProtectedRoute;
