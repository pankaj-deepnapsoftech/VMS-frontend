/* eslint-disable react/prop-types */
import React from "react";
import { IoClose } from "react-icons/io5";

const Data = ({ ShowModal, setShowModal }) => {
  return (
    <>
 
      <section
        className={`${ShowModal ? "opacity-100 visible" : "opacity-0 invisible"
          } fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300`}
      >
       
        <div className="bg-white w-full max-w-3xl mx-4 p-6 rounded-lg shadow-lg relative">
       
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-600 transition"
            aria-label="Close Modal"
          >
            <IoClose />
          </button>

          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Data Asset Inventory
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Data Asset", type: "text" },
              { label: "Contents", type: "text" },
              { label: "Use", type: "text" },
              { label: "Data Steward/Owner", type: "text" },
              { label: "Format", type: "text" },
              { label: "Location", type: "text" },
              { label: "Timeframe", type: "text" },
              { label: "Size on Disk", type: "text" },
              { label: "# of Records", type: "text" },
              { label: "Last Inventory Update", type: "date" },
            ].map(({ label, type }, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type={type}
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}

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

export default Data;
