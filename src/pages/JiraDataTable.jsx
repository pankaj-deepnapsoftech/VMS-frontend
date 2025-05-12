import React, {
  Suspense,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { BiSearch, BiEditAlt, BiSave, BiUpload, BiTrash } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import { useAuthContext, useJiraContext } from "@/context";
import * as XLSX from "xlsx";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";
import NoDataFound from "@/components/NoDataFound";
import { Modal } from "@/components/modal/FileUploadModal";
import { MdClose } from "react-icons/md";
import { useFormik } from "formik";
import InputField from "@/components/InputField";
import { FaEnvelope } from "react-icons/fa";

export const JiraDataTable = () => {
  const {
    loading,
    jiraData,
    page,
    setPage,
    JiraData,
    JiraConfigData,
    datafetchCount,
    setdatafetchCount,
    UploadJiraData,
    JiraManualData,
    ConfigData,
    DeleteMultipleData,
    DeleteData,
    UpdateData,
  } = useJiraContext();

  const { token } = useAuthContext();
  // selectedRows now stores full item objects
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isJDModalOpen, setIsJDModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const rowsPerPage = 10;
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (token && datafetchCount === 0) {
      JiraConfigData();
      ConfigData === null ? JiraData() : JiraManualData();
      setdatafetchCount(1);
    }
  }, [token, page]);

  // Format Jira Data into a flat structure
  const formatData = (data) => {
    return data.map((item, index) => ({
      id: index + 1,
      issueId: item.issueType?.id || "N/A",
      issueType: item.issueType?.name || "N/A",
      issueDescription: item.issueType?.description || "N/A",
      projectName: item.project?.name || "N/A",
      projectType: item.project?.projectTypeKey || "N/A",
      priority: item.priority || "N/A",
      assignee: item.assignee || "Unassigned",
      status: item.status || "N/A",
      remediatedDate: item.Remediated_Date
        ? new Date(item.Remediated_Date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "N/A",
      creatorName: item.creator?.displayName || "N/A",
      creatorEmail: item.creator?.emailAddress || "N/A",
      creatorAccountId: item.creator?.accountId || "N/A",
    }));
  };

  const processedData = useMemo(() => formatData(jiraData), [jiraData]);

  const filteredData = useMemo(() => {
    return processedData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [processedData, searchTerm]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [filteredData, currentPage]);

  const handleDownload = useCallback(() => {
    if (filteredData.length < 1) {
      toast.error("No data available to download");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vulnerabilities");
    XLSX.writeFile(workbook, "Vulnerabilities.xlsx");
  }, [filteredData]);

  // Update selection to store the full item
  const handleSelectRow = (item) => {
    setSelectedRows((prev) =>
      prev.includes(item) ? prev.filter((row) => row !== item) : [...prev, item]
    );
  };

  let [deleteList, setDeleteList] = useState([]);

  // Select or deselect all items on the current page
  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === paginatedData.length ? [] : [...paginatedData]
    );
  };

  selectedRows.map((itm) => {
    if (!deleteList.includes(itm.issueId)) deleteList.push(itm.issueId);
  });

  //.log("paginatedData",paginatedData[0].issueId)

  // Delete selected items (sending the full item objects)
  const deleteData = async () => {
    console.log("ids", deleteList);
    DeleteMultipleData(deleteList);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: { email: "", password: "" },
      // validationSchema: SignInValidation,
      onSubmit: (value) => {
        console.log("UpdateData", value);
        UpdateData(id, value);
      },
    });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-background p-6">
          <div className="max-w-full mx-auto bg-[#565656] rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-6  bg-[#333333] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2.5 border-gray-500 text-white bg-[#565656] rounded-lg w-full md:w-80 focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex lg:flex-row flex-col gap-3 items-start">
                {selectedRows.length > 0 && (
                  <div className="flex flex-row gap-2 justify-end items-end">
                    <button
                      onClick={deleteData}
                      className="px-4 py-2.5 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors duration-200"
                    >
                      <BiTrash className="h-5 w-5" />
                      <span>Delete({selectedRows.length})</span>
                    </button>
                  </div>
                )}

                <div className="flex flex-row items-start gap-4 justify-start w-full">
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2.5 bg-gradient-to-bl from-[#333333] to-[#666666] text-white rounded-lg flex items-center gap-2 hover:bg-[#6f68d6] transition-colors duration-200"
                  >
                    <BiSave className="h-5 w-5" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setIsJDModalOpen(true)}
                    className="px-4 py-2.5 bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  text-white rounded-lg flex items-center gap-2 hover:bg-[#4f46e5] transition-colors duration-200"
                  >
                    <BiUpload className="h-5 w-5" />
                    <span>Upload</span>
                  </button>{" "}
                </div>
              </div>
            </div>

            {/* Data Table */}
            {paginatedData.length < 1 ? (
              <NoDataFound />
            ) : (
              <div className="overflow-x-auto rounded-lg m-2">
                <table className="w-full table-auto text-sm bg-white">
                  <thead className="bg-gradient-to-bl from-[#333333] to-[#666666] text-white ">
                    <tr>
                      <th className="px-4 py-2 text-left">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#6366f1] focus:ring-[#6366f1]"
                          checked={selectedRows.length === paginatedData.length}
                          onChange={handleSelectAll}
                        />
                   2   </th>
                      {[
                        "ID",
                        "Issue ID",
                        "Issue Type",
                        "Issue Description",
                        "Project Name",
                        "Project Type",
                        "Priority",
                        "Assignee",
                        "Status",
                        "Remediated Date",
                        "Creator Name",
                        "Creator Email",
                        "Actions",
                      ].map((header, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-[#2d333b] transition">
                    {paginatedData.map((item) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-gray-500 border-b transition-colors duration-150 ${
                          selectedRows.includes(item) ? "bg-indigo-50" : ""
                        }`}
                      >
                        <td className="px-4 py-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300  text-white focus:ring-[#6366f1]"
                            checked={selectedRows.includes(item)}
                            onChange={() => handleSelectRow(item)}
                          />
                        </td>
                        {Object.entries(item).map(
                          ([key, value]) =>
                            key !== "creatorAccountId" && (
                              <td
                                key={key}
                                className="px-4 py-2 text-white whitespace-nowrap"
                              >
                                {value}
                              </td>
                            ) 
                        )}
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {/* <button
                              onClick={() => {
                                setIsUpdateModalOpen(true);
                                console.log(item);
                              }}
                              className="text-[#6366f1] hover:text-[#4f46e5] transition-colors duration-150"
                              title="Edit"
                            >
                              <BiEditAlt className="h-4 w-4" />
                            </button> */}
                            <button
                              onClick={() => {
                                DeleteData(item.issueId);
                              }}
                              className="text-red-600 hover:text-red-800 transition-colors ml-5 duration-150"
                              title="Delete"
                            >
                              <RiDeleteBinFill className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {isUpdateModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
                  {/* Header */}
                  <div className="flex justify-between items-center border-b p-4  bg-gradient-to-bl from-[#333333] to-[#666666]">
                    <h2 className="text-lg font-semibold text-gray-200">
                      {"Update Details"}
                    </h2>
                    <button
                      onClick={() => setIsUpdateModalOpen(false)}
                      className="text-gray-100 hover:text-gray-200 transition"
                    >
                      <MdClose className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="p-10 ">
                    <div className=" flex  gap-6 mb-8   ">
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-5 w-full flex flex-col "
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <InputField
                            label={"Email Address"}
                            type={"email"}
                            showPassword={false}
                            icon={FaEnvelope}
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter your Email Address"
                            name="email"
                          />
                          {touched.email && errors.email && (
                            <p> {errors.email}</p>
                          )}
                        </div>

                        <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 border-t pt-4">
                          <button
                            type="button"
                            onClick={() => setIsUpdateModalOpen(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            onSubmit={handleSubmit}
                            className="px-4 py-2  bg-gradient-to-bl from-[#333333] to-[#666666] text-white rounded-md hover:bg-blue-700 transition"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#333333]">
              <button
                className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  text-white border rounded-md  ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  "
                } transition-colors duration-200`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span className=" text-white">Page {page}</span>
              <button
                className={`px-4 py-2 border rounded-md  text-white bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  ${
                  paginatedData.length < 10
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  "
                } transition-colors duration-200`}
                disabled={paginatedData.length < 10}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>

          <Modal
            isOpen={isJDModalOpen}
            onClose={() => setIsJDModalOpen(false)}
            title="Jira Data Upload"
            method={UploadJiraData}
          />

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => console.log(e.target.files)}
          />
        </div>
      )}
    </Suspense>
  );
};

export default JiraDataTable;
