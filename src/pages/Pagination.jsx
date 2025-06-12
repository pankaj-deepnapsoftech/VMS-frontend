/* eslint-disable react/prop-types */
import React from "react";

const Pagination = ({ page, setPage, hasNextPage }) => {
    return (
        <div className="flex justify-between items-center my-6 px-5">
            <button
                className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white rounded-md ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </button>
            <span className="text-white">Page {page}</span>
            <button
                className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white rounded-md ${!hasNextPage ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                disabled={!hasNextPage}  
                onClick={() => setPage(page + 1)}
            >
                Next 
            </button>
        </div>
    );
};

export default Pagination;
