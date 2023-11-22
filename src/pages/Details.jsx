import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import Spinner from "../component/Spinner";
import Tags from "../component/Tags";
import MostPopular from "../component/MostPopular";
const Details = ({ setActive }) => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getBlogData = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);
      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      let tags = [];
      blogs.docs.map((doc) => tags.push(...doc.get("tags")));
      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };
    getBlogData();
  }, []);

  useEffect(() => {
    id && getBlogDetails();
  }, [id]);

  const getBlogDetails = async () => {
    try {
      const docRef = doc(db, "blogs", id);
      setLoading(true);
      const blogDetail = await getDoc(docRef);
      setBlog(blogDetail.data());
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
          style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
        >
          <div className="overlay"></div>
          <div className="blog-title">
            <span>{blog?.postedOn}</span>
            <h2>{blog?.title}</h2>
          </div>
        </div>
        <div className="container-fluid pb-4 pt-4 padding blog-single-content">
          <div className="container padding">
            <div className="row mx-0">
              <div className="col-md-8">
                <span className="meta-info text-start">
                  By <p className="author">{blog?.author}&nbsp;-</p>
                  {blog?.postedOn}
                </span>
                <p className="text-start">{blog?.description}</p>
              </div>
              <div className="col-md-3">
                <Tags tags={tags} />

                <MostPopular blogs={blogs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
