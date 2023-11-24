import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import userIcon from "../assets/user.png";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Collapse } from "bootstrap";

const Header = ({ setActive, active, user, setUser }) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    signOut(auth).then((e) => {
      toast.success("Logged out successfully");
      setUser(null);
      navigate("/auth");
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light  ">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-togglable-md navbar-light">
            <button
              className="navbar-toggler mt-3 "
              type="submit"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              <span className="fa fa-bars"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav  me-auto  mb-2  mb-lg-0 ">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "Home" ? "active" : ""
                    }`}
                    onClick={() => setActive("Home")}
                  >
                    Home
                  </li>
                </Link>
                <Link to="/blogs" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "Blogs" ? "active" : ""
                    }`}
                    onClick={() => setActive("Blogs")}
                  >
                    Blogs
                  </li>
                </Link>
                <Link to="/create" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "Create" ? "active" : ""
                    }`}
                    onClick={() => setActive("Create")}
                  >
                    Create
                  </li>
                </Link>

                <Link to="/about" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "About" ? "active" : ""
                    }`}
                    onClick={() => setActive("About")}
                  >
                    About
                  </li>
                </Link>
              </ul>
              <div className="row g-3">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                  {user ? (
                    <>
                      <div className="profile-logo">
                        <img
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginTop: "12px",
                          }}
                          src={userIcon}
                          alt="userLogo"
                        />
                      </div>
                      <p style={{ marginTop: "12px", marginLeft: "8px" }}>
                        {user?.displayName}
                      </p>
                      <li className="nav-item nav-link" onClick={handleLogOut}>
                        LogOut
                      </li>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" style={{ textDecoration: "none" }}>
                        <li
                          className={`nav-item nav-link ${
                            active === "LogIn" ? "active" : ""
                          }`}
                          onClick={() => setActive("LogIn")}
                        >
                          LogIn
                        </li>
                      </Link>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;
