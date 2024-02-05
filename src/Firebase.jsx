import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { createContext, useContext } from "react";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: "blog-interacting.firebaseapp.com",
  projectId: "blog-interacting",
  storageBucket: "blog-interacting.appspot.com",
  messagingSenderId: "372138470652",
  appId: "1:372138470652:web:5c459b6a28eb5b18313b79",
  measurementId: "G-NQJ8CL5PPF",
};

export const useFirebase = () => useContext(FirebaseContext);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const FirebaseProvider = (props) => {
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "blogs", id));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        handleDelete,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
