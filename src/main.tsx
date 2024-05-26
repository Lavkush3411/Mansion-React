import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContextProvider } from "./ContextProvider.tsx";
import { CartContextProvider } from "./CartContextProvider.tsx";
import { UserContexProvider } from "./UserContextProvider.tsx";
import { CheckOutContextProvider } from "./CheckOutContextProvider.tsx";
import { ProductListContextProvider } from "./ProductListContextProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./queryClient.tsx";
import fetchData from "./mansion_src/mansion_pages/utils/fetchData.tsx";

queryClient.prefetchQuery({ queryKey: ["all"], queryFn: () => fetchData() });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}
      <CheckOutContextProvider>
        <ContextProvider>
          <CartContextProvider>
            <UserContexProvider>
              <ProductListContextProvider>
                <App />
              </ProductListContextProvider>
            </UserContexProvider>
          </CartContextProvider>
        </ContextProvider>
      </CheckOutContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
