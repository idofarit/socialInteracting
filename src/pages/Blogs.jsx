import {
  collection,
  endAt,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import BlogSection from "../component/BlogSection";
import Pagination from "../component/Pagination";
import Spinner from "../component/Spinner";

const Blogs = ({ setActive }) => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [noOfPage, setNoOfPages] = useState(null);
  const [count, setCount] = useState(null);

  useEffect(() => {
    getBlogsData();
    getTotalBlogs();
    setActive("Blogs");
  }, []);

  const getBlogsData = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const first = query(blogRef, orderBy("title"), limit(4));
    const docSnapshot = await getDocs(first);
    setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setCount(docSnapshot.size);
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    setLoading(false);
  };

  const getTotalBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const docSnapshot = await getDocs(blogRef);
    const totalBlogs = docSnapshot.size;
    const totalPage = Math.ceil(totalBlogs / 4);
    setNoOfPages(totalPage);
  };

  const fetchNext = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const nextBlogQuery = query(
      blogRef,
      orderBy("title"),
      startAfter(lastVisible),
      limit(4)
    );
    const nextBLogSnapshot = await getDocs(nextBlogQuery);
    setBlogs(
      nextBLogSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setCount(nextBLogSnapshot.size);
    setLastVisible(nextBLogSnapshot.docs[nextBLogSnapshot.docs.length - 1]);
    setLoading(false);
  };
  const fetchPrev = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const end =
      noOfPage !== currentPage ? endAt(lastVisible) : endBefore(lastVisible);
    const limitData =
      noOfPage !== currentPage
        ? limit(4)
        : count <= 4 && noOfPage % 2 === 0
        ? limit(4)
        : limitToLast(4);
    const prevBlogQuery = query(blogRef, orderBy("title"), end, limitData);
    const prevBLogSnapshot = await getDocs(prevBlogQuery);
    setBlogs(
      prevBLogSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setCount(prevBLogSnapshot.size);
    setLastVisible(prevBLogSnapshot.docs[prevBLogSnapshot.docs.length - 1]);
    setLoading(false);
  };

  const handlePageChange = async (value) => {
    if (value === "Next") {
      setCurrentPage((page) => page + 1);
      fetchNext();
    } else if (value === "Prev") {
      setCurrentPage((page) => page - 1);
      fetchPrev();
    }
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="container pt-5">
        <div className="row mt-4">
          <div className="blog-heading text-start py-2 mb-4">Daily blogs</div>
          {blogs?.map((blog) => (
            <div className="col-md-6 " key={blog.id}>
              <BlogSection {...blog} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          noOfPages={noOfPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Blogs;
