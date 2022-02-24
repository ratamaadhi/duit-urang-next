import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../hooks/useAuthContext";
import { LOGIN } from "../context/AuthConst";

export function useSignup() {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  function signup(email, password) {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: LOGIN, payload: res.user });
        console.log("signup",res.user)
      })
      .catch((err) => {
        setError(err.message);
      });
  }
  return { error, signup };
}
