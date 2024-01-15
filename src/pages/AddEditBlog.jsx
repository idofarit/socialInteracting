import React, { useEffect, useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage, useFirebase } from "../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  comments: [],
  likes: [],
};

const categoryOptions = [
  "Fashion",
  "Technology",
  "Food",
  "Positions",
  "Sports",
  "Business",
];

const AddEditBlog = ({ user, setActive }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { title, tags, category, trending, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is" + Math.floor(progress) + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;

            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image uploaded successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetails();
  }, [id]);

  const getBlogDetails = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  // console.log(form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTag = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            postedOn: moment().format("DD-MM-YYYY hh:mm a"),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            postedOn: moment().format("DD-MM-YYYY hh:mm a"),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Post updated successfully");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      return toast.error("All fields are mandatory");
    }
    navigate("/");
    // toast.success("posted successfully");
    setActive("Home");
  };

  return (
    <>
      <div className="container-fluid mb-4   ">
        <div className="container pt-5  ">
          <div className="col-12">
            <div className="text-center heading py-2">
              {id ? "Update Your Blog" : "Create Blog"}
            </div>
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6 ">
              <form className="row  blog-form" onSubmit={handleSubmit}>
                <div className="col-12 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <ReactTagInput
                    tags={tags}
                    placeholder="Mention Tags (press enter)"
                    onChange={handleTag}
                  />
                </div>
                <div className="col-12 py-3">
                  <p className="trending">Is it trending blog?</p>
                  <div className="form-check-inline mx-2">
                    <input
                      type="radio"
                      className="form-check-input "
                      name="radioOption"
                      value="yes"
                      checked={trending === "yes"}
                      onChange={handleTrending}
                    />
                    <label
                      htmlFor="radioOption"
                      className="form-check-label check"
                    >
                      &nbsp; Yes&nbsp;
                    </label>
                    <input
                      type="radio"
                      className="form-check-input "
                      name="radioOption"
                      value="no"
                      checked={trending === "no"}
                      onChange={handleTrending}
                    />
                    <label
                      htmlFor="radioOption"
                      className="form-check-label check"
                    >
                      &nbsp; No
                    </label>
                  </div>
                </div>

                <div className="col-12 py-3">
                  <select
                    value={category}
                    onChange={onCategoryChange}
                    className="catg-dropdown"
                  >
                    <option value="">Please select Category</option>
                    {categoryOptions.map((option, index) => (
                      <option value={option || ""} key={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 py-3">
                  <textarea
                    name="description"
                    cols="30"
                    rows="10"
                    value={description}
                    className="form-control description-box"
                    onChange={handleChange}
                  />
                  <div className="mb-3 mt-3">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <div className="col-12 py-3 text-center">
                    <button
                      className="btn btn-add"
                      type="submit"
                      disabled={progress !== null && progress < 100}
                    >
                      {id ? "Update" : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditBlog;
