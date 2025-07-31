

// eslint-disable-next-line react/prop-types
const Pagination = ({ page, setPage, hasNextPage, total }) => {
    return (

        <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-400">
                Showing {1+(page-1)*10}-{10*page} of {total} results
            </div>
            <div className="flex items-center space-x-2">
                <button className={`px-4 text-white py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm ${page <= 1 && "cursor-not-allowed"}`} disabled={page <= 1}
                    onClick={() => setPage(page > 1 && page - 1)}>Previous</button>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"> Page {page === 0 ? "1" : page}</button>
                </div>
                <button className={`px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-lg text-sm ${!hasNextPage && "cursor-not-allowed"} `} disabled={!hasNextPage}
                    onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>


    );
};

export default Pagination;
