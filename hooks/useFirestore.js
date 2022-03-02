import { useReducer, useState, useEffect } from "react";
import { db, timestamp } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import {
  initialState,
  firestoreReducer,
} from "../context/firestore/firestoreReducer";

export function useFirestore(collectionName) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setCancelled] = useState(false);

  // collection ref
  const ref = collection(db, collectionName);

  // only dispatch is not canceled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
    return dispatch;
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, { ...doc, createdAt });
      console.log("addedDocument", addedDocument);
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  // delete a document
  const deleteDocument = () => {};

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
}
