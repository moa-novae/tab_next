// Saves user information accessed globally
import React, { createContext, useReducer } from "react";
const initialState = { user: null };
const userStore = createContext(initialState);
const { Provider } = userStore;
const StateProvider = ({ children }) => {
  const [userState, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, user: action.user }; // do something with the action

      case "LOGOUT":
        return { ...state, user: null };

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ userState, dispatch }}>{children}</Provider>;
};

export { userStore, StateProvider };
