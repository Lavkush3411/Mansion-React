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
    async function verfiyUser() {
      try {
        const res: any = await useAuth("user/verify-admin");
        setAuthenticated(res);
        navigate(location.pathname);
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
