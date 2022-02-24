import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useLogin() {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  function login(email, password) {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: LOGIN, payload: res.user });
        console.log("login",res.user)
      })
      .catch((err) => {
        setError(err.message);
      });
  }
  return { error, login };
}