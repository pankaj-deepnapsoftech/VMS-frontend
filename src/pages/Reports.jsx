import InputField from "@/components/InputField";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { BiEditAlt, BiSearch, BiUpload } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
 

  // const handleUpload = () => {
   
  // };

  return (
    <div className="p-4 md:p-6 mt-5  max-w-[95%] mx-auto bg-white rounded-xl shadow-lg">
      {/* Search Bar & Buttons */}
      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="relative mt-4 md:mt-0">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex w-full lg:justify-end items-center py-2 gap-2">
          <button
             onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#015289] text-white text-sm font-medium rounded-md flex items-center hover:bg-[#014173]"
          >
            <BiUpload className="h-4 w-4 mr-2" />
            Detailed Report
          </button>

        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#015289] text-white">
            <tr>
              {["S NO.", "Date", "Report", "Actions"].map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3  text-center text-xs font-medium uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                1
              </td>
              <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                07/03/25
              </td>
              <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                <button className="bg-blue-500 text-gray-50 px-4 rounded hover:bg-blue-600 py-1">
                  View
                </button>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-center flex justify-center gap-2 items-start">
                <button
                  onClick={() => {
                    console.log(item);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <BiEditAlt className="h-5 w-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <RiDeleteBinFill className="h-5 w-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>




        {/* 📝 Modal Form */}
                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
      
                      {/* Header */}
                      <div className="flex justify-between items-center border-b p-4 bg-[#015289]">
                        <h2 className="text-lg font-semibold text-gray-200">
                          Add Detailed Report
                        </h2>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="text-gray-100 hover:text-gray-200 transition"
                        >
                          <MdClose className="h-6 w-6" />
                        </button>
                      </div>
      
                      {/* Form */}
                      <Formik
                        initialValues={ {}}
                        onSubmit={(values) => {
                          console.log(values, "hero in formik")
                         
                        }}
                      >
                        {({ setFieldValue, values }) => (  // ✅ Access setFieldValue here
                          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                           <InputField
                          label="Organization"
                          type="text"
                          onChange={(e) => console.log("Expection_time", e.target.value)}
                        />
                           <InputField
                          label="report"
                          type="file"
                          onChange={(e) => console.log("file", e.target.value)}
                        />
                            {/* Buttons */}
                            <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 border-t pt-4">
                              <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-2 bg-[#015289] text-white rounded-md hover:bg-blue-700 transition"
                              >
                                Save
                              </button>
                            </div>
                          </Form>
      
      
                        )}
                      </Formik>
      
                    </div>
                  </div>
                )}
    </div>
  );
};

export default Reports;
