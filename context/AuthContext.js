import { useReducer, createContext, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { AUTH_IS_READY, SET_THEME } from "./AuthConst";
import { authReducer } from "./AuthReducer";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    theme: "light"
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: AUTH_IS_READY, payload: user });
      unsub();
    });
    const theme = localStorage.getItem("theme") || 'light';
    dispatch({type: SET_THEME, payload: theme})
  }, []);

  if(process.env.NEXT_PUBLIC_ENV === "dev"){
    console.log("Auth state: ", state)
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
