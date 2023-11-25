import "./App.css";
import "./mediaQueries.css";
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
import TagBlog from "./pages/TagBlog";
import CategoryBlog from "./pages/CategoryBlog";
import ScrollToTop from "./component/ScrollToTop";
import Blogs from "./pages/Blogs";

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
      <Header
        setActive={setActive}
        active={active}
        user={user}
        setUser={setUser}
      />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Home user={user} active={active} setActive={setActive} />}
        />
        <Route
          path="/search"
          element={<Home user={user} setActive={setActive} />}
        />
        <Route
          path="/detail/:id"
          errorElement={<Error />}
          element={<Details setActive={setActive} user={user} />}
        />
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
        <Route path="/tag/:tag" element={<TagBlog setActive={setActive} />} />
        <Route
          path="/category/:category"
          element={<CategoryBlog setActive={setActive} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs setActive={setActive} />} />
        <Route
          path="/auth"
          element={<Auth setActive={setActive} setUser={setUser} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
