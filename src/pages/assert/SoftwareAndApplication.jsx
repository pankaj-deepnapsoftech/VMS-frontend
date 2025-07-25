import {  useEffect, useState } from "react";
import { BiSearch, BiEditAlt } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import {
  useAllEmployeeContext,
  useAuthContext,
  useDataContext,
  useVulnerabililtyDataContext,
} from "@/context";
import { Formik, Form, Field } from "formik";
import * as XLSX from "xlsx";
import {  BsPersonCheckFill } from "react-icons/bs";
import toast from "react-hot-toast";
import {  FaSms } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InputField from "@/components/InputField";
import NoDataFound from "@/components/NoDataFound";
import { excelDateToJSDate } from "@/utils/utils";



const SoftwareAndApplication = () => {
     const [page, setPage] = useState(1);

  const {
    UpdateData,
    AddData,
    AllVulnerablilty,
    OrgAllVulnerablilty,
    allVulnerabilityData,
    DeleteData,
    AssignTask,
    BulkAssignTask,
    CreateNotifications,
    orgnizationNotification,
    GetAssetsOpenIssues,
    getOrganizationData,
    datafetchCount,
    setdatafetchCount,
    TopVulnerablilty,
    GetOrganization,
    Notifications,
  } = useVulnerabililtyDataContext();

  const { authenticate, token } = useAuthContext();

  const { allEmployeesData } = useAllEmployeeContext();

  useEffect(() => {
    authenticate?.role === "Admin"
      ? AllVulnerablilty(page)
      : OrgAllVulnerablilty(page);
    if (token && datafetchCount === 0) {
      TopVulnerablilty();
      GetOrganization();
      Notifications();
      setdatafetchCount(1);
    }
  }, [token, page, authenticate?.role]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [index, setIndex] = useState([]);

  // Extract headers dynamically for table display
  const tableHeaders =
    allVulnerabilityData.length > 0
      ? Object.keys(allVulnerabilityData[0]).filter(
          (key) => key !== "_id" && key !== "__v" && key !== "updatedAt"
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
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice();

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

  const handleChecked = (id) => {
    let data = index.filter((item) => item === id);
    if (data.length > 0) {
      data = index.filter((item) => item !== id);
      setIndex(data);
    } else {
      setIndex((pre) => [...pre, id]);
    }
  };

  const [empName, setEmpName] = useState("");
  const [vulTitle, setVulTitle] = useState("");
  const [id, setID] = useState("");

  const handleAssignTask = (item) => {
    setIsOpen(true);
    setID(item._id);
    setVulTitle(item.Application_Name);
  };

  const handleBulkAssignTask = () => {
    index.length > 0 ? "" : toast.error("Select Tasks For Assign");
    setIsOpen(index.length > 0);
    setID(id);
  };

  const handleDownload = (data) => {
    if (data.length < 1) {
      return alert("Don't Have Enough Data to Download");
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vulnerabilities");
    XLSX.writeFile(workbook, "Vulnerabilities.xlsx");
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

  const getRowColor = (rank) => {
    return rank % 2 === 0 ? "bg-gray-200" : "bg-white";
  };

  const [selected, setSelected] = useState("");

  let statusList = [
    "Open",
    "Closed",
    "Fix",
    "Re Open",
    "On Hold",
    "Exception",
    "In Progress",
  ];

  let severityList = [
    "Critical ",
    "High",
    "Medium",
    "Low",
    "Informational",
    "Other",
  ];

  const { UploadBulkData } = useDataContext();

  let navigate = useNavigate();
  return (
    <div>
         <div className="flex flex-col gap-3 lg:flex-row lg:justify-between  items-center py-3 ">
            <div className="relative mt-4 md:mt-0">
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 h-5 w-5" />
              <input
                type="text"
                placeholder="Search Vulnerabilities ..."
                className="pl-10 pr-4 py-2 border border-gray-400 text-white bg-[#565656] rounded-lg w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
              <div className=" w-full flex  justify-end gap-2">
                <select
                  name="Get Organization"
                  value={selected}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    GetAssetsOpenIssues(e.target.value);
                  }}
                  className=" px-3 py-2 rounded-lg border border-gray-300 bg-[#565656] text-white focus:ring-2 focus:ring-gray-600 focus:border-transparent outline-none transition"
                  id="Select_Tester"
                >
                  <option value="" selected disabled>
                    {" "}
                    -- Select Organization --{" "}
                  </option>

                  {getOrganizationData?.map((itm, idx) => (
                    <option key={idx} value={itm}>
                      {itm}
                    </option>
                  ))}
                </select>
                <button
                  className="p-1   bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  text-white text-[10px] rounded-lg hover:bg-gray-700 transition"
                  onClick={() => {
                    AllVulnerablilty();
                    setSelected("");
                  }}
                >
                  Clear Filter
                </button>
              </div>
            
          </div>

          {/* 📊 Table */}
          {paginatedData.length < 1 ? (
            <NoDataFound />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 shadow-sm bg-[#2d333b] rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-bl from-[#333333] to-[#666666] text-white">
                  <tr className="h-10">
                    {" "}
                    {/* Reduced row height */}
                    <th className="px-3 text-left text-xs font-semibold uppercase">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => {
                          setSelectAll(!selectAll);
                          handleSelectAll(e);
                        }}
                        className="h-3.5 w-3.5 accent-blue-500"
                      />
                    </th>
                    {tableHeaders?.map((header, index) => (
                      <th
                        key={index}
                        className="px-3 text-left text-xs font-semibold uppercase"
                      >
                        {header === "createdAt"
                          ? "Created Date"
                          : header.replace(/_/g, " ")}
                      </th>
                    ))}
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-[#2d333b] text-white divide-y divide-gray-200">
                  {paginatedData?.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-[#53565c] transition h-8"
                    >
                      {" "}
                      {/* Reduced row height */}
                      {/* Checkbox Column */}
                      <td className="px-3 py-2 text-center text-white">
                        <input
                          type="checkbox"
                          checked={index.includes(item._id)}
                          onChange={() => handleChecked(item._id)}
                          className="h-3.5 w-3.5 accent-blue-500"
                        />
                      </td>
                      {/* Table Data */}
                      {tableHeaders?.map((field, i) => (
                        <td
                          key={i}
                          className="px-3 py-2 text-xs text-gray-200 whitespace-nowrap"
                        >
                          {field === "createdAt" || field === "Exception_time"
                            ? item[field]
                              ? new Date(item[field]).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "-"
                            : field === "Assigned_To"
                            ? item[field]?.full_name ?? "-"
                            : field === "Remediated_Date" && item[field]
                            ? excelDateToJSDate(item.Remediated_Date)
                            : field === "detailed_Report"
                            ? item[field] && (
                                <a
                                  className="text-blue-600 underline hover:text-blue-800"
                                  href={item[field]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View File
                                </a>
                              )
                            : item[field] || "-"}
                        </td>
                      ))}
                      {/* Action Buttons */}
                      <td className="px-3 py-2 flex items-center space-x-2">
                        <button
                          onClick={() => openModal(item)}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <BiEditAlt className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <RiDeleteBinFill className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAssignTask(item)}
                          className="text-green-600 hover:text-green-800 transition"
                        >
                          <BsPersonCheckFill className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/chat/${item._id}`, { state: { item } })
                          }
                          className="text-green-600 hover:text-green-800 transition"
                        >
                          <FaSms className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-table rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] ">
                  <h2 className="text-lg font-semibold text-gray-200">
                    {"Assign Task to Employee"}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-100 hover:text-gray-200 transition"
                  >
                    <MdClose className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-10">
                  <label
                    htmlFor="employees"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Select an Employee
                  </label>
                  <select
                    onChange={(e) => setEmpName(e.target.value)}
                    id="employees"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option selected disabled>
                      Select a Employee
                    </option>
                    {allEmployeesData?.map((item, idx) => (
                      <option key={idx} value={item._id}>
                        {item.full_name}
                      </option>
                    ))}
                  </select>

                  <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 border-t pt-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!id) {
                          BulkAssignTask(empName, index);
                          setIsOpen(false);
                          CreateNotifications(
                            empName,
                            `${index.length} Tasks Assign to you`
                          );
                        } else {
                          AssignTask(empName, id);
                          setIsOpen(false);
                          CreateNotifications(
                            empName,
                            `${vulTitle} has Assign a New Task To You`
                          );
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 📝 Modal Form */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
              <div className="bg-table rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4 bg-gradient-to-bl from-[#333333] to-[#666666]">
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
                    //console.log(values, "hero in formik")
                    editMode
                      ? UpdateData(values, editData._id)
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
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                      {(editMode ? editFormHeaders : addFormHeaders).map(
                        (field) =>
                          field !== "creator" &&
                          field !== "Exception_time" && (
                            <div key={field} className="flex flex-col">
                              <label className="text-sm font-medium text-white">
                                {field.replace(/_/g, " ")}
                              </label>

                              {field === "Assigned_To" ? (
                                <select
                                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition"
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
                                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition"
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
                                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition"
                                  name="Status"
                                  onChange={(e) =>
                                    setFieldValue("Status", e.target.value)
                                  }
                                  defaultValue=""
                                >
                                  <option disabled value="">
                                    --- Select a Status ---
                                  </option>
                                  {statusList.map((item, idx) => (
                                    <option key={idx} value={item}>
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
                                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition"
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
                          onClick={() => setIsModalOpen(false)}
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

          <div className="flex justify-between items-center my-16">
            <button
              className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  text-white border rounded-md ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span className="text-white">Page {page}</span>
            <button
              className={`px-4 py-2 border rounded-md  text-white bg-gradient-to-tr from-[#1f1d1d] to-[#666666] `}
              disabled={allVulnerabilityData?.length < 10}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
    </div>
  )
}

export default SoftwareAndApplication