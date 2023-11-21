import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCO3EVY7PjsAAwWvUZrobD6Se9GWWujPYw",
  authDomain: "socialinteracting-d638a.firebaseapp.com",
  projectId: "socialinteracting-d638a",
  storageBucket: "socialinteracting-d638a.appspot.com",
  messagingSenderId: "879164210561",
  appId: "1:879164210561:web:073cd34d359e07676bfc80",
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
