import React, { Suspense, useEffect, useState } from "react";
import { BiSearch, BiEditAlt, BiPlus, BiSave } from "react-icons/bi";
import { RiDeleteBinFill, RiUpload2Fill } from "react-icons/ri";
import { MdClose, MdDeleteOutline, MdOutlineDeleteOutline } from "react-icons/md";
import {
  useAllEmployeeContext,
  useAuthContext,
  useDataContext,
  useVulnerabililtyDataContext,
} from "@/context";
import { Formik, Form, Field } from "formik";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/Loader";
import InputField from "@/components/InputField";
import { Modal } from "@/components/modal/FileUploadModal";
import NoDataFound from "@/components/NoDataFound";
import { FaSms } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function EmployeeAllTasks() {
  const { loading, UpdateData, orgnizationNotification, AddData, BulkDataDelete,DeleteData } = useVulnerabililtyDataContext();

  const { authenticate, token } = useAuthContext();
  const {
    employeeTasksData,
    taskPage,
    setTaskPage,
    UploadDetailedReport,
    EmployeeTasks,
    datafetchCount,
    setdatafetchCount,
    allEmployeesData
  } = useAllEmployeeContext();

  //console.log("employeeTasksData", employeeTasksData)

  useEffect(() => {
    if (token && datafetchCount === 0) {
      EmployeeTasks();
      setdatafetchCount(1);
    }
  }, [token, taskPage]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editMode1, setEditMode1] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editData1, setEditData1] = useState(null);
  const rowsPerPage = 10;
  const [index, setIndex] = useState([]);
  const [newData, setNewData] = useState([]);
  const [pdfReport, setPdfReport] = useState([]);


  const { UploadBulkData } = useDataContext();

  // Extract headers dynamically for table display

  const vulnerabilitiesItems = {
    Organization: "",
    Application_Name: "",
    Title: "",
    Vulnerability_Classification: "",
    Scan_Type: "",
    Severity: "",
    Priority: "",
    Status: "",
  }
  const tableHeaders =
    employeeTasksData.length > 0
      ? Object.keys(employeeTasksData[0]).filter(
        (key) => key !== "_id" && key !== "__v" && key !== "updatedAt"
      )
      : Object.keys(vulnerabilitiesItems).filter(
        (key) => key !== "_id" && key !== "__v" && key !== "updatedAt"
      );

  // Headers for the Add form (show all fields)
  const addFormHeaders = tableHeaders.filter(
    (key) => key !== "createdAt" && key !== "updatedAt"
  );

  // Headers for the Edit form (restrict to specific fields)
  const editFormHeaders = ["Status"];

  const filteredData = employeeTasksData.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
    setIsEditOpen(true);
  };

  const handleChecked = (id) => {
    let data = index.filter((item) => item === id);
    if (data.length > 0) {
      data = index.filter((item) => item !== id);
      setIndex(data);
    } else {
      setIndex((pre) => [...pre, id]);
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const dataId = [];

    if (isChecked) {
      paginatedData.map((data) => {
        dataId.push(data?._id);
      });
      setIndex(dataId);
    } else {
      setIndex([]);
    }
  };


  const handleBulkDeleteTask = () => {
    index.length > 0 ? BulkDataDelete(index) : toast.error("Select Tasks For Delete");
  }


  const [status, setStatus] = useState("");
  const [expectionTime, setExpectionTime] = useState(new Date());
  // const [id, setID] = useState("")

  // const handleAssignTask = (id) => {
  // 	setIsOpen(true)
  // 	setID(id)

  // };

  // const handleBulkAssignTask = () => {
  // 	index.length > 0 ? "" : toast.error("Select Tasks For Assign")
  // 	setIsOpen(index.length > 0)
  // 	setID(id)

  // };

  const handleDownload = (data) => {
    if (data.length < 1) {
      return alert("Don't Have Enough Data to Download")
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vulnerabilities");
    XLSX.writeFile(workbook, "Vulnerabilities.xlsx");
  };

  const [taskID, setTaskID] = useState("");

  const formData = new FormData();

  formData.append("PDF", pdfReport);

  const handleUpload = async (item) => {
    setTaskID(item._id);
    setIsOpen(true);
  };

  let statusList = ["Open", "Closed", "Fix", "Re-Open", "On-Hold", "Exception"];


  let navigate = useNavigate();

  const openVulnerablityModal = (data = null) => {
    setEditData1(data);
    setEditMode1(!!data);
    setIsModalOpen1(true);
  };

  let severityList = [
    "Critical ",
    "High",
    "Medium",
    "Low",
    "Informational",
    "Other",
  ];

  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vulnerability?")) {
      DeleteData(id);
    }
  };




  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-4 md:p-6 max-w-[100%] max-h-full   bg-background  ">
          {/* 🔍 Search Bar & Buttons */}
          <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="relative mt-4 md:mt-0">
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search vulnerabilities..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80 bg-input text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* <div className="lg:flex lg:flex-row grid grid-cols-2 gap-4 mt-4   w-full lg:justify-end  lg:items-center py-2 lg:gap-2">
						{/* <button
							onClick={() => openModal()}
							className="px-4 py-2  bg-[#015289] text-white lg:text-sm  text-xs font-medium rounded-md flex items-center"
						>
							<BiPlus className="h-6 w-6 mr-1" />
							Add Vulnerability
						</button>
						<button
							onClick={() => handleBulkAssignTask()}
							className="px-4 py-2 bg-[#015289] text-white text-sm font-medium rounded-md flex items-center"
						>
							<BsPersonCheckFill className="h-6 w-6 mr-1" />
							Bulk Task Assign
						</button> */}

            {/* </div> *   /  */}
            <div className="flex justify-end items-start gap-5 py-4 flex-wrap">
              <button
                onClick={() => openVulnerablityModal()}
                className="px-4 py-2 bg-gradient-to-bl from-[#333333] to-[#666666] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
              >
                <BiPlus className="h-6 w-6 mr-1" />
                Add Vulnerability
              </button>
              <button
                onClick={handleBulkDeleteTask}
                className="px-4 py-2 bg-gradient-to-bl from-[#333333] to-[#666666] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
              >
                <MdDeleteOutline className="h-6 w-6 mr-1" />
                Delete Data
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#333333] to-[#666666]   text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
              >
                <BiPlus className="h-6 w-6" />
                Report Upload
              </button>
              <button
                onClick={() => handleDownload(filteredData)}
                className="px-4 py-2 bg-gradient-to-r from-[#333333] to-[#666666]   text-white text-sm font-medium rounded-md flex items-center"
              >
                <BiSave className="h-6 w-6 mr-1" />
                Export Data
              </button>
            </div>


            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Report Upload"
              method={UploadBulkData}
              subtitle=" please upload an Excel file in XLSX or XLS format. Ensure the file is properly formatted and contains all necessary data for processing."
            />
          </div>

          {/* 📊 Table */}
          {paginatedData.length < 1 ? <NoDataFound /> : <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gradient-to-r from-[#333333] to-[#666666]  ">
                <tr>
                  <th className="px-2  text-left text-xs font-medium text-white uppercase">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => {
                        setSelectAll(!selectAll);
                        handleSelectAll(e)
                      }} />
                  </th>
                  {tableHeaders.map((header, index) => (
                    <th
                      key={index}
                      className="px-2 text-left text-xs font-medium text-white uppercase"
                    >
                      {header === "createdAt"
                        ? "Created Date"
                        : header.replace(/_/g, " ")}
                    </th>
                  ))}
                  <th className="px-2 text-left text-xs font-medium text-white uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y bg-table">
                {paginatedData?.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-500">
                    <td className="px-4 py-4 whitespace-nowrap flex justify-around gap-4">
                      <input
                        type="checkbox"
                        value="bubbles"
                        checked={index.filter((i) => i === item._id).length > 0}
                        onChange={() => handleChecked(item._id)} />

                    </td>
                    {tableHeaders.map((field, i) => (
                      <td
                        key={i}
                        className={`px-4  whitespace-nowrap text-sm text-white `}
                      >
                        {field === "createdAt"
                          ? new Date(item[field]).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                          : field === "Assigned_To"
                            ? item[field]?.full_name
                            : item[field]}
                      </td>
                    ))}
                    <td className="px-4 py-2 whitespace-nowrap flex justify-around gap-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600"
                      >
                        <MdOutlineDeleteOutline  className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openVulnerablityModal(item)}
                        className="text-blue-600"
                      >
                        <BiEditAlt className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleUpload(item)}
                        className="text-red-600"
                      >
                        <RiUpload2Fill className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigate(`/chat/${item._id}`, { state: { item } })}
                        className="text-green-600 hover:text-green-800 transition"
                      >
                        <FaSms className="h-4 w-4" />
                      </button>
                      {/* <button onClick={() => handleAssignTask(item._id)} className="text-red-600">
											<BsPersonCheckFill className="h-5 w-5" />
										</button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}

          {/* 📝 Modal Form */}
          {isEditOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-background rounded-xl shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4 bg-[#015289] rounded-t-xl">
                  <h2 className="text-lg font-semibold text-white">
                    Edit Status
                  </h2>
                  <button
                    onClick={() => setIsEditOpen(false)}
                    className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                  >
                    <MdClose className="h-6 w-6" />
                  </button>
                </div>

                {/* Form */}
                <div className="p-6">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Select a Status
                  </label>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    id="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option selected disabled>
                      Select a Status
                    </option>
                    {statusList.map((item, idx) => (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {status === "Exception" && (
                    <div className="mt-4">
                      <InputField
                        label="Exception Date"
                        type="date"
                        showPassword={false}
                        value={expectionTime}
                        onChange={(e) => setExpectionTime(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 mt-6 border-t pt-4">
                    <button
                      onClick={() => setIsEditOpen(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (status.length > 0 && editData._id) {
                          UpdateData(
                            { Status: status, Expection_time: expectionTime },
                            editData._id
                          );
                          orgnizationNotification(
                            editData?.Organization,
                            `${editData?.Title} is moved to Exception by ${authenticate.full_name}`
                          );
                          setIsEditOpen(false);
                          setStatus("");
                        }
                      }}
                      className="px-4 py-2 bg-[#015289] text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-background rounded-xl shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4 bg-gradient-color rounded-t-xl">
                  <h2 className="text-lg font-semibold text-white">
                    Upload Detailed Report
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                  >
                    <MdClose className="h-6 w-6" />
                  </button>
                </div>

                {/* Form */}
                <div className="p-6 flex flex-col items-center space-y-4">
                  <label className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setPdfReport(e.target.files[0])}
                      className="hidden"
                    />
                    <span className="text-gray-500">
                      Click to upload or drag a file here
                    </span>
                  </label>

                  <button
                    onClick={() => UploadDetailedReport(taskID, formData)}
                    className="w-full px-4 py-2 bg-gradient-color text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}


          {isModalOpen1 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
              <div className="bg-background rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4 bg-gradient-to-bl from-[#333333] to-[#666666]">
                  <h2 className="text-lg font-semibold text-gray-200">
                    {editMode ? "Edit Vulnerability" : "Add Vulnerability"}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen1(false)}
                    className="text-gray-100 hover:text-gray-200 transition"
                  >
                    <MdClose className="h-6 w-6" />
                  </button>
                </div>

                {/* Form */}
                <Formik
                  initialValues={editData1 || vulnerabilitiesItems}
                  onSubmit={(values) => {
                    //console.log(values, "hero in formik")
                    editMode1
                      ? UpdateData(values, editData._id1)
                      : AddData(values);

                    if (values.Status === "Exception") {
                      orgnizationNotification(
                        values.Organization,
                        `${values.Title} is Move to Exception by ${authenticate.full_name}`
                      );
                    }
                    setIsModalOpen(false);
                  }}
                >
                  {(
                    { setFieldValue, values } // ✅ Access setFieldValue here
                  ) => (
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-white">
                      {(editMode1 ? editFormHeaders : addFormHeaders).map(
                        (field) =>
                          field !== "creator" &&
                          field !== "Exception_time" && (
                            <div key={field} className="flex flex-col">
                              <label className="text-sm font-medium ">
                                {field.replace(/_/g, " ")}
                              </label>

                              {field === "Assigned_To" ? (
                                <select
                                  className="w-full p-2 border bg-input rounded-md focus:ring-2 focus:ring-blue-500 transition"
                                  name="Assigned_To"
                                  onChange={(e) =>
                                    setFieldValue("Assigned_To", e.target.value)
                                  }
                                  defaultValue=""
                                >
                                  <option disabled value="">
                                    --- Select a Tester ---
                                  </option>
                                  {allEmployeesData?.map((item, idx) => (
                                    <option key={idx} value={item._id}>
                                      {item.full_name}
                                    </option>
                                  ))}
                                </select>
                              ) : field === "Severity" ? (
                                <select
                                  className="w-full p-2 border bg-input rounded-md focus:ring-2 focus:ring-blue-500 transition"
                                  name="Severity"
                                  onChange={(e) =>
                                    setFieldValue("Severity", e.target.value)
                                  }
                                  defaultValue=""
                                >
                                  <option disabled value="">
                                    --- Select a Severity ---
                                  </option>
                                  {severityList?.map((item, idx) => (
                                    <option key={idx} value={item}>
                                      {item}
                                    </option>
                                  ))}
                                </select>
                              ) : field === "Status" ? (
                                <select
                                  className="w-full p-2 border bg-input rounded-md focus:ring-2 focus:ring-blue-500 transition"
                                  name="Status"
                                  onChange={(e) =>
                                    setFieldValue("Status", e.target.value)
                                  }
                                  defaultValue=""
                                >
                                  <option className="text-white" disabled value="">
                                    --- Select a Status ---
                                  </option>
                                  {statusList.map((item, idx) => (
                                    <option key={idx} value={item} className="text-white" >
                                      {item}
                                    </option>
                                  ))}
                                </select>
                              ) : field === "Remediate_Upcoming_Time_Line" ? (
                                <InputField
                                  type="date"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "Remediate_Upcoming_Time_Line",
                                      e.target.value
                                    )
                                  }
                                />
                              ) : (
                                <Field
                                  name={field}
                                  className="w-full p-2 border rounded-md bg-input focus:ring-2 focus:ring-blue-500 transition"
                                />
                              )}
                            </div>
                          )
                      )}

                      {values.Status === "Exception" && (
                        <InputField
                          label="Exception Date"
                          type="date"
                          onChange={(e) =>
                            setFieldValue("Expection_time", e.target.value)
                          }
                        />
                      )}

                      {/* Buttons */}
                      <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 border-t pt-4">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen1(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  text-white rounded-md hover:bg-blue-700 transition"
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

          <div className="flex justify-between items-center py-16">
            <button
              className={`px-4 py-2 bg-gradient-to-r from-[#333333] to-[#666666]   text-white border rounded-md ${taskPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={taskPage === 1}
              onClick={() => setTaskPage(taskPage - 1)}
            >
              Previous
            </button>
            <span className="text-white" >
              Page {taskPage}
              {/* of {totalPages} */}
            </span>
            <button
              className={`px-4 py-2 border rounded-md  text-white bg-gradient-to-r from-[#333333] to-[#666666]`}
              disabled={paginatedData?.length < 10}
              onClick={() => setTaskPage(taskPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Suspense>
  );
}
