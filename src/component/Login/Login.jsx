import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <li onClick={() => navigate("/auth")}>LogIn</li>
    </>
  );
};

export default Login;
