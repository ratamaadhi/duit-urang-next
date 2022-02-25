import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { LOGIN } from "../context/AuthConst";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const { dispatch } = useAuthContext();

  function login(email, password) {
    setisSuccess(false);
    setError(null);
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setisSuccess(true);
        dispatch({ type: LOGIN, payload: res.user });
        setIsLoading(false);
        console.log("login", res.user);
      })
      .catch((err) => {
        setisSuccess(false);
        setIsLoading(false);
        setError(err.message);
      });
  }
  return { error, login, isLoading, isSuccess };
}
