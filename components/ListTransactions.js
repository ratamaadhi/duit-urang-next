import React from "react";

function ListTransactions({ transactions = [], header }) {
  return (
    <div className="w-full max-h-full mt-6">
      <h1 className="mb-2 leading-relaxed tracking-wide font-poppins font-semibold">
        Transactions
      </h1>
      {transactions.length ? (
        transactions.map((tr) => (
          <div key={tr.id} className="w-full h-12 mb-4 rounded-lg bg-violet-300 shadow-md shadow-violet-400/50 dark:shadow-neutral-900">
            
          </div>
        ))
      ) : (
        <div className="w-full h-12 bg-violet-300"></div>
      )}
    </div>
  );
}

export default ListTransactions;
