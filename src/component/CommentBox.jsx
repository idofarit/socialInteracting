import React from "react";
import { useNavigate } from "react-router-dom";

const CommentBox = ({ userId, userComment, setUserComment, handleComment }) => {
  const navigate = useNavigate();
  return (
    <>
      <form action="" className="row blog-form">
        <div className="col-12 py-3">
          <textarea
            name=""
            id=""
            cols="10"
            rows="5"
            value={userComment}
            className="form-control description"
            onChange={(e) => setUserComment(e.target.value)}
          />
        </div>
      </form>
      {!userId ? (
        <>
          <span className="cmnt-span">
            Please Login or SignUp to comment here &nbsp;
          </span>
          <button
            className="btn btn-success mt-3"
            onClick={() => navigate("/auth")}
          >
            Click to Login/SignUp
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleComment}
          >
            Post Comment
          </button>
        </>
      )}
    </>
  );
};

export default CommentBox;
