import InputField from "@/components/InputField";
import ReportModal from "@/components/modal/ReportModal";
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "@/context";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEditAlt, BiSearch, BiUpload } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orgData, setOrgData] = useState([]);
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

    if (authenticate.role === "Admin") {
      query = "/report/get-report";
    } else if (authenticate.role === "Assessor") {
      query = "/report/get-report-assesor";
    } else {
      query = "/report/get-report-org";
    }

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

  const fetchOrganization = async (search = "") => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await AxiosHandler.get(`/auth/all-orgs`);
      setOrgData(response.data.data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
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
        report.Organization?.Organization
          .toLowerCase()
          .includes(orgFilter.toLowerCase())
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
        toast.success(response.data?.message || "Report uploaded successfully!");
      }
      setIsModalOpen(false);
      resetForm();
      fetchReportData();
    } catch (error) {
      toast.error(`Failed to ${isEdit ? "update" : "upload"} the report. Please try again: ${error}`);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const OrganizationDropdown = ({ orgData = [], setFieldValue, values }) => {
    return (
      <select
        className="w-full p-2 border border-gray-300 rounded-lg"
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
    <div className="p-4 md:p-6 mt-5 max-w-[95%] mx-auto bg-white rounded-xl shadow-lg">
      {/* Search Bar & Buttons */}
      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
        {authenticate.role === "Assessor" ? (
          <div className="flex w-full lg:justify-end items-center py-2 gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(false);
                setIsModalOpen(true);
              }}
              className="px-4 py-2 bg-[#015289] text-white text-sm font-medium rounded-md flex items-center hover:bg-[#014173]"
            >
              <BiUpload className="h-4 w-4 mr-2" />
              Detailed Report
            </button>
          </div>
        ) : null}
      </div>

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {(authenticate.role === "Admin" || authenticate.role != "Assessor") ? (
          <input
            type="text"
            placeholder="Filter by Creator Name"
            className="p-2 border border-gray-300 rounded-lg"
            value={creatorFilter}
            onChange={(e) => setCreatorFilter(e.target.value)}
          />
        ) : null}

        {(authenticate.role === "Admin" || authenticate.role === "Assessor") ? (
          <input
            type="text"
            placeholder="Filter by Organization Name"
            className="p-2 border border-gray-300 rounded-lg"
            value={orgFilter}
            onChange={(e) => setOrgFilter(e.target.value)}
          />
        ) : null}

        <input
          type="date"
          placeholder="Filter by Date"
          className="p-2 border border-gray-300 rounded-lg"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#015289] text-white">
            <tr>
              {[
                "S NO.",
                "Date",
                "Creator",
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
                <tr key={report?._id} className="hover:bg-gray-50">
                  {/* Serial Number */}
                  <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>

                  {/* Date (Formatted) */}
                  <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {new Date(report?.createdAt).toLocaleDateString()}
                  </td>

                  {/* Creator Name */}
                  <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {report.creator?.full_name || "-"}
                  </td>

                  {/* Organization */}
                  <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {report.Organization?.Organization || "-"}
                  </td>

                  {/* View Report Button */}
                  <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {/* <button
                      onClick={() => {
                        setFile(report?.file);
                        setIsReportOpen(true);
                      }}
                      className="bg-blue-500 text-gray-50 px-4 rounded hover:bg-blue-600 py-1"
                    >
                      View Report
                    </button> */}
                    <a href={report?.file} target="_blank" className="bg-blue-500 text-gray-50 px-4 py-1 rounded  ">
                      Download Report
                    </a>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 whitespace-nowrap text-center flex justify-center gap-2 items-start">
                    {authenticate.role === "Assessor" ? (
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
                    ) : (
                      "-"
                    )}
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

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b p-4 bg-[#015289]">
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
              }}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values }) => (
                <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {/* Organization Dropdown */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
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
                      className="px-4 py-2 bg-[#015289] text-white rounded-md hover:bg-blue-700 transition"
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