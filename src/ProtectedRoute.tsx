import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  useEffect(() => {
    setIsAdmin(true);
  }, []);

  return isAdmin ? <div>{props.children}</div> : <Navigate to={"/"} replace />;
}

export default ProtectedRoute;
