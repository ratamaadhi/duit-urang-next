import { doc, runTransaction, collection, setDoc } from "firebase/firestore";
import { db, timestamp } from "../firebase/config";

const transactionDocInit = {
  tanggal: timestamp.fromDate(new Date()),
  jenis: "",
  deskripsi: "",
  kategori: { id: 0, name: "" },
  amount: 0,
  createdAt: timestamp.fromDate(new Date()),
};
export const addTransactions = async ({
  user,
  docTransaction = transactionDocInit,
  dispatch,
}) => {
  dispatch({ type: "IS_PENDING" });
  console.log("docTransaction", docTransaction);
  const trRefCol = collection(db, `users/${user.uid}/transactions`);
  const trRefDoc = doc(trRefCol);

  const balanceDocRef = doc(db, `users/${user.uid}`);

  try {
    console.log("+docTransaction.amount", +docTransaction.amount);

    const newTransaction = await runTransaction(db, async (transactionRun) => {
      const balance = await transactionRun.get(balanceDocRef);
      const balanceData = {
        amount: balance.data().balance?.amount,
        updatedAt: balance.data().balance?.updatedAt,
      };

      if (!balanceData.amount) balanceData.amount = 0;
      console.log("balanceData.amount", balanceData.amount);
      if (
        docTransaction.jenis === "expense" &&
        balanceData.amount - +docTransaction.amount <= 0
      ) {
        dispatch({
          type: "ERROR",
          payload: "Balance tidak cukup!",
        });
        throw Error("Balance tidak cukup!")
      }

      const newBalance = {
        amount:
          docTransaction.jenis === "income"
            ? balanceData.amount + +docTransaction.amount
            : balanceData.amount - +docTransaction.amount,
        updatedAt: timestamp.fromDate(new Date()),
      };

      transactionRun.update(balanceDocRef, { balance: newBalance });
      await setDoc(trRefDoc, docTransaction);
      dispatch({
        type: "ADDED_DOCUMENT",
        payload: docTransaction,
      });
      return { newBalance, balanceData };
    });
    console.log("newBalance", newTransaction.newBalance);
  } catch (error) {
    console.log("error", error.message);
    dispatch({ type: "ERROR", payload: error.message });
  }
};
