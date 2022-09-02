import { createContext, useEffect, useReducer } from "react";
import token from "../service/token";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: token.getUser(),
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    if (state.user) {
      token.setUser(state.user);
    };
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
