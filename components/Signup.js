import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useSignup } from "../hooks/useSignup";
import ModalBottom from "./ModalBottom";
import { toast, Slide } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

function Signup() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { signup, error: errSignup, isLoading, isSuccess } = useSignup();
  const { theme } = useAuthContext();

  function handleSignup(e) {
    e.preventDefault();
    if (confPassword !== password) {
      return toast.warn("konfirmasi password tidak sama", {
        position: "bottom-center",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
        theme: theme,
        autoClose: false,
      });
    }
    signup(email, password, fullName);
  }

  useEffect(() => {
    if (isSuccess) {
      // setIsOpen(true);
      setEmail("");
      setFullName("");
      setPassword("");
      setConfPassword("");
      setShowPass(false);
      toast.success("Sign up berhasil daks, log in keun.", {
        position: "bottom-center",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
        theme: theme,
        autoClose: 3000,
      });
      router.replace("/login");
    }

    if (errSignup) {
      toast.error("Sign up gagal cobaan deui.", {
        position: "bottom-center",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
        theme: theme,
        autoClose: false,
      });
    }

    return () => {};
  }, [isSuccess, errSignup]);

  return (
    <div className="h-full w-full flex flex-col pb-8">
      <ModalBottom isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <p>Sign up berhasil daks, log in keun.</p>
      </ModalBottom>
      <div className="w-full flex text-2xl items-center mb-8">
        <Link href={"/login"}>
          <a className="pr-4 py-2 text-center -ml-2">
            <HiChevronLeft />
          </a>
        </Link>
        <div>Sign Up</div>
      </div>
      <p className="text-xs">Sign up dudu dong biar bisa pake.</p>
      <form className="relative mt-8" onSubmit={handleSignup}>
        <div className="relative mb-1 mt-8">
          <input
            type={"text"}
            required
            placeholder="Full Name"
            className={`input-theme peer ${isLoading && "text-violet-400"}`}
            disabled={isLoading}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
          <label className="label-theme">Full Name</label>
        </div>
        <div className="relative mb-1 mt-8">
          <input
            type={"email"}
            required
            placeholder="Email"
            className={`input-theme peer ${isLoading && "text-violet-400"}`}
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label className="label-theme">Email</label>
        </div>
        <div className="relative mb-1 mt-10">
          <input
            type={showPass ? "text" : "password"}
            required
            placeholder="Set Password"
            className={`input-theme peer ${isLoading && "text-violet-400"}`}
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label className="label-theme">Set Password</label>
        </div>
        <div className="relative mb-1 mt-10">
          <input
            type={showPass ? "text" : "password"}
            required
            placeholder="Konfirmasi Password"
            className={`input-theme peer ${isLoading && "text-violet-400"}`}
            disabled={isLoading}
            onChange={(e) => setConfPassword(e.target.value)}
            value={confPassword}
          />
          <label className="label-theme">Konfirmasi Password</label>
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
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-xl bg-violet-300 shadow-xl shadow-violet-200 dark:shadow-neutral-900 text-violet-900 border border-transparent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>
        <div className="relative mb-1 mt-4 text-center text-xs">
          Geus boga akun? Cik{" "}
          <Link href={"/login"}>
            <a className="underline">Log in</a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
