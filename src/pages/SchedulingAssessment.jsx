/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { SchedulingAssessmentValidation } from "@/Validation/SchedulingAssessmentValidation";
import { useFormik } from "formik";
import { MdClose } from "react-icons/md";
import { useAuthContext, useScheduleAssessmentContext } from "@/context";
import { IoClose } from "react-icons/io5";
import { handleFileChange } from "@/utils/CheckFileType";
import { ImageUploader } from "@/utils/ImagesUploader";

function SchedulingAssessmentPage({ editable, setEditable }) {
  // all context api hooks
  const {
    SchedulingAssesment,
    UpdateAssesment,
    page,
    setdatafetchCount,
    TesterForAssessment,
    DashboardData,
  } = useScheduleAssessmentContext();

  const { token, tenant } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");
  const formData = new FormData();

  // all useStates
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    submitCount
  } = useFormik({
    initialValues: editable || {
      Tenant_id: "",
      Type_Of_Assesment: "",
      Application_URL: "",
      Data_Classification: "",
      MFA_Enabled: "",
      code_Upload: "",
      task_start: "",
      task_end: "",
    },
    enableReinitialize: true,
    validationSchema: SchedulingAssessmentValidation,
    onSubmit: (value) => {
      value = { ...value, Tenant_id: tenant ? tenant : editable?.Tenant_id };

      if (editable) {
        UpdateAssesment(editable._id, value);
        setEditable(null);
      } else {
        if (!tenant) {
          alert("Please Select Tenant first");
          return;
        }
        SchedulingAssesment(value);
      }

      resetForm();
    },
  });

  useEffect(() => {
    if (token) {
      TesterForAssessment();
      DashboardData();
      setdatafetchCount(1);
    }
  }, [token, page]);

  return (
    <div
      className={` ${
        editable && "fixed top-0 left-0 w-full z-50"
      } min-h-screen bg-gradient-to-br from-slate-900 via-blue-1000 to-slate-800 text-white px-6 py-8`}
    >
      {editable && (
        <div className="flex items-center justify-end w-full py-3 ">
          <IoClose
            onClick={() => setEditable(null)}
            className="h-10 w-10 hover:bg-gray-900 cursor-pointer rounded-md px-2 py-1 "
          />
        </div>
      )}
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}

        <div className="w-full mx-auto p-4 rounded-md shadow-sm bg-modalBg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Assessment Schedule
            </h1>
            <p className="text-slate-300">
              Configure and schedule your security assessment parameters
            </p>
          </div>

          {/* Form Box */}
          <div className="bg-gradient-to-br h-fit from-slate-800/40 to-blue-900/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Type of Assessment */}
                <div className="space-y-2">
                  <label
                    htmlFor="Type_Of_Assesment"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Type of Assessment{" "}
                    <span className="text-red-500 ml-1">*</span>
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
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    id="Type_Of_Assesment"
                  >
                    <option value="" disabled>
                      -- Select Type of Assessment --
                    </option>
                    <option value="Secure Code Scan">Secure Code Scan</option>
                    <option value="Dynamic Application">
                      Dynamic Application
                    </option>
                    <option value="Web Application Penetration Testing">
                      Web Application Penetration Testing
                    </option>
                    <option value="Api Penetration Testing">
                      API Penetration Testing
                    </option>
                    <option value="Infrastructure Vulnerability Scan">
                      Infrastructure Vulnerability Scan
                    </option>
                    <option value="Infrastructure Penetration Testing">
                      Infrastructure Penetration Testing
                    </option>
                    <option value="Mobile Application Penetration Test">
                      Mobile Application Penetration Test
                    </option>
                    <option value="Red Team exercise">Red Team exercise</option>
                    <option value="Attack Simulation Exercise">
                      Attack Simulation Exercise
                    </option>
                    <option value="Configuration Audits">
                      Configuration Audits
                    </option>
                  </select>
                  {(touched.Type_Of_Assesment || submitCount > 0) &&
                    errors.Type_Of_Assesment && (
                      <p className="text-red-400 text-sm">
                        {errors.Type_Of_Assesment}
                      </p>
                    )}
                </div>

                {/* Data Classification */}
                <div className="space-y-2">
                  <label
                    htmlFor="Data_Classification"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Data Classification{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="Data_Classification"
                    value={values.Data_Classification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    id="Data_Classification"
                  >
                    <option value="" disabled>
                      -- Select Data Classification --
                    </option>
                    <option value="Restricted">Restricted</option>
                    <option value="Confidential">Confidential</option>
                    <option value="Internal">Internal</option>
                    <option value="Public">Public</option>
                  </select>
                  {(touched.Data_Classification || submitCount > 0) &&
                    errors.Data_Classification && (
                      <p className="text-red-400 text-sm">
                        {errors.Data_Classification}
                      </p>
                    )}
                </div>

                {/* MFA Enabled */}
                <div className="space-y-2">
                  <label
                    htmlFor="MFA_Enabled"
                    className="block text-sm font-medium text-slate-200"
                  >
                    MFA Enabled <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="MFA_Enabled"
                    value={values.MFA_Enabled}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    id="MFA_Enabled"
                  >
                    <option value="" disabled>
                      -- Select MFA --
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {(touched.MFA_Enabled || submitCount > 0) &&
                    errors.MFA_Enabled && (
                      <p className="text-red-400 text-sm">
                        {errors.MFA_Enabled}
                      </p>
                    )}
                </div>

                {/* Preferred Task Start Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-200">
                    Preferred Task Start Date{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="Start_Date"
                    value={values.Start_Date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                  {(touched.Start_Date || submitCount > 0) &&
                    errors.Start_Date && (
                      <p className="text-red-400 text-sm">
                        {errors.Start_Date}
                      </p>
                    )}
                </div>

                {/* Preferred Task End Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-200">
                    Preferred Task End Date{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="End_Date"
                    value={values.End_Date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                  {(touched.End_Date || submitCount > 0) && errors.End_Date && (
                    <p className="text-red-400 text-sm">{errors.End_Date}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bottom-2 left-10 px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Submit Assessment Request
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Modals remain the same */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
              <div className="flex justify-between items-center border-b border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-white">
                  Enter Application URL
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition"
                >
                  <MdClose className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-200">
                    Application URL
                  </label>
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
                    <p className="text-red-400 text-sm">
                      {errors.Application_URL}
                    </p>
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
                <h2 className="text-xl font-semibold text-white">
                  Upload Code File
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white transition"
                >
                  <MdClose className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  <label
                    htmlFor="codeFileUpLoad"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Upload Code File *
                  </label>
                  <input
                    type="file"
                    id="codeFileUpLoad"
                    onChange={(e) => {
                      const file = handleFileChange(e.target.files[0]);
                      if (file) {
                        setFile(file);
                      } else {
                        e.target.value = "";
                      }
                    }}
                    accept=".pdf"
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
                    onClick={async () => {
                      const image = await ImageUploader(file);
                      console.log(image);
                      setFieldValue("code_Upload", image);
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SchedulingAssessmentPage;
