import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import BlogSection from "../component/BlogSection";
import Pagination from "../component/Pagination";

const Blogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogsData();
  }, []);

  const getBlogsData = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const first = query(blogRef, orderBy("title"), limit(4));
    const docSnapshot = await getDocs(first);
    setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const handlePageChange = async () => {};

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="blog-heading text-start py-2 mb-4">Daily blogs</div>
          {blogs?.map((blog) => (
            <div className="col-md-6 ">
              <BlogSection {...blog} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={1}
          noOfPages={3}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Blogs;
