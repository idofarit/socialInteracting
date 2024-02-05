import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDhnern7ty9lVE8hn3OSXOIZlMPGWW4a1I",
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
  // user active check
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //     // console.log("user", user);
  //   });
  // }, []);
  // user active check end

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
