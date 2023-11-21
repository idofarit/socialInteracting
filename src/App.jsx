import "./App.css";
import { Route, RouterProvider, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Error from "./pages/Error";
import Details from "./pages/Details";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import Auth from "./pages/Auth";
import { auth } from "./Firebase";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./component/Home";
import Header from "./component/Header";

const App = () => {
  const [active, setActive] = useState("Home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <>
      <Header setActive={setActive} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/detail/:id" element={<Details setActive={setActive} />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute user={user}>
              <AddEditBlog user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute user={user}>
              <AddEditBlog user={user} setActive={setActive} />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth setActive={setActive} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
