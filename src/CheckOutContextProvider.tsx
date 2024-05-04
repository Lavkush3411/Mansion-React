import { ReactNode, createContext, useState } from "react";

// reducer definations

// context definations

interface ContextType {
  checkoutState: boolean;
  setCheckoutState: React.Dispatch<any>;
}

const CheckOutContext = createContext<ContextType>({
  checkoutState: false,
  setCheckoutState: () => {},
});

function CheckOutContextProvider({ children }: { children: ReactNode }) {
  const [checkoutState, setCheckoutState] = useState<boolean>(false);
  return (
    <CheckOutContext.Provider value={{ checkoutState, setCheckoutState }}>
      {children}
    </CheckOutContext.Provider>
  );
}

export { CheckOutContextProvider, CheckOutContext };
