import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import userIcon from "../../assets/user.png";

import "./style.scss";

import logo from "../../assets/logo-main.png";

import Login from "../Login/Login";
import Logout from "../Logout/Logout";

const Nav = ({ user }) => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const name = user?.displayName.split(" ");
  for (let i = 0; i < name?.length; i++) {
    var dpName = name[0];
    break;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "home") {
      navigate("/");
    }
    if (type === "blogs") {
      navigate("/blogs");
    }
    if (type === "create") {
      navigate("/create");
    }
    if (type === "login") {
      navigate("/auth");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <div className="header-container container-fluid">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("home")}>
            Home
          </li>
          <li className="menuItem" onClick={() => navigationHandler("blogs")}>
            Blogs
          </li>
          <li className="menuItem" onClick={() => navigationHandler("create")}>
            Create
          </li>
          <li className="menuItem">
            {user?.auth && (
              <div className="profile-logo">
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginTop: "5px",
                  }}
                  src={userIcon}
                  alt="userLogo"
                />
                <div>
                  <strong>&nbsp;Welcome&nbsp;</strong>
                  <span>{dpName}</span>
                </div>
              </div>
            )}
          </li>
          <ul className="menuItem">
            {user?.auth ? <Logout user={user} /> : <Login user={user} />}
          </ul>
        </ul>

        <div className="mobileMenuItems">
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
