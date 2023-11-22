import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <img
        style={{
          display: "flex",
          margin: "auto",
          marginTop: "3rem",
        }}
        src="/public/1700637179332-Standard.png"
        alt="page not found"
      />
      <h4 className="text-center">
        The page You'er looking for, is not found!
      </h4>
      <Link
        to={"/"}
        className="text-center d-flex text-decoration-underline justify-content-center"
      >
        back to home
      </Link>
    </div>
  );
};

export default Error;
