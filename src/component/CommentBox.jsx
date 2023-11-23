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
          <h5>Please Login or SignUp to comment here</h5>
          <button className="btn btn-success" onClick={() => navigate("/auth")}>
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
