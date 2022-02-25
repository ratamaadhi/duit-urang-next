import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useSignup } from "../hooks/useSignup";
import ModalBottom from "./ModalBottom";

function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errForm, setErrForm] = useState(null);
  const [isOpen, setIsOpen] = useState(false)

  const { signup, error: errSignup, isLoading, isSuccess } = useSignup();

  function handleSignup(e) {
    e.preventDefault();
    setErrForm(null);
    if (confPassword !== password) {
      return setErrForm("konfirmasi password tidak sama");
    }
    signup(email, password, fullName);
  }

  useEffect(() => {
    if (isSuccess){
      setIsOpen(true)
      setEmail('')
      setFullName('')
      setPassword('')
      setConfPassword('')
      setShowPass(false)
    };

    return () => {};
  }, [isSuccess]);

  return (
    <div className="h-full w-full flex flex-col pb-8">
      <ModalBottom isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <p>Sign up berhasil daks</p>
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
            className={`px-4 py-3 peer w-full text-xs leading-relaxed tracking-wide border rounded-xl border-violet-300 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:bg-neutral-700 shadow-sm bg-violet-100 focus:bg-violet-200 focus:outline-none focus:ring-0 focus:border-violet-900 dark:focus:border-violet-300 placeholder:text-transparent ${
              isLoading && "text-violet-400"
            }`}
            disabled={isLoading}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
          <label className="absolute left-0 -top-6 text-sm text-violet-900 dark:text-violet-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-violet-400 dark:peer-placeholder-shown:text-neutral-600 peer-focus:-top-6 peer-focus:left-0 peer-focus:text-violet-900 dark:peer-focus:text-violet-300 peer-focus:text-sm">
            Full Name
          </label>
        </div>
        <div className="relative mb-1 mt-8">
          <input
            type={"email"}
            required
            placeholder="Email"
            className={`px-4 py-3 peer w-full text-xs leading-relaxed tracking-wide border rounded-xl border-violet-300 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:bg-neutral-700 shadow-sm bg-violet-100 focus:bg-violet-200 focus:outline-none focus:ring-0 focus:border-violet-900 dark:focus:border-violet-300 placeholder:text-transparent ${
              isLoading && "text-violet-400"
            }`}
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label className="absolute left-0 -top-6 text-sm text-violet-900 dark:text-violet-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-violet-400 dark:peer-placeholder-shown:text-neutral-600 peer-focus:-top-6 peer-focus:left-0 peer-focus:text-violet-900 dark:peer-focus:text-violet-300 peer-focus:text-sm">
            Email
          </label>
        </div>
        <div className="relative mb-1 mt-10">
          <input
            type={showPass ? "text" : "password"}
            required
            placeholder="Set Password"
            className={`px-4 py-3 peer w-full text-xs leading-relaxed tracking-wide border rounded-xl border-violet-300 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:bg-neutral-700 shadow-sm bg-violet-100 focus:bg-violet-200 focus:outline-none focus:ring-0 focus:border-violet-900 dark:focus:border-violet-300 placeholder:text-transparent ${
              isLoading && "text-violet-400"
            }`}
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label className="absolute left-0 -top-6 text-sm text-violet-900 dark:text-violet-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-violet-400 dark:peer-placeholder-shown:text-neutral-600 peer-focus:-top-6 peer-focus:left-0 peer-focus:text-violet-900 dark:peer-focus:text-violet-300 peer-focus:text-sm">
            Set Password
          </label>
        </div>
        <div className="relative mb-1 mt-10">
          <input
            type={showPass ? "text" : "password"}
            required
            placeholder="Konfirmasi Password"
            className={`px-4 py-3 peer w-full text-xs leading-relaxed tracking-wide border rounded-xl border-violet-300 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:bg-neutral-700 shadow-sm bg-violet-100 focus:bg-violet-200 focus:outline-none focus:ring-0 focus:border-violet-900 dark:focus:border-violet-300 placeholder:text-transparent ${
              isLoading && "text-violet-400"
            }`}
            disabled={isLoading}
            onChange={(e) => setConfPassword(e.target.value)}
            value={confPassword}
          />
          <label className="absolute left-0 -top-6 text-sm text-violet-900 dark:text-violet-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-violet-400 dark:peer-placeholder-shown:text-neutral-600 peer-focus:-top-6 peer-focus:left-0 peer-focus:text-violet-900 dark:peer-focus:text-violet-300 peer-focus:text-sm">
            Konfirmasi Password
          </label>
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
        {errSignup && <p>{errSignup}</p>}
        {errForm && <p>{errForm}</p>}
      </form>
    </div>
  );
}

export default Signup;
