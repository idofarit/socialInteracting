import moment from "moment/moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeatureBlogs = ({ blogs, title }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="blog-heading text-start  py-2 mb-4">{title}</div>
      {blogs.map((item, index) => (
        <div
          className="row pb-3"
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          <div className="col-5 align-self-center">
            <img src={item.imgUrl} alt="" className="most-popular-img" />
          </div>
          <div className="col-7 padding">
            <div className="text-start most-popular-font">{item.title}</div>
            <div className="text-start most-popular-font-meta">
              {moment().startOf("day").fromNow()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureBlogs;
