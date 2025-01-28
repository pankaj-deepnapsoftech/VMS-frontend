import React, { Suspense, useState } from 'react';
import { BiSearch, BiEditAlt, BiPlus, BiSave } from 'react-icons/bi';
import { RiDeleteBinFill } from "react-icons/ri";
import { MdClose, MdSave } from 'react-icons/md';
import { useVulnerabililtyDataContext } from '@/context';
import { useFormik } from 'formik';
import { WorkItemValidation } from '@/Validation/AllVulnerabililtyValidation';
import { Loader } from '@/constants/Components-lazy-loading/components.Lazy';

export function VulnerabilityData() {

  const { UpdateData, allVulnerabilityData, DeleteData } = useVulnerabililtyDataContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const rowsPerPage = 10;

  const dynamicHeaders = allVulnerabilityData.length
    ? Object.keys(allVulnerabilityData[0]).filter((key) => key !== '_id' && key !== '__v')
    : [];

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredData = allVulnerabilityData
    .filter((item) =>
      Object.values(item).some((value) =>
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEdit = (item) => {

    setEditData(item);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    console.log('Updated data:', editData);
    UpdateData(editData, editData._id);
    setIsModalOpen(false);
  };

  const handleInputChange = (key, value) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };


  // const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
  //   initialValues: editData.initialValues,
  //   Organization: editData.Organization,
  //   Application_Name: editData.Application_Name,
  //   Title: editData.Title,
  //   Vulnerability_Classification: editData.Vulnerability_Classification,
  //   Assigned_To: editData.Assigned_To,
  //   Scan_Type: editData.Scan_Type,
  //   Severity: editData.Severity,
  //   Priority: editData.Priority,
  //   Status: editData.Status,
  //   Remediate_Upcoming_Time_Line: editData.Remediate_Upcoming_Time_Line,
  //   validationSchema: WorkItemValidation,
  //   onSubmit: (value) => {
  //     console.log(value, "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  //     UpdateData(value, editData._id);
  //   }
  // })


  return (

    <Suspense fallback={<Loader />}>
      <div className="p-4 md:p-6 max-w-[95%] mx-auto bg-white rounded-xl shadow-lg">
        <div className="mb-1 flex flex-col md:flex-row items-start md:items-center  justify-between">

          <div className="relative mt-4 md:mt-0">
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search vulnerabilities..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='flex  w-full lg:justify-end items-center py-2 gap-2'>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4  py-2 bg-[#015289] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
            >
              <BiPlus className="h-6 w-6" />
              Add Data
            </button>
            <button
              onClick={() => alert("This Feature is under Development")}
              className="px-4 py-2 bg-[#015289] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
            >
              <BiSave className="h-6 w-6" />
              Export  Data
            </button>
          </div>
        </div>
        <div className=" rounded-t-lg  py-2 flex flex-row   justify-end">

          <div className="relative flex justify-center gap-1">

            <select className="border rounded-md p-1" aria-label=''>
              <option className='text-black bg-white '>Severity </option>
            </select>
            <select className="border rounded-md p-1">
              <option className='text-black bg-white '>Assessment type </option>
            </select> <select className="border rounded-md p-1">
              <option className='text-black bg-white '>Status </option>
            </select>

          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#015289] ">
              <tr>
                {dynamicHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="px-2 py-1 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer "
                    onClick={() => handleSort(header)}
                  >
                    {header.replace(/_/g, ' ')}

                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item, index) => (
                <tr key={item._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  {dynamicHeaders.map((field, i) => (
                    <td key={i} className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{item[field]}</span>
                    </td>
                  ))}
                  <td className="px-4 py-4 whitespace-nowrap flex justify-around ">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-white "
                    >
                      <BiEditAlt className="h-5 w-5 inline text-blue-800" />
                      {/* <p className='text-gray-100 font-medium text-sm px-3'>Edit
                      </p> */}
                    </button>

                    <button
                      onClick={() => {

                        let conf = confirm("Are you want to Delete this row"); conf === true ? DeleteData(item._id) : ""
                      }}
                      className="text-white"
                    >
                      <RiDeleteBinFill className="h-5 w-5 inline text-red-800" />
                      {/* <p className='text-gray-100 font-medium text-sm px-1'>delete
                      </p> */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center lg:pl-32 px-8">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Edit Vulnerability</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                  <MdClose className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dynamicHeaders.map((field, index) => (
                  <div key={index} className={`flex flex-col ${field === "createdAt" || field === "updatedAt" ? " hidden" : ""}  `}>
                    <label className="text-sm font-medium text-gray-700">{field.replace(/_/g, ' ')}</label>
                    <input
                      type="text"
                      value={editData[field] || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Suspense>

  );
}
