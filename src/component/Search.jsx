import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Search = ({ search, handleChange }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      {/* <div className="blog-heading py-2 text-start py-2 mb-4">Search Here</div> */}
      <form action="" className="form-inline" onSubmit={handleSubmit}>
        <div className="col-12 py-3">
          <input
            type="text"
            value={search}
            className="form-control search-input"
            placeholder="Search Blog"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-secondary search-btn">
          <FaSearch
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "1.4rem",
            }}
          />
        </button>
      </form>
    </div>
  );
};

export default Search;
