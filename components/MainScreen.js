import React from "react";
import { toMoney } from "../utils/toMoney";
import ListTransactions from "./ListTransactions";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from "../hooks/useAuthContext";

function MainScreen() {
  const { user } = useAuthContext();
  const { documents: allTransactions, loading } = useCollection(`users/${user.uid}/transactions`);

  console.log("allTransactions", allTransactions)
  return (
    <div className="w-full">
      <div className="pb-2">
        <h1>Hi, {user.displayName}.</h1>
      </div>
      {/* BALANCE */}
      <div className="relative w-full h-auto p-4 flex justify-between items-center rounded-2xl bg-violet-300 dark:text-violet-800 shadow-xl shadow-violet-200 dark:shadow-neutral-900/50">
        <div className="flex flex-col">
          <h1 className="font-semibold text-sm leading-relaxed tracking-wide">
            Your balance
          </h1>
          <div className="font-semibold text-2xl">{toMoney(2370000)}</div>
          <div className="text-xs leading-relaxed tracking-wide pt-4">
            Last update Feb 25, 2022
          </div>
        </div>
        <div className="self-start">
          <div className="uppercase text-2xl font-bold font-poppins rounded-2xl border border-violet-900 py-2 px-4">
            D
          </div>
        </div>
      </div>
      {/* // BALANCE */}

      <ListTransactions transactions={allTransactions} loading={loading}/>
    </div>
  );
}

export default MainScreen;
