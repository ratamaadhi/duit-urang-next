import Link from "next/link";
import React, { useState } from "react";
import { HiChevronLeft } from "react-icons/hi";

function Login() {
  const [isLoading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex text-2xl items-center mb-8">
        <Link href={'/'}>
          <a className="pr-4 py-2 text-center -ml-2">
            <HiChevronLeft />
          </a>
        </Link>
        <div>Log In</div>
      </div>
      <p className="text-xs">Login heula nya daks ulah poho.</p>
      <form className="relative mt-8" onSubmit={(e) => e.preventDefault()}>
        <div className="relative mb-1 mt-8">
          <input
            type={"email"}
            required
            placeholder="Email"
            className={`px-4 py-3 peer w-full text-xs leading-relaxed tracking-wide border rounded-xl border-violet-300 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:bg-neutral-700 shadow-sm bg-violet-100 focus:bg-violet-200 focus:outline-none focus:ring-0 focus:border-violet-900 dark:focus:border-violet-300 placeholder:text-transparent ${
              isLoading && "text-violet-400"
            }`}
          />
          <label className="absolute left-0 -top-6 text-sm text-violet-900 dark:text-violet-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-violet-400 dark:peer-placeholder-shown:text-neutral-600 peer-focus:-top-6 peer-focus:left-0 peer-focus:text-violet-900 dark:peer-focus:text-violet-300 peer-focus:text-sm">
            Email
          </label>
        </div>
        <div className="relative mb-1 mt-10">
          <input
            type={showPass ? "text" : "password"}
            required
            placeholder="Password"
            className={`px-4 py-3 peer w-full text-xs leading-relaxed tracking-wide border rounded-xl border-violet-300 dark:border-neutral-600 dark:bg-neutral-800 dark:focus:bg-neutral-700 shadow-sm bg-violet-100 focus:bg-violet-200 focus:outline-none focus:ring-0 focus:border-violet-900 dark:focus:border-violet-300 placeholder:text-transparent ${
              isLoading && "text-violet-400"
            }`}
          />
          <label className="absolute left-0 -top-6 text-sm text-violet-900 dark:text-violet-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-violet-400 dark:peer-placeholder-shown:text-neutral-600 peer-focus:-top-6 peer-focus:left-0 peer-focus:text-violet-900 dark:peer-focus:text-violet-300 peer-focus:text-sm">
            Password
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
          <button className="w-full px-4 py-2 rounded-xl bg-violet-300 shadow-xl shadow-violet-200 dark:shadow-neutral-900 text-violet-900 border border-transparent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
            Log in
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
