import { createContext, useContext, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {}
  }

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid
            ? currentUser.uid + action.payload.id
            : action.payload.uid + currentUser.uid
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    < ChatContext.Provider value={{ userData: state, dispatch }} >
      {children}
    </ChatContext.Provider >
  );
};
