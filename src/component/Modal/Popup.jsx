// Popup.js
import React, { useState, useEffect } from "react";
import gimg from "../../assets/g-img.png";
import "./Popup.scss";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { IoMdClose } from "react-icons/io";

const Popup = ({ user }) => {
  const navigate = useNavigate();
  // console.log(user);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(true);
    }, 20000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleGoogleSignIn = async () => {
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!user && (
        <div className={`popup ${showPopup ? "show" : ""}`}>
          <div className="popup-content">
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>
            <p>Join Us by Signing Up</p>

            {/* <div className="google-btn" onClick={handleGoogleSignIn}>
              <div className="google-icon-wrapper">
                <img
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <p className="btn-text">
                <b>Sign in with google</b>
              </p>
            </div> */}

            <div className="google-signup-container">
              <img className="google-icon" src={gimg} />
              <div
                className="google-signup-button"
                onClick={handleGoogleSignIn}
              >
                Sign Up with Google
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
