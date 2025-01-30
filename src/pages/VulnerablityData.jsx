import React, { Suspense, useState } from "react";
import { BiSearch, BiEditAlt, BiPlus, BiSave } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useVulnerabililtyDataContext } from "@/context";
import { Formik, Form, Field } from "formik";
import * as XLSX from "xlsx";
import { WorkItemValidation } from "@/Validation/VulnerabililtyDataValidation";

export function VulnerabilityData() {
  const { UpdateData, AddData, allVulnerabilityData, DeleteData } =
    useVulnerabililtyDataContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const rowsPerPage = 10;

  // Extract headers dynamically for table display
  const tableHeaders =
    allVulnerabilityData.length > 0
      ? Object.keys(allVulnerabilityData[0]).filter(
        (key) => key !== "_id" && key !== "__v"
      )
      : [];

  // Headers for the Add form (show all fields)
  const addFormHeaders = tableHeaders.filter(
    (key) => key !== "createdAt" && key !== "updatedAt"
  );

  // Headers for the Edit form (restrict to specific fields)
  const editFormHeaders = [
    "Vulnerability_Classification",
    "Scan_Type",
    "Severity",
    "Priority",
    "Status",
    "Remediate_Upcoming_Time_Line",
  ];

  const filteredData = allVulnerabilityData.filter((item) =>
    Object.values(item).some(
      (value) =>
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Open modal for editing or adding
  const openModal = (data = null) => {
    setEditData(data);
    setEditMode(!!data);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vulnerability?")) {
      DeleteData(id);
    }
  };

  const handleDownload = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vulnerabilities");
    XLSX.writeFile(workbook, "Vulnerabilities.xlsx");
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-4 md:p-6 max-w-[95%] mx-auto bg-white rounded-xl shadow-lg">
        {/* 🔍 Search Bar & Buttons */}
        <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="relative mt-4 md:mt-0">
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search vulnerabilities..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex w-full lg:justify-end items-center py-2 gap-2">
            <button
              onClick={() => openModal()}
              className="px-4 py-2 bg-[#015289] text-white text-sm font-medium rounded-md flex items-center"
            >
              <BiPlus className="h-4 w-4 mr-2" />
              Add Vulnerability
            </button>
            <button
              onClick={() => handleDownload(filteredData)}
              className="px-4 py-2 bg-[#015289] text-white text-sm font-medium rounded-md flex items-center"
            >
              <BiSave className="h-4 w-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* 📊 Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#015289]">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-xs font-medium text-white uppercase"
                  >
                    {header.replace(/_/g, " ")}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  {tableHeaders.map((field, i) => (
                    <td key={i} className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item[field]}
                    </td>
                  ))}
                  <td className="px-4 py-4 whitespace-nowrap flex justify-around">
                    <button onClick={() => openModal(item)} className="text-blue-600">
                      <BiEditAlt className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600">
                      <RiDeleteBinFill className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📝 Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">

              {/* Header */}
              <div className="flex justify-between items-center border-b p-4 bg-[#015289]">
                <h2 className="text-lg font-semibold text-gray-200">
                  {editMode ? "Edit Vulnerability" : "Add Vulnerability"}
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

                initialValues={editData || {}}
                onSubmit={(values) => {
                  editMode ? UpdateData(values, editData._id) : AddData(values);
                  setIsModalOpen(false);
                }}
              >
                <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {(editMode ? editFormHeaders : addFormHeaders).map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">{field.replace(/_/g, " ")}*</label>
                      <Field
                        name={field}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition"
                      />

                    </div>
                  ))}

                  {/* Buttons */}
                  <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 border-t pt-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        )}


      </div>
    </Suspense>
  );
}
