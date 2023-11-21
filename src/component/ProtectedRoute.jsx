import React, { useEffect } from "react";
import { useFirebase } from "../Firebase";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user }) => {
  return user ? children : <Navigate to={"/auth"} />;
};

export default ProtectedRoute;
