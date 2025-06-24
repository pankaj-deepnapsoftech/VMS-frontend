import  { useEffect, useState } from "react";
import { SchedulingAssessmentValidation } from "@/Validation/SchedulingAssessmentValidation";
import { useFormik } from "formik";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useAuthContext, useDataContext, useScheduleAssessmentContext } from "@/context";
import Loader from "@/components/Loader/Loader";
import NoDataFound from "@/components/NoDataFound";


function SchedulingAssessmentPage() {
  const {
    loading,
    SchedulingAssesment,
    allAssesmentData,
    DeleteAssesment,
    UpdateAssesment,
    page,
    setPage,
    datafetchCount,
    setdatafetchCount,
    TotalAssessments,
    TesterForAssessment,
    DashboardData,
    CreateNotifications,
  } = useScheduleAssessmentContext();

  const { authenticate, token } = useAuthContext();
  const { TenantAllData } = useDataContext();

  useEffect(() => {
    TotalAssessments(page);
    if (token && datafetchCount === 0) {
      TesterForAssessment();
      DashboardData();
      setdatafetchCount(1);
    }
  }, [token, page]);

  // Extract headers dynamically for table display
  const tableHeaders =
    allAssesmentData?.length > 0
      ? Object.keys(allAssesmentData[0]).filter(
        (key) => key !== "_id" && key !== "__v" && key !== "updatedAt"
      )
      : [];

  // Headers for the Add form (show all fields)
  const addFormHeaders = tableHeaders.filter(
    (key) => key !== "createdAt" && key !== "updatedAt" && key !== "creator_id"
  );

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");
  const formData = new FormData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      Tenant_id: "",
      Type_Of_Assesment: "",
      Application_URL: "",
      Data_Classification: "",
      MFA_Enabled: "",
      code_Upload: "",
      task_start: "",
      task_end: "",
    },
    validationSchema: SchedulingAssessmentValidation,
    onSubmit: (value) => {
      Object.entries(value).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (selectedAssessment) {
        UpdateAssesment(selectedAssessment._id, formData);
        setSelectedAssessment(null);
        setIsUpdateModalOpen(false);
      } else {
        SchedulingAssesment(formData);
      }

      resetForm();
    },
  });

  const handleEdit = (assessment) => {
    setValues(assessment);
    setSelectedAssessment(assessment);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-1000 to-slate-800 text-white px-6 py-8">
      {/* Main Content */}
      {loading ? (
        <Loader />
      ) : (
        <main className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Schedule Assessment</h1>
            <p className="text-slate-300">Configure and schedule your security assessment parameters</p>
          </div>

          {/* Form Section - Contained in a box */}
          <div className="bg-gradient-to-br from-slate-800/40 to-blue-900/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Type of Assessment */}
                <div className="space-y-2">
                  <label
                    htmlFor="Type_Of_Assesment"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Type of Assessment
                  </label>
                  <select
                    name="Type_Of_Assesment"
                    value={values.Type_Of_Assesment}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value === "Secure Code Scan") {
                        setIsModalOpen(true);
                      }
                      if (
                        e.target.value === "Dynamic Application" ||
                        e.target.value === "Web Application Penetration Testing"
                      ) {
                        setIsOpen(true);
                      }
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    id="Type_Of_Assesment"
                  >
                    <option value="" disabled>-- Select Type of Assessment --</option>
                    <option value="Secure Code Scan">Secure Code Scan</option>
                    <option value="Dynamic Application">Dynamic Application</option>
                    <option value="Web Application Penetration Testing">Web Application Penetration Testing</option>
                    <option value="Api Penetration Testing">Api Penetration Testing</option>
                    <option value="Infrastructure Vulnerability Scan">Infrastructure Vulnerability Scan</option>
                    <option value="Infrastructure Penetration Testing">Infrastructure Penetration Testing</option>
                    <option value="Mobile Application Penetration Test">Mobile Application Penetration Test</option>
                    <option value="Red Team exercise">Red Team exercise</option>
                    <option value="Attack Simulation Exercise">Attack Simulation Exercise</option>
                    <option value="Configuration Audits">Configuration Audits</option>
                  </select>
                  {touched.Type_Of_Assesment && errors.Type_Of_Assesment && (
                    <p className="text-red-400 text-sm">{errors.Type_Of_Assesment}</p>
                  )}
                </div>

                {/* Data Classification */}
                <div className="space-y-2">
                  <label
                    htmlFor="Data_Classification"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Data Classification
                  </label>
                  <select
                    name="Data_Classification"
                    value={values.Data_Classification}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    id="Data_Classification"
                  >
                    <option value="" disabled>-- Select Data Classification --</option>
                    <option value="Restricted">Restricted</option>
                    <option value="Confidential">Confidential</option>
                    <option value="Internal">Internal</option>
                    <option value="Public">Public</option>
                  </select>
                  {touched.Data_Classification && errors.Data_Classification && (
                    <p className="text-red-400 text-sm">{errors.Data_Classification}</p>
                  )}
                </div>

                {/* MFA Enabled */}
                <div className="space-y-2">
                  <label
                    htmlFor="MFA_Enabled"
                    className="block text-sm font-medium text-slate-200"
                  >
                    MFA Enabled
                  </label>
                  <select
                    name="MFA_Enabled"
                    value={values.MFA_Enabled}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    id="MFA_Enabled"
                  >
                    <option value="" disabled>-- Select MFA --</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                  {touched.MFA_Enabled && errors.MFA_Enabled && (
                    <p className="text-red-400 text-sm">{errors.MFA_Enabled}</p>
                  )}
                </div>

                {/* Select Tenant */}
                <div className="space-y-2">
                  <label
                    htmlFor="Select_Org"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Select Tenant
                  </label>
                  <select
                    name="Tenant_id"
                    value={values.Tenant_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    id="Select_Org"
                  >
                    <option value="" disabled>-- Select Tenant --</option>
                    {TenantAllData?.map((itm, idx) => (
                      <option key={idx} value={itm.value}>
                        {itm.label}
                      </option>
                    ))}
                  </select>
                  {touched.Orgenization_id && errors.Orgenization_id && (
                    <p className="text-red-400 text-sm">{errors.Orgenization_id}</p>
                  )}
                </div>

                {/* Preferred Task Start Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-200">
                    Preferred Task Start Date
                  </label>
                  <input
                    type="date"
                    name="task_start"
                    value={values.task_start}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                  {touched.task_start && errors.task_start && (
                    <p className="text-red-400 text-sm">{errors.task_start}</p>
                  )}
                </div>

                {/* Preferred Task End Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-200">
                    Preferred Task End Date
                  </label>
                  <input
                    type="date"
                    name="task_end"
                    value={values.task_end}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full px-4 py-3 react-datepicker__calendar-icon rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                  {touched.task_end && errors.task_end && (
                    <p className="text-red-400 text-sm">{errors.task_end}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="absolute bottom-2 left-10 px-8 mb-1 mt-2 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Submit Assessment Request
                </button>
              </div>
            </form>
          </div>

          {/* Modals remain the same */}
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
              <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
                <div className="flex justify-between items-center border-b border-slate-700 p-6">
                  <h2 className="text-xl font-semibold text-white">Enter Application URL</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-white transition"
                  >
                    <MdClose className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-200">Application URL</label>
                    <input
                      type="text"
                      name="Application_URL"
                      value={values.Application_URL}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter your Application URL"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    />
                    {touched.Application_URL && errors.Application_URL && (
                      <p className="text-red-400 text-sm">{errors.Application_URL}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-700">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
              <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
                <div className="flex justify-between items-center border-b border-slate-700 p-6">
                  <h2 className="text-xl font-semibold text-white">Upload Code File</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-slate-400 hover:text-white transition"
                  >
                    <MdClose className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    <label htmlFor="codeFileUpLoad" className="block text-sm font-medium text-slate-200">
                      Upload Code File *
                    </label>
                    <input
                      type="file"
                      id="codeFileUpLoad"
                      onChange={(e) => {
                        setFile(e.target?.files[0]);
                        setFieldValue("code_Upload", file);
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {touched.code_Upload && errors.code_Upload && (
                      <p className="text-red-400 text-sm">{errors.code_Upload}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-700">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Update Modal - keeping existing structure but with new styling */}
          {isUpdateModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
              <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700">
                <div className="flex justify-between items-center border-b border-slate-700 p-6">
                  <h2 className="text-xl font-semibold text-white">Update Details</h2>
                  <button
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="text-slate-400 hover:text-white transition"
                  >
                    <MdClose className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Same fields as main form but with updated styling */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-200">Type of Assessment</label>
                        <select
                          name="Type_Of_Assesment"
                          value={values.Type_Of_Assesment}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                        >
                          <option value="" disabled>-- Select Type of Assessment --</option>
                          <option value="Secure Code Scan">Secure Code Scan</option>
                          <option value="Dynamic Application">Dynamic Application</option>
                          <option value="Web Application Penetration Testing">Web Application Penetration Testing</option>
                          <option value="Api Penetration Testing">Api Penetration Testing</option>
                          <option value="Infrastructure Vulnerability Scan">Infrastructure Vulnerability Scan</option>
                          <option value="Infrastructure Penetration Testing">Infrastructure Penetration Testing</option>
                          <option value="Mobile Application Penetration Test">Mobile Application Penetration Test</option>
                          <option value="Red Team exercise">Red Team exercise</option>
                          <option value="Attack Simulation Exercise">Attack Simulation Exercise</option>
                          <option value="Configuration Audits">Configuration Audits</option>
                        </select>
                        {touched.Type_Of_Assesment && errors.Type_Of_Assesment && (
                          <p className="text-red-400 text-sm">{errors.Type_Of_Assesment}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-200">Data Classification</label>
                        <select
                          name="Data_Classification"
                          value={values.Data_Classification}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                        >
                          <option value="" disabled>-- Select Data Classification --</option>
                          <option value="Restricted">Restricted</option>
                          <option value="Confidential">Confidential</option>
                          <option value="Internal">Internal</option>
                          <option value="Public">Public</option>
                        </select>
                        {touched.Data_Classification && errors.Data_Classification && (
                          <p className="text-red-400 text-sm">{errors.Data_Classification}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-200">MFA Enabled</label>
                        <select
                          name="MFA_Enabled"
                          value={values.MFA_Enabled}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                        >
                          <option value="" disabled>-- Select MFA --</option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                        {touched.MFA_Enabled && errors.MFA_Enabled && (
                          <p className="text-red-400 text-sm">{errors.MFA_Enabled}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                      <button
                        type="button"
                        onClick={() => setIsUpdateModalOpen(false)}
                        className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Table Section - Outside the form container */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
            {allAssesmentData.length < 1 ? (
              <div className="p-12">
                <NoDataFound />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                  <thead className="bg-gradient-to-r from-slate-800 to-slate-700">
                    <tr>
                      {addFormHeaders.map((header, index) => (
                        <th
                          key={index}
                          className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                        >
                          {header === "createdAt"
                            ? "Created Date"
                            : header.replace(/_/g, " ")}
                        </th>
                      ))}
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {allAssesmentData?.map((item, index) => (
                      <tr key={item._id} className={`hover:bg-slate-700/50 transition-colors ${index % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-800/50'}`}>
                        {addFormHeaders.map((field, i) => (
                          <td
                            key={i}
                            className="px-6 py-4 whitespace-nowrap text-sm text-slate-300"
                          >
                            {field === "code_Upload" ? (
                              <a
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                href=""
                                download={"CodeFile"}
                              >
                                {item[field] === "" ? "No file" : "Download File"}
                              </a>
                            ) : field === "MFA_Enabled" ? (
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                item[field] === true 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {item[field] === true ? "Yes" : "No"}
                              </span>
                            ) : (
                              item[field]
                            )}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <BiEditAlt className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => DeleteAssesment(item._id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <RiDeleteBinFill className="h-5 w-5" />
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
            <div className="flex justify-between items-center px-6 py-4 bg-slate-800/30 border-t border-slate-700">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  page === 1
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-slate-600 text-white hover:bg-slate-500"
                }`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span className="text-slate-300 font-medium">
                Page {page}
              </span>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  allAssesmentData?.length < 10
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-slate-600 text-white hover:bg-slate-500"
                }`}
                disabled={allAssesmentData?.length < 10}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default SchedulingAssessmentPage;