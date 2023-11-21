import React from "react";

const Spinner = () => {
  return (
    <>
      <div role="status" className="spinner-border text-primary mt-5 spinner">
        <span className="visually-hidden">loading...</span>
      </div>
    </>
  );
};

export default Spinner;
