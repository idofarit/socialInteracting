import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import BlogSection from "./BlogSection";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import Tags from "./Tags";
import MostPopular from "./MostPopular";
import Trending from "./Trending";

const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, settrendBlogs] = useState([]);

  const getTrendingBlog = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapShot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapShot.forEach((item) => {
      trendBlogs.push({ id: item.id, ...item.data() });
    });
    settrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlog();
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
        setLoading(false);
        setActive("Home");
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
      getTrendingBlog();
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Want to delete?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Deleted successfully");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log("blogs", blogs);

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <Trending trendBlogs={trendBlogs} />

          <div className="col-md-8 ">
            <BlogSection
              blogs={blogs}
              user={user}
              handleDelete={handleDelete}
            />
          </div>
          <div className="col-md-3 ">
            <Tags tags={tags} />
            <MostPopular blogs={blogs} />
            <h2>Most Popular</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
