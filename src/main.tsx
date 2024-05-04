import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContextProvider } from "./ContextProvider.tsx";
import { CartContextProvider } from "./CartContextProvider.tsx";
import { UserContexProvider } from "./UserContextProvider.tsx";
import { CheckOutContextProvider } from "./CheckOutContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CheckOutContextProvider>
      <ContextProvider>
        <CartContextProvider>
          <UserContexProvider>
            <App />
          </UserContexProvider>
        </CartContextProvider>
      </ContextProvider>
    </CheckOutContextProvider>
  </React.StrictMode>
);
