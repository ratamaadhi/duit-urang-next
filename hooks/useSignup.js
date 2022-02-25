import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "../hooks/useAuthContext";
import { LOGIN } from "../context/AuthConst";

export function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const { dispatch } = useAuthContext();

  function signup(email, password, fullName) {
    setisSuccess(false);
    setError(null);
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(res.user, { displayName: fullName });
        dispatch({ type: LOGIN, payload: res.user });
        console.log("signup", res.user);
        setisSuccess(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setisSuccess(false);
        setIsLoading(false);
      });
  }
  return { isLoading, error, signup, isSuccess };
}
