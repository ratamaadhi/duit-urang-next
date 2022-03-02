import { useEffect, useState } from "react";
import { auth, db, timestamp } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "../hooks/useAuthContext";
import { LOGIN } from "../context/AuthConst";
import { doc, setDoc } from "firebase/firestore";

export function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false)
  const { dispatch } = useAuthContext();

  async function signup(email, password, fullName) {
    setisSuccess(false);
    setError(null);
    setIsLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if(!res){
        setError('Gagal sign up daks');
        throw new Error('Gagal sign up daks')
      }

      await updateProfile(res.user, { displayName: fullName });
      
      const createdAt = timestamp.fromDate(new Date());
      const docUser = {
        id: res.user.uid,
        displayName: fullName,
        email: res.user.email,
        createdAt,
      };
      await setDoc(doc(db, "users", `${res.user.uid}`), docUser)

      if(!isCanceled){
        dispatch({ type: LOGIN, payload: res.user });
        setisSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      if(!isCanceled){
        setError(error.message);
        setisSuccess(false);
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { isLoading, error, signup, isSuccess };
}
