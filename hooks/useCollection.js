import { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

function useCollection({ name, _query, _orderBy }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const q = useRef(_query).current;
  const o = useRef(_orderBy).current;

  useEffect(() => {
    setLoading(true);
    let collectionRef = collection(db, name);
    if (q) {
      collectionRef = query(collectionRef, where(...q));
    }

    if (o) {
      collectionRef = query(collectionRef, orderBy(...o));
    }

    if (q && o) {
      collectionRef = query(collectionRef, where(...q), orderBy(...o));
    }

    const unsub = onSnapshot(collectionRef, (snapshot) => {
      const collectionDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoading(false);
      console.table(collectionDocs);
      setDocuments(collectionDocs);
    });

    return () => unsub();
  }, [name, q, o]);

  return { documents, loading };
}

export { useCollection };
