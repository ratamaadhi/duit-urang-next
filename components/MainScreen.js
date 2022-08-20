import React from "react";
import { toMoney } from "../utils/toMoney";
import ListTransactions from "./ListTransactions";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment-mini";

function MainScreen() {
  const { user } = useAuthContext();
  const { documents: allTransactions, loadingTransaction } = useCollection({
    name: `users/${user.uid}/transactions`,
    _orderBy: ["tanggal", "desc"],
  });
  const { documents: userDoc, loadingUser } = useCollection({
    name: `users`,
    _query: ["id", "==", user.uid],
  });

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
          <div className="font-semibold text-2xl">
            {toMoney(userDoc[0]?.balance?.amount)}
          </div>
          <div className="text-xs leading-relaxed tracking-wide pt-4">
            Last update{" "}
            {moment(userDoc[0]?.balance?.updatedAt.toDate()).format(
              "Do MMM YYYY"
            )}
          </div>
        </div>
        <div className="self-start">
          <div className="uppercase text-2xl font-bold font-poppins rounded-2xl border border-violet-900 py-2 px-4">
            D
          </div>
        </div>
      </div>
      {/* // BALANCE */}

      <ListTransactions
        transactions={allTransactions}
        loading={loadingTransaction}
      />
    </div>
  );
}

export default MainScreen;
