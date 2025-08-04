import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { BiErrorAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Shapes - Responsive sizes */}
      <div className="absolute top-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-sky-100 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-red-400 rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-pink-100 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-16 md:w-24 h-16 md:h-24 bg-[#ffe4d6] rounded-full -translate-x-[100px] md:-translate-x-[200px] translate-y-[50px] md:translate-y-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-12 md:w-16 h-12 md:h-16 bg-sky-200 rounded-full hidden sm:block" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10">
        <div className="flex items-center justify-center mb-4">
          <BiErrorAlt className="text-red-400 w-16 h-16 md:w-24 md:h-24" />
        </div>
        <h1 className="text-[120px] md:text-[200px] font-light text-red-400 leading-none select-none tracking-tight">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 text-center">
          Page not found
        </h2>
        <p className="text-sm md:text-base font-extrabold text-gray-600 text-center mb-8 max-w-md px-4">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 border-2 border-modalBg hover:bg-gray-700 text-sm md:text-base font-medium rounded-lg bg-gray-900 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          <IoHomeOutline className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          BACK TO HOME
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;