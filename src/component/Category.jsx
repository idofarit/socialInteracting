import React from "react";
import { Link } from "react-router-dom";

const Category = ({ categoryCount }) => {
  return (
    <div className="category-container">
      <div className="dropdown">
        <a
          href="#"
          className="btn btn-secondary dropdown-toggle drp"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Categories
        </a>

        <ul className="dropdown-menu ">
          {categoryCount?.map((item, index) => (
            <li key={index}>
              <Link
                className="dropdown-item"
                to={`/category/${item.category}`}
                style={{
                  textDecoration: "none",
                  float: "left",
                  color: "#777",
                }}
              >
                {item.category}
                <span>({item.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
