import React, { useEffect, useState } from "react";
import { FiAlertCircle, FiRefreshCcw } from "react-icons/fi";
import InputField from "@/components/InputField";
import { SchedulingAssessmentValidation } from "@/Validation/SchedulingAssessmentValidation";
import { useFormik } from "formik";
import { BiEditAlt, BiFilter, BiShield } from "react-icons/bi";
import {
  FaGlobe,
  FaLink,
  FaFolderOpen,
  FaUser,
  FaCalendar,
} from "react-icons/fa";
import { FaDatabase, FaFingerprint } from "react-icons/fa6";
import { RiDeleteBinFill, RiShieldCheckFill } from "react-icons/ri";
import { IoMdAirplane } from "react-icons/io";
import { MdClose, MdSchedule } from "react-icons/md";
import {
  useAuthContext,
  useScheduleAssessmentContext,
  useVulnerabililtyDataContext,
} from "@/context";
import Loader from "@/components/Loader/Loader";
import NoDataFound from "@/components/NoDataFound";

function SchedulingAssessmentPage() {
  const {
    loading,
    SchedulingAssesment,
    allAssesmentData,
    DeleteAssesment,
    UpdateAssesment,
    testerData,
    page,
    setPage,
    getOrgnizationData,
    datafetchCount,
    setdatafetchCount,
    GetOrgnization,
    TotalAssessments,
    TesterForAssessment,
    DashboardData,

    CreateNotifications,
  } = useScheduleAssessmentContext();

  const { authenticate, token } = useAuthContext();

  useEffect(() => {
    TotalAssessments(page);
    if (token && datafetchCount === 0) {
      TesterForAssessment();
      DashboardData();
      setdatafetchCount(1);
    }
  }, [token, page]);

  useEffect(() => {
    if (token && authenticate?.role === "Admin") {
      GetOrgnization();
    }
  }, [token, authenticate]);

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
      Orgenization_id:
        authenticate?.role === "ClientSME" ? authenticate?.owner : "",
      Type_Of_Assesment: "",
      Application_URL: "",
      Data_Classification: "",
      Select_Tester: "",
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
      CreateNotifications(
        value.Select_Tester,
        `Scheduling assesment assign to you`
      );
      resetForm();
    },
  });

  const handleEdit = (assessment) => {
    setValues(assessment);
    setSelectedAssessment(assessment);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] text-gray-black px-5 ">
      {/* Main Content */}
      {loading ? (
        <Loader />
      ) : (
        <main className="container mx-auto px-4 py-8">
          <section className="mb-8">
            {/* Form Section */}
            {(authenticate.role === "ClientSME" ||
              authenticate.role === "Admin") && (
              <div className=" flex  gap-6 mb-8 bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] p-4  rounded-lg ">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 w-full flex flex-col "
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <label
                        htmlFor="Type_Of_Assesment"
                        className="block text-sm font-medium text-gray-100 mb-2"
                      >
                        Type of Assesment
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
                            e.target.value ===
                              "Web Application Penetration Testing"
                          ) {
                            setIsOpen(true);
                          }
                        }}
                        className="w-full px-4 py-3 rounded-md border text-gray-300 bg-gray-600 border-gray-500 focus:ring-2 focus:ring-gray-500 text-sm focus:border-transparent outline-none transition"
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
                      {touched.Type_Of_Assesment &&
                        errors.Type_Of_Assesment && (
                          <p className="text-red-700 text-xs">
                            {" "}
                            {errors.Type_Of_Assesment}
                          </p>
                        )}
                    </div>

                    <div>
                      <label
                        htmlFor="Data_Classification"
                        className="block text-sm font-medium text-gray-200 mb-2"
                      >
                        Data Classification
                      </label>
                      <select
                        name="Data_Classification"
                        value={values.Data_Classification}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border text-gray-300 bg-gray-600 border-gray-500 focus:ring-2 focus:ring-gray-500 text-sm focus:border-transparent outline-none transition"
                        id="Data_Classification"
                      >
                        <option value="" disabled>
                          {" "}
                          -- Select Data Classification --{" "}
                        </option>
                        <option value={"Restricted"}>Restricted</option>
                        <option value={"Confidential"}>Confidential</option>
                        <option value={"Internal"}>Internal</option>
                        <option value={"Public"}>Public</option>
                      </select>
                      {touched.Data_Classification &&
                        errors.Data_Classification && (
                          <p className="text-red-700 text-xs">
                            {" "}
                            {errors.Data_Classification}
                          </p>
                        )}
                    </div>
                    <div>
                      <label
                        htmlFor="MFA_Enabled"
                        className="block text-sm font-medium text-gray-200 mb-2"
                      >
                        MFA Enabled
                      </label>
                      <select
                        name="MFA_Enabled"
                        value={values.MFA_Enabled}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border text-gray-300 bg-gray-600 border-gray-500 focus:ring-2 focus:ring-gray-500 text-sm focus:border-transparent outline-none transition"
                        id="MFA_Enabled"
                      >
                        <option value="" disabled>
                          {" "}
                          -- Select MFA --{" "}
                        </option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                      {touched.MFA_Enabled && errors.MFA_Enabled && (
                        <p className="text-red-700 text-xs">
                          {" "}
                          {errors.MFA_Enabled}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="Select_Tester"
                        className="block text-sm font-medium text-gray-200 mb-2"
                      >
                        Select Tester
                      </label>
                      <select
                        name="Select_Tester"
                        value={values.Select_Tester}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border text-gray-300 bg-gray-600 border-gray-500 focus:ring-2 focus:ring-gray-500 text-sm focus:border-transparent outline-none transition"
                        id="Select_Tester"
                      >
                        <option value="" disabled>
                          {" "}
                          -- Select Tester --{" "}
                        </option>

                        {testerData
                          ?.filter((itm) => itm.deactivate)
                          .map((itm, idx) => (
                            <option key={idx} value={itm._id}>
                              {itm.full_name}
                            </option>
                          ))}
                      </select>
                      {touched.Select_Tester && errors.Select_Tester && (
                        <p className="text-red-700 text-xs">
                          {" "}
                          {errors.Select_Tester}
                        </p>
                      )}
                    </div>
                    {authenticate.role === "Admin" && (
                      <div>
                        <label
                          htmlFor="Select_Org"
                          className="block text-sm font-medium text-gray-200 mb-2"
                        >
                          Select Orgnization
                        </label>
                        <select
                          name="Orgenization_id"
                          value={values.Orgenization_id}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-md border text-gray-300 bg-gray-600 border-gray-500 focus:ring-2 focus:ring-gray-500 text-sm focus:border-transparent outline-none transition"
                          id="Select_Org"
                        >
                          <option value="" disabled>
                            {" "}
                            -- Select Orgnization --{" "}
                          </option>
                          {getOrgnizationData?.map((itm, idx) => (
                            <option key={idx} value={itm._id}>
                              {itm.Organization}
                            </option>
                          ))}
                        </select>
                        {touched.Orgenization_id && errors.Orgenization_id && (
                          <p className="text-red-700 text-xs">
                            {" "}
                            {errors.Orgenization_id}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <InputField
                        label={"Prefred Task Start Date"}
                        type={"date"}
                        showPassword={false}
                        value={values.task_start}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your Application URL"
                        name="task_start"
                      />
                      {touched.task_start && errors.task_start && (
                        <p className="text-red-700 text-xs">
                          {" "}
                          {errors.task_start}
                        </p>
                      )}
                    </div>
                    <div>
                      <InputField
                        label={"Prefred Task End Date"}
                        type={"date"}
                        showPassword={false}
                        value={values.task_end}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your Application URL"
                        name="task_end"
                      />
                      {touched.task_end && errors.task_end && (
                        <p className="text-red-700 text-xs">
                          {" "}
                          {errors.task_end}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="lg:w-[20%] bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white   py-2  rounded-lg hover:bg-blue-500 transition duration-200"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
                <div className="bg-[#0c121b] rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
                  {/* Header */}
                  <div className="flex justify-between items-center border-b p-4 bg-[#212224]">
                    <h2 className="text-lg font-semibold bg=[#212224] text-gray-200">
                      {"Enter Application URL"}
                    </h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-100 hover:text-gray-200 transition"
                    >
                      <MdClose className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="p-10">
                    <div>
                      <InputField
                        label={"Application URL"}
                        type={"text"}
                        showPassword={false}
                        icon={FaLink}
                        value={values.Application_URL}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your Application URL"
                        name="Application_URL"
                      />
                      {touched.Application_URL && errors.Application_URL && (
                        <p className="text-red-700 text-xs">
                          {" "}
                          {errors.Application_URL}
                        </p>
                      )}
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 border-t pt-4">
                      <button
                          type="button"
						  onClick={() => setIsUpdateModalOpen(false)}
						  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        type="submit"
                        onSubmit={handleSubmit}
                        className="px-4 py-2 bg-[#0d273a] text-white rounded-md hover:bg-gray-700 transition"
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
                <div className="bg-[#0c121b] rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
                  {/* Header */}
                  <div className="flex justify-between items-center border-b text-white p-4 bg-[#212224]">
                    <h2 className="text-lg font-semibold text-white">
                      {"Upload Code File"}
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-100 hover:text-gray-200 transition"
                    >
                      <MdClose className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="p-10 ">
                    <div className="flex justify-center  flex-col ">
                      <label htmlFor="codeFileUpLoad">Upload Code File *</label>
                      <input
                        type="file"
                        id="codeFileUpLoad"
                        onChange={(e) => {
                          setFile(e.target?.files[0]);

                          setFieldValue("code_Upload", file);
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      />

                      {touched.code_Upload && errors.code_Upload && (
                        <p className="text-red-700 text-xs">
                          {" "}
                          {errors.code_Upload}
                        </p>
                      )}
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 border-t pt-4">
                      <button
                        type="button"
                        onClick={() => setIsUpdateModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        onSubmit={handleSubmit}
                        className="px-4 py-2 bg-[#0d273a] text-white rounded-md hover:bg-gray-700 transition"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isUpdateModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
                <div className="bg-[#0c121b] rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
                  {/* Header */}
                  <div className="flex justify-between items-center border-b p-4 bg-[#212224]">
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
                          <div>
                            <label
                              htmlFor="Type_Of_Assesment"
                              className="block text-sm font-medium text-gray-300  mb-2"
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
                                  e.target.value ===
                                    "Web Application Penetration Testing"
                                ) {
                                  setIsOpen(true);
                                }
                              }}
                              className="w-full px-4 bg-gray-800 text-white py-3 rounded-lg border border-gray-800 focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition"
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

                              <option
                                value={"Web Application Penetration Testing"}
                              >
                                Web Application Penetration Testing
                              </option>

                              <option value={"Api Penetration Testing"}>
                                Api Penetration Testing
                              </option>

                              <option
                                value={"Infrastructure Vulnerability Scan"}
                              >
                                Infrastructure Vulnerability Scan
                              </option>

                              <option
                                value={"Infrastructure Penetration Testing"}
                              >
                                Infrastructure Penetration Testing
                              </option>
                              <option
                                value={"Mobile Application Penetration Test"}
                              >
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
                            {touched.Type_Of_Assesment &&
                              errors.Type_Of_Assesment && (
                                <p className="text-red-700 text-xs">
                                  {" "}
                                  {errors.Type_Of_Assesment}
                                </p>
                              )}
                          </div>

                          <div>
                            <label
                              htmlFor="Data_Classification"
                              className="block text-sm font-medium text-gray-300 mb-2"
                            >
                              Data Classification
                            </label>
                            <select
                              name="Data_Classification"
                              value={values.Data_Classification}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg text-gray-300 bg-gray-800 border-gray-500 focus:ring-2 focus:ring-gray-300 focus:border-transparent outline-none transition"
                              id="Data_Classification"
                            >
                              <option value="" disabled>
                                {" "}
                                -- Select Data Classification --{" "}
                              </option>
                              <option value={"Restricted"}>Restricted</option>
                              <option value={"Confidential"}>
                                Confidential
                              </option>
                              <option value={"Internal"}>Internal</option>
                              <option value={"Public"}>Public</option>
                            </select>
                            {touched.Data_Classification &&
                              errors.Data_Classification && (
                                <p className="text-red-700 text-xs">
                                  {" "}
                                  {errors.Data_Classification}
                                </p>
                              )}
                          </div>
                          <div>
                            <label
                              htmlFor="MFA_Enabled"
                              className="block text-sm font-medium text-gray-300 mb-2"
                            >
                              MFA Enabled
                            </label>
                            <select
                              name="MFA_Enabled"
                              value={values.MFA_Enabled}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg text-gray-300 bg-gray-800 border-gray-500 focus:ring-2 focus:ring-gray-300 focus:border-transparent outline-none transition"
                              id="MFA_Enabled"
                            >
                              <option value="" disabled>
                                {" "}
                                -- Select MFA --{" "}
                              </option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                            {touched.MFA_Enabled && errors.MFA_Enabled && (
                              <p className="text-red-700 text-xs">
                                {" "}
                                {errors.MFA_Enabled}
                              </p>
                            )}
                          </div>
                          {/* <div>
									<label
										htmlFor="Select_Tester"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Select Tester
									</label>
									<select
										name='Select_Tester'
										value={values.Select_Tester}
										onChange={handleChange}
										className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
										id="Select_Tester">
										<option value="" disabled> -- Select  Tester -- </option>
										<option value={true}>Tester A</option>
										<option value={false}>Tester B</option>
									</select>
									{touched.Select_Tester && errors.Select_Tester && <p className='text-red-700 text-xs'> {errors.Select_Tester}</p>}
								</div> */}
                        </div>

                        <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 border-t pt-4">
                          <button
                            type="button"
                            onClick={() => setIsUpdateModalOpen(false)}
                            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-300 transition"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            onSubmit={handleSubmit}
                            className="px-4 py-2 bg-[#0d273a] text-white rounded-md hover:bg-gray-700 transition"
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

            {allAssesmentData.length < 1 ? (
              <NoDataFound />
            ) : (
              <div id="table" className="overflow-x-auto rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 rounded-xl bg-[#2d333b]">
                  <thead className="bg-gradient-to-bl from-[#333333] to-[#666666] rounded-xl ">
                    <tr>
                      {addFormHeaders.map((header, index) => (
                        <th
                          key={index}
                          className="px-4  text-left text-xs font-medium text-white uppercase"
                        >
                          {header === "createdAt"
                            ? "Created Date"
                            : header.replace(/_/g, " ")}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allAssesmentData?.map((item) => (
                      <tr key={item._id} className="hover:bg-[#53565c]">
                        {addFormHeaders.map((field, i) => (
                          <td
                            key={i}
                            className="px-4    whitespace-nowrap text-sm text-white"
                          >
                            {field === "code_Upload" ? (
                              <a
                                className="text-red-400/60"
                                href=""
                                download={"CodeFile"}
                              >
                                {item[field] === "" ? "" : "Download File"}
                              </a>
                            ) : field === "MFA_Enabled" ? (
                              item[field] === true ? (
                                "Yes"
                              ) : (
                                "No"
                              )
                            ) : (
                              item[field]
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-2 whitespace-nowrap flex justify-around gap-4">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600"
                          >
                            <BiEditAlt className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              DeleteAssesment(item._id);
                            }}
                            className="text-red-600"
                          >
                            <RiDeleteBinFill className="h-5 w-5" />
                          </button>
                          {/* <button onClick={() => handleAssignTask(item._id)} className="text-red-600">
												<BsPersonCheckFill className="h-5 w-5" />
											</button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex justify-between items-center my-16">
              <button
                className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white    border rounded-md ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span>
                Page {page}
                {/* of {totalPages} */}
              </span>
              <button
                className={`px-4 py-2 border rounded-md   bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white  `}
                disabled={allAssesmentData?.length < 10}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default SchedulingAssessmentPage;
