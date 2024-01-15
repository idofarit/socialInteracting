import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../Firebase";

const Logout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth).then((e) => {
      toast.success("Logged out successfully");
      setUser(null);
      navigate("/auth");
    });
  };
  return (
    <>
      <li onClick={handleLogOut}>LogOut</li>
    </>
  );
};

export default Logout;
