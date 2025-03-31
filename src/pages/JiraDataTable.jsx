import React, {
  Suspense,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { BiSearch, BiEditAlt, BiPlus, BiSave, BiUpload } from "react-icons/bi";
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
  } = useJiraContext();

  const { token } = useAuthContext();

  console.log("jiraData from ui",jiraData)

  useEffect(() => {
    if (token && datafetchCount === 0) {
      JiraConfigData();
      ConfigData === null ? JiraData() : JiraManualData();
      setdatafetchCount(1);
    }
  }, [token, page]);
  const [isJDModalOpen, setIsJDModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const fileInputRef = useRef(null);

  // Extract and format necessary fields
  const processedData = useMemo(() => {
    return jiraData?.map((item, index) => ({
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
  }, [jiraData]);

  // Filter data based on search input
  const filteredData = useMemo(() => {
    return processedData?.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [processedData, searchTerm]);

  const paginatedData = useMemo(() => {
    return filteredData?.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [filteredData, currentPage]);

  // Handle downloading data as an Excel file
  const handleDownload = useCallback(() => {
    if (filteredData.length < 1) {
      return alert("Don't Have Enough Data to Download");
    }
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vulnerabilities");
    XLSX.writeFile(workbook, "Vulnerabilities.xlsx");
  }, [filteredData]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-4 md:p-6 max-w-[95%] mx-auto bg-white rounded-xl shadow-lg">
          {/* Search Bar & Buttons */}
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
                onClick={handleDownload}
                className="px-4 py-2 bg-[#015289] text-white text-sm font-medium rounded-md flex items-center hover:bg-[#014173]"
              >
                <BiSave className="h-4 w-4 mr-2" />
                Export Data
              </button>
              <button
                onClick={() => setIsJDModalOpen(true)}
                className="px-4 py-2 bg-[#015289] text-white text-sm font-medium rounded-md flex items-center hover:bg-[#014173]"
              >
                <BiUpload className="h-4 w-4 mr-2" />
                Upload Data
              </button>

              <Modal
                isOpen={isJDModalOpen}
                onClose={() => setIsJDModalOpen(false)}
                title="Jira Data Upload"
                method={UploadJiraData}
              />

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => console.log(e.target.files)} // Handle file selection
              />
            </div>
          </div>

          {/* Data Table */}
          {paginatedData.length < 1 ? (
            <NoDataFound />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#015289] text-white">
                  <tr>
                    {[
                      "ID",
                      "Issue Type",
                      "Issue ID",
                      "issue Description",
                      "Project Name",
                      "Project Type",
                      "Priority",
                      "Assignee",
                      "Status",
                      "Remediated Date",
                      "Creator Name",
                      "Creator Email Address",
                      "Creator Account ID",
                      "Actions",
                    ].map((header, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-3 text-left text-xs font-medium uppercase"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedData?.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.issueType}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.issueId}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.issueDescription}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.projectName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.projectType}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.priority}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.assignee}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.status}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.remediatedDate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.creatorName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.creatorEmail}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.creatorAccountId}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap flex justify-around">
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
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}

          <div className="flex justify-between items-center py-16">
            <button
              className={`px-4 py-2 bg-[#015289] text-white border rounded-md ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              className={`px-4 py-2 border rounded-md  text-white bg-[#015289]`}
              disabled={paginatedData?.length < 10}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Suspense>
  );
};
