import InputField from "@/components/InputField";
import ReportModal from "@/components/modal/ReportModal";
import NoDataFound from "@/components/NoDataFound";
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "@/context";
import { Reportvalidation } from "@/Validation/VulnerabililtyDataValidation";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEditAlt, BiUpload } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const { token } = useAuthContext();
  const [file, setFile] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchReportData = async () => {
    if (!token) return;

    let query = "";
    setLoading(true);
    try {
      const response = await AxiosHandler.get(query);
      setReportData(response.data?.data || []);
      setFilterData(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!values.report && !isEdit) {
      toast.error("Please upload a report file.");
      return;
    }

    const formData = new FormData();
    formData.append("Organization", values.Organization);
    formData.append("Type_Of_Assesment", values.Type_Of_Assesment);
    if (values.report) formData.append("report", values.report);

    setLoading(true);
    try {
      let response;
      if (isEdit) {
        response = await AxiosHandler.put(
          `/report/update-report/${editData._id}`,
          formData
        );
        toast.success("Report updated successfully!");
      } else {
        response = await AxiosHandler.post("/report/detailed-report", formData);
        toast.success("Report uploaded successfully!");
      }
      setIsModalOpen(false);
      resetForm();
      fetchReportData();
    } catch (error) {
      toast.error(`Failed to ${isEdit ? "update" : "upload"} the report.`);
      console.log(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
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
    <div className="p-6 md:p-8 bg-[#0f172a] min-h-screen text-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-white">
            Detailed Reports
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage, upload, and view all vulnerability assessment reports
          </p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsEdit(false);
            setIsModalOpen(true);
          }}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-gradient-to-r from-[#2563eb] to-[#1e40af] hover:from-[#1e40af] hover:to-[#2563eb] px-5 py-2 rounded-lg text-sm font-medium shadow-md transition duration-300"
        >
          <BiUpload className="w-4 h-4" />
          Upload Detailed Report
        </button>
      </div>

      {/* Data Table */}
      <div className="mt-4 bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-gray-700">
        {filterData.length < 1 ? (
          <NoDataFound />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#334155] text-gray-200 uppercase tracking-wider text-xs">
                <tr>
                  {[
                    "S.No",
                    "Date",
                    "Creator",
                    "Type Of Assessment",
                    "Organization",
                    "Report",
                    "Actions",
                  ].map((head, idx) => (
                    <th
                      key={idx}
                      className="px-5 py-3 text-center font-medium whitespace-nowrap"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filterData.map((report, index) => (
                  <tr
                    key={report?._id}
                    className="hover:bg-[#2a3447] transition duration-200"
                  >
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 text-center">
                      {new Date(report?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {report.creator?.full_name || "-"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {report.Type_Of_Assesment || "-"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {report.Organization?.Organization || "-"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={report?.file}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#2563eb] hover:bg-[#1e40af] text-white px-4 py-1.5 rounded-md shadow transition duration-300"
                      >
                        Download
                      </a>
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(report)}
                        className="text-blue-400 hover:text-blue-600 transition"
                        title="Edit"
                      >
                        <BiEditAlt className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(report._id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete"
                      >
                        <RiDeleteBinFill className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1e293b] w-full max-w-2xl rounded-xl shadow-lg overflow-hidden border border-gray-700">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-[#0f172a]">
              <h2 className="text-lg font-semibold text-white">
                {isEdit ? "Edit Detailed Report" : "Add Detailed Report"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEdit(false);
                  setEditData(null);
                }}
                className="text-gray-400 hover:text-gray-200 transition"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <Formik
              initialValues={{
                report: "",
                Type_Of_Assesment: isEdit ? editData.Type_Of_Assesment : "",
              }}
              validationSchema={Reportvalidation}
              onSubmit={handleSubmit}
            >
              {({
                setFieldValue,
                values,
                handleBlur,
                handleChange,
                errors,
                touched,
              }) => (
                <Form className="grid bg-modalBg grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  <InputField
                    label="Upload Report"
                    name="report"
                    type="file"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFieldValue("report", file);
                    }}
                    isError={errors.report && touched.report}
                    error={errors.report}
                  />

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Type of Assessment
                    </label>
                    <select
                      name="Type_Of_Assesment"
                      value={values.Type_Of_Assesment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 rounded-md bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-blue-600 text-gray-200 text-sm"
                    >
                      <option value="" disabled>
                        -- Select Type of Assessment --
                      </option>
                      {[
                        "Secure Code Scan",
                        "Dynamic Application",
                        "Web Application Penetration Testing",
                        "Api Penetration Testing",
                        "Infrastructure Vulnerability Scan",
                        "Infrastructure Penetration Testing",
                        "Mobile Application Penetration Test",
                        "Red Team exercise",
                        "Attack Simulation Exercise",
                        "Configuration Audits",
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {touched.Type_Of_Assesment && errors.Type_Of_Assesment && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.Type_Of_Assesment}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-gray-700">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setIsEdit(false);
                        setEditData(null);
                      }}
                      className="px-4 py-2 bg-gray-400 hover:bg-gray-600 text-gray-800 hover:text-white rounded-md transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded-md shadow transition"
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
