import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UnAuthorised from "./mansion_src/mansion_pages/unauthorisedpage/UnAuthorised";
import Loader from "./admin_src/components/loader/Loader";
import useAuth from "./mansion_src/hooks/useAuth";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    useAuth("user/verify-admin")
      .then((res) => {
        setAuthenticated(res as boolean);
        navigate(location.pathname);
      })
      .catch(() => setAuthenticated(false));
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
