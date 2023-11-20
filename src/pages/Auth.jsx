import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Auth = () => {
  const { setActive } = useGlobalContext();
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  const { email, password, firstName, lastName } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Login successful");
        setActive("Home");
      } else {
        return toast.error("All fields are mandatory");
      }
    } else {
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });
        await addDoc(collection(db, "users"), {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        })
          .then(async (e) => {
            toast.success("SignUp successful");
            navigate("/");
          })
          .then(async (e) => {
            setActive("Home");
          });
      } else {
        return toast.error("All fields are mandatory");
      }
    }
    navigate("/");
  };
  return (
    <div className="container-fluid mb-4">
      <div className="col-12 text-center">
        <div className="text-center heading py-2">
          {!signUp ? "Sign-In" : "Sign-Up"}
        </div>
      </div>

      <div className="row h-h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8  col-lg-6 ">
          <form action="" className="row" onSubmit={handleAuth}>
            {signUp && (
              <>
                <div className="col-12 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="First name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="Last name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="col-6 py-3">
              <input
                type="email"
                className="form-control input-text-box"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="col-6 py-3">
              <input
                type="password"
                className="form-control input-text-box"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="col col-12 py-3 text-center">
              <button
                className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
                type="submit"
              >
                {!signUp ? "SignIn" : "SignUp"}
              </button>
            </div>
          </form>
          <div>
            {!signUp ? (
              <>
                <div className="text-center justify-content-center mt-2 pt-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <span
                      className="link-danger"
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        margin: "0 0.4rem",
                      }}
                      onClick={() => setSignUp(true)}
                    >
                      SignUp
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center justify-content-center mt-2 pt-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?
                    <span
                      className="link-danger"
                      style={{
                        textDecoration: "none",
                        color: "#298af2",
                        cursor: "pointer",
                        margin: "0 0.4rem",
                      }}
                      onClick={() => setSignUp(false)}
                    >
                      SignIn
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
