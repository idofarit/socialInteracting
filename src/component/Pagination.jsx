import React from "react";

const Pagination = ({ currentPage, handlePageChange, noOfPages }) => {
  return (
    <div>
      <div className="row mx-0">
        <div className="col-12 text-center pb-4 pt-4">
          <button
            onClick={() => handlePageChange("Prev")}
            className="btn_mange_pagging"
            disabled={currentPage === 1}
          >
            <i className="fa fa-long-arrow-left"></i> &nbsp; Prev
          </button>
          <span className="btn_pagging">{currentPage}</span>
          <button
            onClick={() => handlePageChange("Next")}
            className="btn_mange_pagging"
            disabled={currentPage === noOfPages}
          >
            Next <i className="fa fa-long-arrow-right"></i> &nbsp;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
