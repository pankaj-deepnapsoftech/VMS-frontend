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
      
        <div className="bg-background text-white w-full max-w-3xl mx-4 p-6 rounded-lg shadow-lg relative">
      
          <button
            onClick={() => setShowModal(!showModal)}
            className="absolute top-4 right-4 text-white hover:text-gray-600 text-xl font-bold transition"
            aria-label="Close"
          >
            <IoClose />
          </button>

          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Data Asset Inventory – Risk Rating
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white">
                Data Asset
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Users Affected
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Personally Identifiable Information (PII)
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Business Sensitive
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Regulations (if known)
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Security Category
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Overall Risk Rating
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border bg-input border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
