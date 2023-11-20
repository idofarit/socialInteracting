import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import { AppProvider } from "./Context.jsx";
import { FirebaseProvider } from "./Firebase.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer position="top-center" />
    <FirebaseProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </FirebaseProvider>
  </React.StrictMode>
);
