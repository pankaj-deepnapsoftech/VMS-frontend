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
  } = useJiraContext();

  const { token } = useAuthContext();
  // selectedRows now stores full item objects
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isJDModalOpen, setIsJDModalOpen] = useState(false);
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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-[#f8fafc] p-6">
          <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all duration-200"
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
                    className="px-4 py-2.5 bg-[#25265e] text-white rounded-lg flex items-center gap-2 hover:bg-[#6f68d6] transition-colors duration-200"
                  >
                    <BiSave className="h-5 w-5" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setIsJDModalOpen(true)}
                    className="px-4 py-2.5 bg-[#6366f1] text-white rounded-lg flex items-center gap-2 hover:bg-[#4f46e5] transition-colors duration-200"
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
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm rounded-xl">
                  <thead className="bg-[#1e293b] text-white ">
                    <tr>
                      <th className="px-4 py-2 text-left">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#6366f1] focus:ring-[#6366f1]"
                          checked={selectedRows.length === paginatedData.length}
                          onChange={handleSelectAll}
                        />
                      </th>
                      {[
                        "ID",
                        "Issue Type",
                        "Issue ID",
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
                  <tbody className="bg-white divide-y divide-gray-100">
                    {paginatedData.map((item) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-gray-50 transition-colors duration-150 ${
                          selectedRows.includes(item) ? "bg-indigo-50" : ""
                        }`}
                      >
                        <td className="px-4 py-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-[#6366f1] focus:ring-[#6366f1]"
                            checked={selectedRows.includes(item)}
                            onChange={() => handleSelectRow(item)}
                          />
                        </td>
                        {Object.entries(item).map(
                          ([key, value]) =>
                            key !== "creatorAccountId" && (
                              <td
                                key={key}
                                className="px-4 py-2 text-gray-700 whitespace-nowrap"
                              >
                                {value}
                              </td>
                            )
                        )}
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => console.log(item)}
                              className="text-[#6366f1] hover:text-[#4f46e5] transition-colors duration-150"
                              title="Edit"
                            >
                              <BiEditAlt className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                DeleteData(item.issueId);
                              }}
                              className="text-red-600 hover:text-red-800 transition-colors duration-150"
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

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#6366f1] text-white hover:bg-[#4f46e5]"
                } transition-colors duration-200`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">Page {page}</span>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  paginatedData.length < 10
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#6366f1] text-white hover:bg-[#4f46e5]"
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
