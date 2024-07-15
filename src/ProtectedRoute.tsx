import { ReactNode } from "react";
import UnAuthorised from "./mansion_src/mansion_pages/unauthorisedpage/UnAuthorised";
import Loader from "./admin_src/components/loader/Loader";
import { useAdminAuth } from "./mansion_src/hooks/useAdminAuth";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("Token");
  const authenticated = useAdminAuth(token);

  return authenticated === null ? (
    <Loader />
  ) : authenticated ? (
    children
  ) : (
    <UnAuthorised />
  );
}

export default ProtectedRoute;
