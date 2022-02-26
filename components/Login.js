import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { Slide, toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading, isSuccess } = useLogin();
  const { theme } = useAuthContext();

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    if (isSuccess) {
      router.replace("/");
    }
    if (error) {
      toast.warn("gagal daks, log in keun deui.", {
        position: "bottom-center",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
        theme: theme,
        autoClose: 3500,
      });
    }
    return () => {};
  }, [isSuccess, error]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex text-2xl items-center mb-8">
        <Link href={"/"}>
          <a className="pr-4 py-2 text-center -ml-2">
            <HiChevronLeft />
          </a>
        </Link>
        <div>Log In</div>
      </div>
      <p className="text-xs">Login heula nya daks ulah poho.</p>
      <form className="relative mt-8" onSubmit={handleLogin}>
        <div className="relative mb-1 mt-8">
          <input
            type={"email"}
            required
            placeholder="Email"
            className={`input-theme peer ${isLoading && "text-violet-400"}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <label className="label-theme">Email</label>
        </div>
        <div className="relative mb-1 mt-10">
          <input
            type={showPass ? "text" : "password"}
            required
            placeholder="Password"
            className={`input-theme peer ${isLoading && "text-violet-400"}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <label className="label-theme">Password</label>
        </div>
        <div className="relative mb-1 mt-4 flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            defaultValue={showPass}
            onChange={() => setShowPass(!showPass)}
          />
          <label className="text-xs">Lihat Password</label>
        </div>
        <div className="relative mb-1 mt-10">
          <button
            className="w-full px-4 py-2 rounded-xl bg-violet-300 shadow-xl shadow-violet-200 dark:shadow-neutral-900 text-violet-900 border border-transparent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Log in"}
          </button>
        </div>
        <div className="relative mb-1 mt-4 text-center text-xs">
          Can boga akun?{" "}
          <Link href={"/signup"}>
            <a className="underline">daftar</a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
