import React from "react";

function Loader() {
  return (
    <div className="fixed top-0 left-0 flex flex-col justify-center backdrop-blur-sm  items-center h-screen w-[100%] bg-gradient-custom">
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
