/* eslint-disable react/prop-types */
import React from "react";
import { IoClose } from "react-icons/io5";

const RiskRating = ({ showModal, setShowModal }) => {
  return (
    <>
     
      <section
        className={`${ showModal ? "opacity-100 visible" : "opacity-0 invisible"
          } fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300`}
      >
      
        <div className="bg-white w-full max-w-3xl mx-4 p-6 rounded-lg shadow-lg relative">
      
          <button
            onClick={() => setShowModal(!showModal)}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold transition"
            aria-label="Close"
          >
            <IoClose />
          </button>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Data Asset Inventory – Risk Rating
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data Asset
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Users Affected
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Personally Identifiable Information (PII)
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Sensitive
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Regulations (if known)
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Security Category
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Overall Risk Rating
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RiskRating;
