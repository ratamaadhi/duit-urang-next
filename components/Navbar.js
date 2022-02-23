import { HiOutlineMenu } from "react-icons/hi";
import { BiMoon, BiSun } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

function Navbar() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if(theme == "dark"){
      setEnabled(true)
    }
  },[])

  function setTheme(){
    if(!enabled){
      localStorage.setItem('theme', "dark")
      document.querySelector("html").classList.add('dark');
      document.querySelector("html").classList.remove('light');
    }else{
      localStorage.setItem('theme', "light")
      document.querySelector("html").classList.add('light');
      document.querySelector("html").classList.remove('dark');
    }
    setEnabled(!enabled)
  }

  return (
    <div className="w-full h-12 px-4 flex justify-between items-center font-poppins border-b border-opacity-25 border-violet-400">
      <div className="text-base font-bold tracking-wide">Duit Urang</div>
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
        <div className="p-1 text-2xl">
          <HiOutlineMenu />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
