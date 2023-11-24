import { Tooltip } from "bootstrap";
import React, { useEffect } from "react";

const Like = ({ userId, handleLike, likes }) => {
  useEffect(() => {
    let toolTipTriggerList = [].slice.call(
      document.querySelectorAll('[data-toggle="tooltip"]')
    );
    let toolTipList = toolTipTriggerList.map(function (tooltipTriggerElement) {
      return new Tooltip(tooltipTriggerElement);
    });
  }, []);
  const LikeStatus = () => {
    if (likes?.length > 0) {
      return likes.find((id) => id === userId) ? (
        <>
          <i className="bi bi-hand-thumbs-up-fill" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      ) : (
        <>
          <i className="bi bi-hand-thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <i className="bi bi-hand-thumbs-up" />
        &nbsp;Like
      </>
    );
  };

  return (
    <>
      <span
        style={{ float: "right", cursor: "pointer", marginTop: "-7px" }}
        onClick={!userId ? null : handleLike}
      >
        {!userId ? (
          <button
            type="button"
            data-bs-placement="top"
            title="Please login to like"
            data-toggle="tooltip"
            className="btn btn-primary"
          >
            <LikeStatus />
          </button>
        ) : (
          <button type="button" className="btn btn-primary">
            <LikeStatus />
          </button>
        )}
      </span>
    </>
  );
};

export default Like;
