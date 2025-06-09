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
            <div className="bg-[#11c56] border text-white rounded-xl px-4  flex justify-between items-center shadow-md">
              <div>
                <p className="text-sm  font-medium">
                  Total Issues
                </p>
                <p className="text-xl font-medium mt-1">6</p>
              </div>
              <div className="bg-blue-900 bg-opacity-30 p-2 rounded-lg">
                <img src="/icons/total-issue.png" alt="icon" />
              </div>
            </div>

            {/* Closed */}
            <div className="bg-[#0C2A1B] border  text-white rounded-xl p-4  flex justify-between items-center shadow-md">
              <div>
                <p className="text-sm text-green-400 font-medium">Closed</p>
                <p className="text-xl font-medium mt-1">2</p>
              </div>
              
               <div className="bg-green-900 bg-opacity-30 p-2 rounded-lg">
                <img src="/icons/closed.png" alt="icon" />
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-[#2A1F0A] border text-white rounded-xl p-4  flex justify-between items-center shadow-md">
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
            <div className="bg-[#2A0E13] border text-white rounded-xl p-4 flex justify-between items-center shadow-md">
              <div>
                <p className="text-sm text-red-400 font-medium">Critical</p>
                <p className="text-xl font-medium mt-1">1</p>
              </div>
              
               <div className="bg-red-900 bg-opacity-30 p-2 rounded-lg">
                <img src="/icons/cretical.png" alt="icon" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default JiraDataTable;
