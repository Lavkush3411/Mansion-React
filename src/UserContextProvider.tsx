import { ReactNode, createContext, useReducer } from "react";

interface UserType {
  name: string;
  email: string;
  contact: number;
  isAdmin: boolean;
}
interface actionType {
  type: string;
  payload: UserType;
}

interface initialContextValueType {
  loggedinuser: UserType | {};
  userDispatch: React.Dispatch<any>;
}

const UserContext = createContext<initialContextValueType>({
  loggedinuser: {},
  userDispatch: () => {},
});

const reducer = (state: UserType | {}, action: actionType): UserType | {} => {
  switch (action.type) {
    case "login":
      return { ...action.payload };
    case "logout":
      return {};
    default:
      return { ...state };
  }
};

const initialValue: UserType | {} = {};

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
