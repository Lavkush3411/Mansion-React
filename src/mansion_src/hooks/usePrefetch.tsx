import { useEffect } from "react";
import { prefetch } from "../../queryClient";

export const usePrefetch = () => {
  useEffect(() => {
    const fetch = setTimeout(prefetch, 2000);
    return () => clearTimeout(fetch);
  }, []);
};
