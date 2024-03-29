import React, { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import BlogSection from "./BlogSection";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import Tags from "./Tags";
import FeatureBlogs from "./FeatureBlogs";
import Trending from "./Trending";
import Search from "./Search";
import { orderBy, isEmpty, isNull } from "lodash";
import { useLocation } from "react-router-dom";
import Category from "./Category";
import img from "../assets/blog.png";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ setActive, user, active }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [mostPopularBlogs, setMostPopularBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);
  const queryString = useQuery();
  const searchQuery = queryString.get("searchQuery");
  const location = useLocation();
  const [lastVisible, setLastVisible] = useState(null);
  const [isContentEmpty, setIsContentEmpty] = useState(false);
  const [totalBlogs, setTotalBlogs] = useState([]);

  const getTrendingBlog = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapShot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapShot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlog();
    setSearch("");
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
        setTotalBlogs(list);
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
  }, [setActive, active]);

  const updateState = (docSnapshot) => {
    const isCollectionEmpty = docSnapshot.size === 0;
    if (!isCollectionEmpty) {
      const blogsData = docSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs((blogs) => [...blogs, ...blogsData]);
      setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    } else {
      toast.info("You've reached the end!");
      setIsContentEmpty(true);
    }
  };

  const fetchMore = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const nextFour = query(
      blogRef,
      orderBy("title"),
      limit(4),
      startAfter(lastVisible)
    );
    const docSnapshot = await getDocs(nextFour);
    updateState(docSnapshot);
    setLoading(false);
  };

  const searchBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const searchTitleQuery = query(blogRef, where("title", "==", searchQuery));
    const searchTagQuery = query(
      blogRef,
      where("tags", "array-contains", searchQuery)
    );
    const titleSnapshot = await getDocs(searchTitleQuery);
    const tagSnapshot = await getDocs(searchTagQuery);
    let searchTitleBlogs = [];
    let searchTagBlogs = [];
    titleSnapshot.forEach((doc) => {
      searchTitleBlogs.push({ id: doc.id, ...doc.data() });
    });
    tagSnapshot.forEach((doc) => {
      searchTagBlogs.push({ id: doc.id, ...doc.data() });
    });

    const combinedSearchBlogs = searchTitleBlogs.concat(searchTagBlogs);
    setBlogs(combinedSearchBlogs);
    setIsContentEmpty(false);
    setActive("");
  };

  useEffect(() => {
    if (!isNull(searchQuery)) {
      searchBlogs();
    }
  }, [searchQuery]);

  const getBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const firstFour = query(blogRef, orderBy("title"), limit(4));
    const docSnapshot = await getDocs(firstFour);
    setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setMostPopularBlogs(
      docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
  };

  useEffect(() => {
    getBlogs();
    setIsContentEmpty(false);
  }, [active]);

  // category count

  const counts = totalBlogs.reduce((prevValue, currentValue) => {
    let name = currentValue.category;
    if (!prevValue.hasOwnProperty(name)) {
      prevValue[name] = 0;
    }
    prevValue[name]++;
    delete prevValue["undefined"];
    return prevValue;
  }, {});

  const categoryCount = Object.keys(counts).map((i) => {
    return {
      category: i,
      count: counts[i],
    };
  });

  const handleChange = (e) => {
    const value = e.target.value;
    if (isEmpty(value)) {
      getBlogs();
      setIsContentEmpty(true);
    }
    setSearch(value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Want to delete?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Deleted successfully");
        getBlogs();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding   ">
        <div className="row mt-5">
          <div className="hero-container">
            <div className="hero-card">
              <img src={img} alt="" className="blog-img" />
              <div className="hero-line">Explore With Us!</div>
              <div className="hero-search">
                <Search search={search} handleChange={handleChange} />
                <Category categoryCount={categoryCount} />
                <div className="overlay"></div>
              </div>
              <div className="hero-tag">
                <span>use these tags for search</span>
                <div>
                  <Tags tags={tags.slice(0, 5).map((e) => e)} />
                </div>
                <div className="opacity-layer"></div>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="blog-heading text-start py-2 mb-4">Daily Blogs</div>

            {blogs.length === 0 && location.pathname !== "/" && (
              <>
                <h4>
                  No blogs matched your search keyword:{" "}
                  <strong>{searchQuery}</strong>
                </h4>
              </>
            )}

            {blogs?.map((blog) => (
              <BlogSection
                key={blog.id}
                {...blog}
                user={user}
                handleDelete={handleDelete}
              />
            ))}

            {!isContentEmpty && (
              <button
                className="btn btn-primary m-auto d-flex"
                onClick={fetchMore}
              >
                Load more
              </button>
            )}
          </div>

          <div className="col-md-3">
            <Trending trendBlogs={trendBlogs} />
            <FeatureBlogs title={"Most popular"} blogs={mostPopularBlogs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
