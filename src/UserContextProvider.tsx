import { jwtDecode } from "jwt-decode";
import { ReactNode, createContext, useReducer } from "react";

interface UserType {
  name: string;
  email: string;
  contact: number;
  isAdmin: boolean;
  orders: string[];
}
interface actionType {
  type: string;
  payload: UserType;
}

interface initialContextValueType {
  loggedinuser: UserType | null;
  userDispatch: React.Dispatch<any>;
}

const UserContext = createContext<initialContextValueType>({
  loggedinuser: null,
  userDispatch: () => {},
});

const reducer = (
  state: UserType | null,
  action: actionType
): UserType | null => {
  switch (action.type) {
    case "login":
      //   console.log({ context: { ...action.payload } });
      return { ...action.payload };
    case "logout":
      return null;
    default:
      return state;
  }
};

const initialValue: UserType | null = localStorage.getItem("Token")
  ? jwtDecode(localStorage.getItem("Token") || "")
  : null;

function UserContexProvider({ children }: { children: ReactNode }) {
  const [user, userDispatch] = useReducer(reducer, initialValue);

  return (
    <UserContext.Provider
      value={{ loggedinuser: user, userDispatch: userDispatch }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContexProvider, UserContext };
