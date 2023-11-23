import React, { useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import Spinner from "../component/Spinner";
import Tags from "../component/Tags";
import MostPopular from "../component/MostPopular";
import RelatedBlogs from "../component/RelatedBlogs";
import { isEmpty } from "lodash";
import UserComments from "../component/UserComments";
import CommentBox from "../component/CommentBox";
import moment from "moment";
import { toast } from "react-toastify";

const Details = ({ setActive, user }) => {
  const userId = user?.uid;
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");

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
      const blogRef = collection(db, "blogs");
      const docRef = doc(db, "blogs", id);
      setLoading(true);
      const blogDetail = await getDoc(docRef);
      setBlog(blogDetail.data());
      const relatedBlogsQuery = query(
        blogRef,
        where("tags", "array-contains-any", blogDetail.data().tags, limit(3))
      );
      setComments(blogDetail.data().comments ? blogDetail.data().comments : []);

      const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
      const relatedBlogs = [];
      relatedBlogSnapshot.forEach((doc) => {
        relatedBlogs.push({ id: doc.id, ...doc.data() });
      });
      setRelatedBlogs(relatedBlogs);
      setActive(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(relatedBlogs, "relatedBlog");

  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      createdAt: moment().format("DD-MM-YYYY hh:mm a"),
      userId,
      name: user?.displayName,
      body: userComment,
    });
    toast.success("Comment added");
    await updateDoc(doc(db, "blogs", id), {
      ...blog,
      comments,
      timestamp: moment().format("DD-MM-YYYY"),
    });
    setComments(comments);
    setUserComment("");
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
                <div className="text-start">
                  <Tags tags={blog?.tags} />
                </div>
                <br />
                <div className="custombox">
                  <h4 className="small-title">{comments.length} Comment</h4>
                  {isEmpty(comments) ? (
                    <UserComments msg={"Be the first to comment"} />
                  ) : (
                    <>
                      {comments?.map((comment) => (
                        <UserComments {...comment} />
                      ))}
                    </>
                  )}
                </div>
                <CommentBox
                  userId={userId}
                  userComment={userComment}
                  setUserComment={setUserComment}
                  handleComment={handleComment}
                />
              </div>
              <div className="col-md-3">
                <div className="blog-heading text-start py-2 mb-4">Tags</div>
                <Tags tags={tags} />

                <MostPopular blogs={blogs} />
              </div>
            </div>
            <RelatedBlogs id={id} blogs={relatedBlogs} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
