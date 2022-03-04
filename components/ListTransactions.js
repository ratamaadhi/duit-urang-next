import moment from "moment-mini";
import React from "react";
import {
  HiOutlineDotsHorizontal,
  HiArrowSmUp,
  HiArrowSmDown,
} from "react-icons/hi";
import { toMoney } from "../utils/toMoney";

function ListTransactions({ transactions = [], header }) {
  return (
    <div className="sticky top-12 w-full max-h-full mt-6">
      <h1 className="mb-2 leading-relaxed tracking-wide font-poppins font-semibold">
        Transactions
      </h1>
      <div className="w-full h-[calc(100vh-(80px+34px))] pb-[86px] overflow-y-scroll">
        {transactions.length ? (
          transactions.map((tr) => (
            <div
              key={tr.id}
              className="w-full h-auto mb-5 p-3 flex justify-between rounded-lg bg-violet-300 shadow-md shadow-violet-400/50 dark:shadow-neutral-900"
            >
              <div className="w-full flex justify-between items-center">
                <div className="w-full h-full flex justify-start space-x-3">
                  <div className="">
                    <span className="w-12 h-12 flex justify-center items-center rounded-lg bg-violet-100 dark:bg-violet-200 shadow-violet-400/50 shadow-md">
                      {tr.jenis === "expense" ? (
                        <HiArrowSmUp className={"text-red-700"} />
                      ) : (
                        <HiArrowSmDown className={"text-green-700"} />
                      )}
                    </span>
                  </div>
                  <div className="w-full flex flex-col justify-between items-start dark:text-violet-800">
                    <div className="w-full flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold tracking-wide px-1 rounded bg-violet-200">
                        {tr.kategori.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs">
                          {moment(tr?.tanggal?.toDate()).format(
                            "Do MMM YYYY"
                          )}
                        </p>
                        <div className="text-xl dark:text-violet-800 px-1">
                          <HiOutlineDotsHorizontal />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">{tr.deskripsi}</p>
                    <h1 className="text-lg self-end flex items-center -mb-1">
                      {toMoney(tr.amount)}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-12 bg-violet-300"></div>
        )}
      </div>
    </div>
  );
}

export default ListTransactions;
