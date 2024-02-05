import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

import { FirebaseProvider } from "./Firebase.jsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./pages/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer position="top-center" />
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <FirebaseProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FirebaseProvider>
    </ErrorBoundary>
  </>
);
