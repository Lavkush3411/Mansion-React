import { ReactNode } from "react";
import Loader from "../admin_src/components/loader/Loader";

interface LoadingProps {
  isLoading: boolean;
  children: ReactNode;
}

function LoadOnApiCall({ isLoading, children }: LoadingProps) {
  return isLoading ? <Loader pos="absolute" /> : children;
}

export default LoadOnApiCall;
