import React from "react";

function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-[100%] bg-gray-100">
      {/* Loader Spinner */}
      <div className="relative flex  flex-col justify-center items-center bg-white p-8 rounded-xl shadow-xl">
        <div className="h-12 w-12 border-4 border-indigo-600 border-solid border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-bold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>

      {/* Loading Text */}

    </div>
  );
}

export default Loader;
