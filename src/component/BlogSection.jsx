import React from "react";
import { excerpt } from "../utility";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";

const BlogSection = ({
  userId,
  id,
  author,
  postedOn,
  title,
  description,
  imgUrl,
  category,
  user,
  handleDelete,
}) => {
  return (
    <div>
      <div className="row  pb-4">
        <div className="col-md-5 ">
          <div className="hover-blogs-img">
            <div className="blogs-img">
              <img src={imgUrl} alt={title} />
              <div></div>
            </div>
          </div>
        </div>
        <div className="col-md-7 pt-3">
          <div className="text-start">
            <h6 className="category catg-color">{category}</h6>
            <span className="title py-2">{title}</span>
            <span className="meta-info">
              <p className="author">{author}-&nbsp;</p>
              &nbsp;{postedOn}
            </span>
          </div>
          <div className="short-description">{excerpt(description, 120)}</div>
          <Link to={`/detail/${id}`}>
            <button className="btn btn-read">Read more</button>
          </Link>

          {userId && user?.uid === userId && (
            <div style={{ float: "right" }}>
              <FontAwesome
                name="trash"
                style={{ margin: "15px", cursor: "pointer" }}
                size="2x"
                onClick={() => handleDelete(id)}
              />
              <Link to={`/update/${id}`}>
                <FontAwesome
                  name="edit"
                  style={{ cursor: "pointer" }}
                  size="2x"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
