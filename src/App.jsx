import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomeLayout from "./pages/HomeLayout";
import Error from "./pages/Error";
import Details from "./pages/Details";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import Auth from "./pages/Auth";
import { auth } from "./Firebase";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "detail/:id",
        element: <Details />,
        errorElement: <Error />,
      },
      {
        path: "create",
        element: <AddEditBlog />,
        errorElement: <Error />,
      },
      {
        path: "update/:id",
        element: <AddEditBlog />,
        errorElement: <Error />,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
