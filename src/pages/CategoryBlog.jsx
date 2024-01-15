import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogSection from "../component/BlogSection";
import { db } from "../Firebase";
import Spinner from "../component/Spinner";

const CategoryBlog = ({ setActive }) => {
  const [catBlogs, setCatBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  const getCatBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const catBlogQuery = query(blogRef, where("category", "==", category));
    const docSnapshot = await getDocs(catBlogQuery);
    let catBlogs = [];
    docSnapshot.forEach((doc) => {
      catBlogs.push({ id: doc.id, ...doc.data() });
    });
    setCatBlogs(catBlogs);
    setLoading(false);
  };

  useEffect(() => {
    getCatBlogs();
    setActive(null);
  }, []);

  if (loading) {
    return (
      <Spinner
        style={{
          margin: "auto",
          display: "flex",
          height: "5rem",
          width: "5rem",
        }}
      />
    );
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="blog-heading text-center py-2 mb-4">
            Category : <strong>{category.toLocaleUpperCase()}</strong>
          </div>
          {catBlogs?.map((item) => (
            <div className="col-md-6 " key={item.id}>
              <BlogSection {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBlog;
