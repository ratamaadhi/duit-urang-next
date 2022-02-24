import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

function useCollection(name, _query) {
  const [documents, setDocuments] = useState([]);

  const q = useRef(_query).current;

  useEffect(() => {
    let collectionRef = collection(db, name);
    if (q) {
      collectionRef = query(collectionRef, where(...q));
      console.log("q =>", q)
    }

    const unsub = onSnapshot(collectionRef, (snapshot) => {
      const collectionDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("collectionDocs: " + name, collectionDocs);
      setDocuments(collectionDocs);
    });

    return () => unsub();
  }, [name, q]);

  return { documents };
}

export { useCollection };
