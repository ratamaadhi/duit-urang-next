import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "../hooks/useAuthContext";
import { LOGOUT } from "../context/AuthConst";

export function useLogout() {
  const { dispatch } = useAuthContext();
  function logout(callback) {
    signOut(auth)
      .then(() => {
        dispatch({ type: LOGOUT });
        console.log('user sign out')
        callback()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return { logout };
}
