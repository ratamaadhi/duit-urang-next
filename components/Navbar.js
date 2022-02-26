import { HiOutlineMenu } from "react-icons/hi";
import { BiMoon, BiSun } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import ModalBottom from "./ModalBottom";
import Link from "next/link";
import { useAuthContext } from "../hooks/useAuthContext";
import { SET_THEME } from "../context/AuthConst";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const [enabled, setEnabled] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const { user, theme, dispatch } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    if (theme == "dark") {
      setEnabled(true);
    }

    return () => {}
  }, []);

  function setTheme() {
    if (!enabled) {
      dispatch({ type: SET_THEME, payload: "dark" });
      localStorage.setItem("theme", "dark");
      document.querySelector("html").classList.add("dark");
      document.querySelector("html").classList.remove("light");
    } else {
      dispatch({ type: SET_THEME, payload: "light" });
      localStorage.setItem("theme", "light");
      document.querySelector("html").classList.add("light");
      document.querySelector("html").classList.remove("dark");
    }
    setEnabled(!enabled);
  }

  function handleLogout(){
    logout(() => setIsopen(false))
  }
  return (
    <div className="w-full h-12 px-4 flex justify-between items-center font-poppins border-b border-violet-400/25">
      <ModalBottom
        isOpen={isOpen}
        closeModal={() => setIsopen(false)}
        closeButton={true}
      >
        <button className="w-full py-2 text-center border-t border-b border-violet-400/25 hover:text-violet-200 focus:outline-none focus-visible:ring-0"
          onClick={handleLogout}
        >
          Log out
        </button>
      </ModalBottom>
      <Link href={"/"}>
        <a className="text-base font-bold tracking-wide">Duit Urang</a>
      </Link>
      <div className="flex items-center space-x-4">
        <div>
          <Switch
            checked={enabled}
            onChange={setTheme}
            className={`${
              enabled ? "bg-violet-500" : "bg-violet-300"
            } relative inline-flex items-center h-6 rounded-full w-11 border border-violet-400`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled
                  ? "translate-x-6 text-violet-300"
                  : "translate-x-1 text-violet-900"
              } inline-block w-4 h-4 transform rounded-full`}
            >
              {enabled ? <BiSun /> : <BiMoon />}
            </span>
          </Switch>
        </div>
        {user && (
          <div className="p-1 text-2xl" onClick={() => setIsopen(true)}>
            <HiOutlineMenu />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
