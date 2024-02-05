import React from "react";

const ErrorFallback = ({ error }) => {
  return (
    <div className="fallback">
      <p>Something went wrong</p>
      <span>{error.message}</span>
    </div>
  );
};

export default ErrorFallback;
