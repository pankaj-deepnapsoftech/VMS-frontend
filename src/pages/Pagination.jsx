// eslint-disable-next-line react/prop-types
const Pagination = ({ page, setPage, hasNextPage, total, limit = 10 }) => {
  const start = total === 0 ? 0 : 1 + (page - 1) * limit;
  const end = Math.min(page * limit, total);

  return (
    <div className="
      px-4 py-4 border-t border-gray-700 
      flex flex-col sm:flex-row 
      items-center justify-between 
      gap-3 sm:gap-0
    ">
      
      {/* Left Side - Text */}
      <div className="text-sm text-gray-400 text-center sm:text-left">
        Showing {start}-{end} of {total} results
      </div>

      {/* Right Side - Buttons */}
      <div className="flex items-center space-x-2">

        {/* Previous */}
        <button
          className={`
            px-3 sm:px-4 py-2 rounded-lg text-sm text-white 
            bg-gray-700 hover:bg-gray-600 transition
            ${page <= 1 && "opacity-50 cursor-not-allowed"}
          `}
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        {/* Page Number */}
        <span className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
          Page {page <= 0 ? 1 : page}
        </span>

        {/* Next */}
        <button
          className={`
            px-3 sm:px-4 py-2 rounded-lg text-sm text-white 
            bg-gray-700 hover:bg-gray-600 transition
            ${!hasNextPage && "opacity-50 cursor-not-allowed"}
          `}
          disabled={!hasNextPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
