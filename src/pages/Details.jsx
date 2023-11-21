import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import Spinner from "../component/Spinner";

const Details = ({ setActive }) => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    id && getBlogDetails();
  }, [id]);

  const getBlogDetails = async () => {
    try {
      const docRef = doc(db, "blogs", id);
      setLoading(true);
      const blogDetail = await getDoc(docRef);
      setBlogs(blogDetail.data());
      setActive(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="single">
        <div
          className="blog-title-box"
          style={{ backgroundImage: `url('${blogs?.imgUrl}')` }}
        >
          <div className="overlay"></div>
          <div className="blog-title">
            <span>{blogs?.postedOn}</span>
            <h2>{blogs?.title}</h2>
          </div>
        </div>
        <div className="container-fluid pb-4 pt-4 padding blog-single-content">
          <div className="container padding">
            <div className="row mx-0">
              <div className="col-md-8">
                <span className="meta-info text-start">
                  By <p className="author">{blogs?.author}&nbsp;-</p>
                  {blogs?.postedOn}
                </span>
                <p className="text-start">{blogs?.description}</p>
              </div>
              <div className="col-md-3">
                <h2>Tags</h2>
                <h2>Most Popular</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
