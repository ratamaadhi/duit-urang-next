import React, { useState } from "react";
import {
  HiArrowSmDown,
  HiArrowSmUp,
  HiOutlineSwitchVertical,
  HiOutlinePlusSm,
  HiOutlineHome,
} from "react-icons/hi";
import FormTransaction from "./FormTransaction";
import ModalBottom from "./ModalBottom";

function BottomNav() {
  const [isOpenTransaction, setOpenTransaction] = useState(false)

  return (
    <div className="fixed bottom-0 clear-left max-w-[448px] w-full h-[84px] flex justify-around items-end pb-2 bg-violet-100 dark:bg-neutral-800 border-t border-violet-200/50 dark:border-neutral-700/50">
      <ModalBottom
        closeModal={() => setOpenTransaction(false)}
        title="Tambah Transaksi"
        isOpen={isOpenTransaction}
        closeButton={true}
      >
        <FormTransaction />
      </ModalBottom>
      <div className="flex flex-col justify-center items-center space-y-1">
        <div className="p-3 border border-violet-200 dark:border-neutral-700 rounded-xl dark:shadow-neutral-900/50">
          <HiOutlineHome />
        </div>
        <p className="text-xs">Home</p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-1">
        <div className="p-3 border border-violet-200 dark:border-neutral-700 rounded-xl dark:shadow-neutral-900/50">
          <HiArrowSmDown />
        </div>
        <p className="text-xs">Income</p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-1">
        <div className="p-3 bg-violet-300 dark:text-violet-900 border border-violet-400 dark:border-neutral-700 rounded-xl dark:shadow-neutral-900/50 shadow-md shadow-violet-300"
          onClick={() => setOpenTransaction(true)}
        >
          <HiOutlinePlusSm size={36} />
        </div>
        <p className="text-xs">Transaction</p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-1">
        <div className="p-3 border border-violet-200 dark:border-neutral-700 rounded-xl dark:shadow-neutral-900/50">
          <HiArrowSmUp />
        </div>
        <p className="text-xs">Expence</p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-1">
        <div className="p-3 border border-violet-200 dark:border-neutral-700 rounded-xl dark:shadow-neutral-900/50">
          <HiOutlineSwitchVertical />
        </div>
        <p className="text-xs">History</p>
      </div>
    </div>
  );
}

export default BottomNav;
