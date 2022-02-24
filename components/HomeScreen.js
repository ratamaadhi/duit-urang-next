import Link from "next/link";
import React from "react";

function HomeScreen() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-[425px] flex flex-col justify-center items-center space-y-4">
        <span className="uppercase text-6xl font-bold font-poppins rounded-2xl border border-violet-900 dark:border-violet-200 py-4 px-6 shadow-lg shadow-violet-200 dark:shadow-neutral-900">
          d
        </span>
        <div className="text-center leading-relaxed tracking-wide">
          <p>
            Kamana jeung timana{" "}
            <span className="capitalize font-bold text-lg">duit urang</span> th,
          </p>
          <p>naha jol aya jol beak.</p>
          <p>Didieu ku urang lacak.</p>
        </div>
      </div>
      <Link href={'/login'}>
        <a className="px-4 py-2 rounded-2xl bg-violet-200 shadow-xl shadow-violet-300 dark:shadow-neutral-900 text-violet-900 border border-transparent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
          Yuk Mulai.
        </a>
      </Link>
    </div>
  );
}

export default HomeScreen;
