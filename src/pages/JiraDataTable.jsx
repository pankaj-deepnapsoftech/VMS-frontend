"use client";

import {
  Suspense,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { BiSearch, BiEditAlt, BiSave, BiUpload, BiTrash } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { useAuthContext, useJiraContext } from "@/context";
import Loader from "@/components/Loader/Loader";
import NoDataFound from "@/components/NoDataFound";
import InputField from "@/components/InputField";
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
    UpdateData,
  } = useJiraContext();

  console.log("this is jira data",jiraData)

  const { token } = useAuthContext();
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isJDModalOpen, setIsJDModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const rowsPerPage = 10;
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (token && datafetchCount === 0) {
      JiraConfigData();
      ConfigData === null ? JiraData() : JiraManualData();
      setdatafetchCount(1);
    }
  }, [token, page]);

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

  const handleSelectRow = (item) => {
    setSelectedRows((prev) =>
      prev.includes(item) ? prev.filter((row) => row !== item) : [...prev, item]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === paginatedData.length ? [] : [...paginatedData]
    );
  };

  const deleteData = async () => {
    const deleteList = selectedRows.map((item) => item.issueId);
    DeleteMultipleData(deleteList);
    setSelectedRows([]);
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      High: "bg-red-500 text-white",
      Critical: "bg-red-600 text-white",
      Medium: "bg-yellow-500 text-black",
      Low: "bg-green-500 text-white",
      Informational: "bg-blue-500 text-white",
    };
    return colors[priority] || "bg-gray-500 text-white";
  };

  const getStatusBadge = (status) => {
    const colors = {
      ReOpen: "bg-yellow-500 text-black",
      Open: "bg-blue-500 text-white",
      Closed: "bg-green-500 text-white",
    };
    return colors[status] || "bg-gray-500 text-white";
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: { email: "", password: "" },
      onSubmit: (value) => {
        console.log("UpdateData", value);
        UpdateData(selectedItem?.issueId, value);
        setIsUpdateModalOpen(false);
      },
    });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="pl-10">
          <h1 className="text-white font-semibold text-3xl mt-10 ">
            Third Party Data
          </h1>
          <p className="text-gray-400">
            Monitor and manage your jira issues and project data
          </p>

          <div className="grid grid-cols-4 gap-4 px-4 py-6 ">
            {/* Total Issues */}
            <div className="bg-[#101b54] border border-blue-900 text-white rounded-xl px-4  flex justify-between items-center shadow-md">
              <div>
                <p className="text-sm  font-medium">Total Issues</p>
                <p className="text-xl font-medium mt-1">6</p>
              </div>
              <div className="bg-blue-900 bg-opacity-30 p-2 rounded-lg">
                <img src="/icons/total-issue.png" alt="icon" />
              </div>
            </div>

            {/* Closed */}
            <div className="bg-[#0c2330] border border-green-900  text-white rounded-xl p-4  flex justify-between items-center shadow-md">
              <div>
                <p className="text-sm text-green-400 font-medium">Closed</p>
                <p className="text-xl font-medium mt-1">2</p>
              </div>
              <div className="bg-green-900 bg-opacity-30 p-2 rounded-lg">
                <img src="/icons/closed.png" alt="icon" />
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-[#22191a] border border-yellow-900 text-white rounded-xl p-4  flex justify-between items-center shadow-md">
              <div>
                <p className="text-sm text-yellow-400 font-medium">
                  In Progress
                </p>
                <p className="text-xl font-medium mt-1">2</p>
              </div>
              <div className="bg-yellow-900 bg-opacity-30 p-2 rounded-lg">
                <img src="/icons/in-progress.png" alt="icon" />
              </div>
            </div>

            {/* Critical */}
            <div className="bg-[#270f21] border border-red-900 text-white rounded-xl p-4 flex justify-between items-center shadow-md">
              <div>
                <p className="text-sm text-red-400 font-medium">Critical</p>
                <p className="text-xl font-medium mt-1">1</p>
              </div>
              <div className="bg-red-900 bg-opacity-30 p-2 rounded-lg">
                <img src="/icons/cretical.png" alt="icon" />
              </div>
            </div>
          </div>

          <div className="mt-6 bg-[#0c1120] border border-gray-700 rounded-xl overflow-x-auto text-sm text-white">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-[#0c1120]">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Issue ID</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Project</th>
                  <th className="px-4 py-3 text-left">Priority</th>
                  <th className="px-4 py-3 text-left">Assignee</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Creator</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-300">
                {paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-[#1e1e1e] transition"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item)}
                        onChange={() => handleSelectRow(item)}
                      />
                    </td>
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                        {item.issueType}
                      </span>
                    </td>
                    <td className="p-3">{item.issueDescription}</td>
                    <td className="p-3 font-semibold">{item.projectName}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded ${getPriorityBadge(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="p-3">{item.assignee}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">{item.remediatedDate}</td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-white">{item.creatorName}</span>
                        <span className="text-xs text-gray-400">
                          {item.creatorEmail}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 flex gap-2">
                      <BiEditAlt
                        onClick={() => {
                          setIsUpdateModalOpen(true);
                          setSelectedItem(item);
                        }}
                        className="text-blue-400 cursor-pointer"
                      />
                      <RiDeleteBinFill
                        onClick={() => DeleteData(item.issueId)}
                        className="text-red-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan="11" className="text-center py-4 text-gray-500">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center px-4 py-2 text-xs border-t border-gray-700">
              <div>
                Showing {paginatedData.length} of {filteredData.length} results
              </div>
              <div className="space-x-2">
                <button
                  className="px-2 py-1 bg-gray-700 rounded text-white"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Previous
                </button>
                <span className="px-3 py-1 bg-blue-600 rounded text-white">
                  Page {currentPage}
                </span>
                <button
                  className="px-2 py-1 bg-gray-700 rounded text-white"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev * rowsPerPage < filteredData.length ? prev + 1 : prev
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default JiraDataTable;
