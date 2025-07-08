/* eslint-disable react/prop-types */
import InputField from "@/components/InputField";
import ReportModal from "@/components/modal/ReportModal";
import NoDataFound from "@/components/NoDataFound";
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext, useScheduleAssessmentContext } from "@/context";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEditAlt, BiSearch, BiUpload } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

const Reports = () => {
  const { getOrgnizationData: orgData } = useScheduleAssessmentContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const { token, authenticate } = useAuthContext();
  const [file, setFile] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null); // State for edit data

  const [creatorFilter, setCreatorFilter] = useState("");
  const [orgFilter, setOrgFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const fetchReportData = async () => {
    if (!token) return;

    let query = "";

    // if (authenticate.role === "Admin") {
    //   query = "/report/get-report";
    // } else if (authenticate.role === "Assessor") {
    //   query = "/report/get-report-assesor";
    // } else {
    //   query = "/report/get-report-org";
    // }

    setLoading(true);
    try {
      const response = await AxiosHandler.get(query);
      setReportData(response.data?.data || []);
      setFilterData(response.data?.data || []); // Initialize filterData with the fetched data
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  // Filtering logic
  useEffect(() => {
    let filteredData = reportData;
    if (creatorFilter) {
      filteredData = filteredData.filter((report) =>
        report.creator?.full_name
          .toLowerCase()
          .includes(creatorFilter.toLowerCase())
      );
    }

    if (orgFilter) {
      filteredData = filteredData.filter((report) =>
        report.Organization?.Organization.toLowerCase().includes(
          orgFilter.toLowerCase()
        )
      );
    }

    if (dateFilter) {
      filteredData = filteredData.filter((report) => {
        const reportDate = new Date(report.createdAt).toLocaleDateString();
        return reportDate === new Date(dateFilter).toLocaleDateString();
      });
    }

    setFilterData(filteredData);
  }, [creatorFilter, orgFilter, dateFilter, reportData]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!values.Organization) {
      toast.error("Please select an organization.");
      return;
    }

    if (!values.report && !isEdit) {
      toast.error("Please upload a report file.");
      return;
    }

    const formData = new FormData();
    formData.append("Organization", values.Organization);
    formData.append("Type_Of_Assesment", values.Type_Of_Assesment);
    if (values.report) {
      formData.append("report", values.report);
    }

    setLoading(true);
    try {
      let response;
      if (isEdit) {
        // Update report
        response = await AxiosHandler.put(
          `/report/update-report/${editData._id}`,
          formData
        );
        toast.success(response.data?.message || "Report updated successfully!");
      } else {
        // Create new report
        response = await AxiosHandler.post("/report/detailed-report", formData);
        toast.success(
          response.data?.message || "Report uploaded successfully!"
        );
      }
      setIsModalOpen(false);
      resetForm();
      fetchReportData();
    } catch (error) {
      toast.error(
        `Failed to ${
          isEdit ? "update" : "upload"
        } the report. Please try again: ${error}`
      );
      console.log(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const OrganizationDropdown = ({ orgData = [], setFieldValue, values }) => {
    return (
      <select
        className="w-full p-2 border border-gray-300 rounded-lg bg-input text-white"
        value={values.Organization}
        onChange={(e) => setFieldValue("Organization", e.target.value)}
      >
        <option value="">Select an Organization</option>
        {Array.isArray(orgData) &&
          orgData.map((org) => (
            <option key={org._id} value={org._id}>
              {org.Organization}
            </option>
          ))}
      </select>
    );
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await AxiosHandler.delete(`/report/delete-report/${id}`);
      toast.success(response.data.message || "Report removed successfully!");
      fetchReportData();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEdit = (report) => {
    setEditData(report);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6 mx-auto bg-gradient-custom shadow-lg">
      {/* Search Bar & Buttons */}
      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex w-full lg:justify-end items-center py-2 gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEdit(false);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-button hover:bg-hoverbutton text-white text-sm font-medium rounded-md flex items-center"
          >
            <BiUpload className="h-4 w-4 mr-2" />
            Detailed Report
          </button>
        </div>
        )
      </div>

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-60 mb-4">
        <input
          type="text"
          placeholder="Filter by Creator Name"
          className="p-2 border border-gray-300 rounded-lg text-white bg-input"
          value={creatorFilter}
          onChange={(e) => setCreatorFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter by Organization Name"
          className="p-2 border border-gray-300 text-white rounded-lg bg-input"
          value={orgFilter}
          onChange={(e) => setOrgFilter(e.target.value)}
        />

        <input
          type="date"
          placeholder="Filter by Date"
          className="p-2 border border-gray-300 text-white rounded-lg bg-input"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      {filterData.length < 1 ? (
        <NoDataFound />
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full divide-y divide-gray-200 bg-[#2d333b]">
            <thead className="bg-gradient-to-bl from-[#333333] to-[#666666] rounded-e-lg text-white">
              <tr>
                {[
                  "S NO.",
                  "Date",
                  "Creator",
                  "Type Of Assesment",
                  "Organization",
                  "Report",
                  "Actions",
                ].map((header, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 text-center text-xs font-medium uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filterData.length > 0 ? (
                filterData.map((report, index) => (
                  <tr key={report?._id} className="hover:bg-gray-500 border-b">
                    {/* Serial Number */}
                    <td className="px-4 py-1 text-center whitespace-nowrap text-sm text-white">
                      {index + 1}
                    </td>

                    {/* Date (Formatted) */}
                    <td className="px-4 py-1 text-center whitespace-nowrap text-sm text-white">
                      {new Date(report?.createdAt).toLocaleDateString()}
                    </td>

                    {/* Creator Name */}
                    <td className="px-4 py-1 te-center whitespace-nowrap text-sm text-white">
                      {report.creator?.full_name || "-"}
                    </td>

                    <td className="px-4 py-1 te-center whitespace-nowrap text-sm text-white">
                      {report.Type_Of_Assesment || "-"}
                    </td>

                    {/* Organization */}
                    <td className="px-4 py-1 text-center whitespace-nowrap text-sm text-white">
                      {report.Organization?.Organization || "-"}
                    </td>
                    {/* View Report Button */}
                    <td className="px-4 py-1 text-center whitespace-nowrap text-sm text-gray-900">
                      <a
                        href={report?.file}
                        target="_blank"
                        className="bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  text-gray-50 px-4 py-1 rounded  "
                      >
                        Download Report
                      </a>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-2 whitespace-nowrap text-center flex justify-center gap-2 items-start">
                      <>
                        <button
                          onClick={() => handleEdit(report)} // Open modal in edit mode
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <BiEditAlt className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(report._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <RiDeleteBinFill className="h-5 w-5" />
                        </button>
                      </>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No reports available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
          <div className="bg-input rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b p-4 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] ">
              <h2 className="text-lg font-semibold text-gray-200">
                {isEdit ? "Edit Detailed Report" : "Add Detailed Report"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEdit(false); // Reset edit mode
                  setEditData(null); // Clear edit data
                }}
                className="text-gray-100 hover:text-gray-200 transition"
              >
                <MdClose className="h-6 w-6" />
              </button>
            </div>

            <Formik
              initialValues={{
                Organization: isEdit ? editData?.Organization?._id : "",
                report: "",
                Type_Of_Assesment: isEdit ? editData.Type_Of_Assesment : "",
              }}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values, handleChange }) => (
                <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {/* Organization Dropdown */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Organization
                    </label>
                    <OrganizationDropdown
                      orgData={orgData}
                      setFieldValue={setFieldValue}
                      values={values}
                    />
                  </div>

                  {/* Report Field */}
                  <InputField
                    label="report"
                    name="report"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFieldValue("report", file);
                    }}
                  />

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-200">
                      type of assesment
                    </label>
                    <select
                      name="Type_Of_Assesment"
                      value={values.Type_Of_Assesment}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border text-gray-200 bg-input border-gray-500 focus:ring-2 focus:ring-gray-500 text-sm focus:border-transparent outline-none transition"
                      id="Type_Of_Assesment"
                    >
                      <option value="" disabled>
                        {" "}
                        -- Select Type of Assesment --{" "}
                      </option>

                      <option value={"Secure Code Scan"}>
                        Secure Code Scan
                      </option>

                      <option value={"Dynamic Application"}>
                        Dynamic Application{" "}
                      </option>

                      <option value={"Web Application Penetration Testing"}>
                        Web Application Penetration Testing
                      </option>

                      <option value={"Api Penetration Testing"}>
                        Api Penetration Testing
                      </option>

                      <option value={"Infrastructure Vulnerability Scan"}>
                        Infrastructure Vulnerability Scan
                      </option>

                      <option value={"Infrastructure Penetration Testing"}>
                        Infrastructure Penetration Testing
                      </option>
                      <option value={"Mobile Application Penetration Test"}>
                        Mobile Application Penetration Test
                      </option>
                      <option value={"Red Team exercise"}>
                        Red Team exercise
                      </option>
                      <option value={"Attack Simulation Exercise"}>
                        Attack Simulation Exercise
                      </option>
                      <option value={"Configuration Audits"}>
                        Configuration Audits
                      </option>
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 border-t pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setIsEdit(false); // Reset edit mode
                        setEditData(null); // Clear edit data
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-[#333333] to-[#666666] text-white rounded-md hover:bg-blue-700 transition"
                    >
                      {isEdit ? "Update" : "Save"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {isReportOpen && <ReportModal file={file} close={setIsReportOpen} />}
    </div>
  );
};

export default Reports;
