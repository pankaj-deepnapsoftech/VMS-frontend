import { Suspense, useEffect, useState } from "react";
import { useAuthContext, useExceptionContext, useVulnerabililtyDataContext } from "@/context";
import Loader from "@/components/Loader/Loader";
import { Eye, Pencil, Trash2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";


export function ApplicationData() {
  const { loading, GetApplicationData, allApplicationData, DeleteData } =
    useVulnerabililtyDataContext();
  const { token } = useAuthContext();
  const {ExceptionCreate} = useExceptionContext();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    compensatoryControl: "No",
    controlDetails: "",
    approvalFile: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (token) {
      GetApplicationData();
    }
  }, [token]);

  const filteredData = allApplicationData?.filter((item) => {
    const valuesToSearch = [
      item.scan_type,
      item.asset_type,
      item.threat_type,
      item.CVE,
      item.Exploit_Details?.toString(),
      item.exploit_complexity,
      item.Location,
      item.Title,
      item.Description,
      item.Severity,
      item.CVSS?.toString(),
      item.Reference_URL,
      item.BusinessApplication?.name,
      item.Proof_of_Concept?.toString(),
      item.creator?.company_name,
    ];

    return valuesToSearch
      .filter(Boolean)
      .some((field) =>
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gradient-custom min-h-screen p-4 rounded-lg text-white">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search across all fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-96 px-4 py-2 rounded-md bg-[#0F172A] text-white border border-[#334155] focus:outline-none"
            />
          </div>

          <div className="overflow-x-auto custom-scrollbar rounded-lg">
            <table className="min-w-[1400px] text-sm text-left">
              <thead className="bg-[#1E293B] text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-3">Scan Type</th>
                  <th className="px-4 py-3">Asset Type</th>
                  <th className="px-4 py-3">Threat Type</th>
                  <th className="px-4 py-3">CVE</th>
                  <th className="px-4 py-3">Exploit Details</th>
                  <th className="px-4 py-3">Exploit Complexity</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">CVSS</th>
                  <th className="px-4 py-3">Reference URL</th>
                  <th className="px-4 py-3">Asset</th>
                  <th className="px-4 py-3">Proof of Concept</th>
                  <th className="px-4 py-3">Tenant</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-[#0F172A] border-t border-slate-700">
                {Array.isArray(filteredData) && filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-700 hover:bg-[#1E293B] transition"
                    >
                      <td className="px-4 py-3">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-3">{item.scan_type || "-"}</td>
                      <td className="px-4 py-3">{item.asset_type || "-"}</td>
                      <td className="px-4 py-3">{item.threat_type || "-"}</td>
                      <td className="px-4 py-3">{item.CVE || "-"}</td>
                      <td className="px-4 py-3">
                        {item.Exploit_Details?.length || 0}
                      </td>
                      <td className="px-4 py-3">
                        {item.exploit_complexity || "-"}
                      </td>
                      <td className="px-4 py-3">{item.Location || "-"}</td>
                      <td className="px-4 py-3">{item.Title || "-"}</td>
                      <td className="px-4 py-3">{item.Description || "-"}</td>
                      <td className="px-4 py-3">{item.Severity || "-"}</td>
                      <td className="px-4 py-3">{item.CVSS || "-"}</td>
                      <td className="px-4 py-3">{item.Reference_URL || "-"}</td>
                      <td className="px-4 py-3">
                        {item.BusinessApplication?.name || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {item.Proof_of_Concept?.length || 0}
                      </td>
                      <td className="px-4 py-3">
                        {item.creator?.company_name || "-"}
                      </td>
                      <td className="px-4 py-3 flex items-center mt-3 space-x-3">
                        <Pencil
                          onClick={() =>
                            navigate("/add-vulnerability-data", {
                              state: { data: item },
                            })
                          }
                          className="w-4 h-4 text-blue-400 cursor-pointer"
                        />
                        <Trash2
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              "Are you sure you want to delete this record?"
                            );
                            if (confirmDelete) {
                              DeleteData(item._id);
                            }
                          }}
                          className="w-4 h-4 text-red-500 cursor-pointer"
                        />
                        <User
                          className="w-4 h-4 text-green-500 cursor-pointer"
                          onClick={() => setIsModalOpen(true)}
                        />
                        <Eye className="w-4 h-4 text-lime-400 cursor-pointer" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="17" className="text-center py-4 text-gray-400">
                      No data found matching search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              className="bg-slate-800 border-slate-700 text-gray-400 hover:bg-slate-700 hover:text-white px-4 py-2 rounded-lg"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span className="text-gray-300">Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={filteredData.length !== 10}
              className="bg-slate-800 border-slate-700 text-gray-400 hover:bg-slate-700 hover:text-white px-4 py-2 rounded-lg"
            >
              Next
            </button>
          </div>

          {/* MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-[#0F172A] rounded-lg w-full max-w-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl text-gray-300 ml-40 font-bold">
                    Request Exception
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-white hover:text-gray-400 text-2xl"
                  >
                    &times;
                  </button>
                </div>

                <Formik
                  initialValues={{
                    startDate: "",
                    endDate: "",
                    reason: "",
                    compensatoryControl: "No",
                    controlDetails: "",
                    approvalFile: null,
                  }}
                  validationSchema={Yup.object().shape({
                    startDate: Yup.date()
                      .required("Start date is required")
                      .test(
                        "not-in-past",
                        "Start date cannot be in the past",
                        (value) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return value && new Date(value) >= today;
                        }
                      ),
                    endDate: Yup.date()
                      .required("End date is required")
                      .test(
                        "not-in-past",
                        "End date cannot be in the past",
                        (value) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return value && new Date(value) >= today;
                        }
                      )
                      .min(
                        Yup.ref("startDate"),
                        "End date must be same or after start date"
                      ),
                    reason: Yup.string().required("Reason is required"),
                    compensatoryControl: Yup.string().oneOf(["Yes", "No"]),
                    controlDetails: Yup.string().when("compensatoryControl", {
                      is: "Yes",
                      then: (schema) =>
                        schema.required("Control details required"),
                      otherwise: (schema) => schema.notRequired(),
                    }),
                    approvalFile: Yup.mixed().required(
                      "Approval attachment is required"
                    ),
                  })}
                  onSubmit={(values) => {
                    console.log("Form values:", values);
                    setIsModalOpen(false);
                  
                  }}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors,
                    touched,
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 text-white"
                    >
                      {/* Start Date */}
                      <div>
                        <label className="block font-medium">
                          Exception Start Date
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={values.startDate}
                          onChange={handleChange}
                          className="w-full border bg-input border-gray-300 rounded p-2 text-white"
                        />
                        {touched.startDate && errors.startDate && (
                          <p className="text-red-500 text-sm">
                            {errors.startDate}
                          </p>
                        )}
                      </div>

                      {/* End Date */}
                      <div>
                        <label className="block font-medium">
                          Exception End Date
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={values.endDate}
                          onChange={handleChange}
                          className="w-full border bg-input border-gray-300 rounded p-2 text-white"
                        />
                        {touched.endDate && errors.endDate && (
                          <p className="text-red-500 text-sm">
                            {errors.endDate}
                          </p>
                        )}
                      </div>

                      {/* Reason */}
                      <div>
                        <label className="block font-medium">Reason</label>
                        <input
                          type="text"
                          name="reason"
                          value={values.reason}
                          onChange={handleChange}
                          className="w-full border bg-input border-gray-300 rounded p-2 text-white"
                        />
                        {touched.reason && errors.reason && (
                          <p className="text-red-500 text-sm">
                            {errors.reason}
                          </p>
                        )}
                      </div>

                      {/* Compensatory Control - Radio */}
                      <div>
                        <label className="block font-medium mb-2">
                          Compensatory Control
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="compensatoryControl"
                              value="Yes"
                              checked={values.compensatoryControl === "Yes"}
                              onChange={handleChange}
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="compensatoryControl"
                              value="No"
                              checked={values.compensatoryControl === "No"}
                              onChange={handleChange}
                            />
                            No
                          </label>
                        </div>
                      </div>

                      {/* If Yes - Details */}
                      {values.compensatoryControl === "Yes" && (
                        <div>
                          <label className="block font-medium">Details</label>
                          <textarea
                            name="controlDetails"
                            value={values.controlDetails}
                            onChange={handleChange}
                            className="w-full border bg-input border-gray-300 rounded p-2 text-white"
                            rows={3}
                          />
                          {touched.controlDetails && errors.controlDetails && (
                            <p className="text-red-500 text-sm">
                              {errors.controlDetails}
                            </p>
                          )}
                        </div>
                      )}

                      {/* File Input */}
                      <div>
                        <label className="block font-medium mb-2">
                          Approval Attachment
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id="approvalFile"
                            name="approvalFile"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) =>
                              setFieldValue(
                                "approvalFile",
                                e.currentTarget.files[0]
                              )
                            }
                            className="absolute opacity-0 w-full h-full cursor-pointer"
                          />
                          <label
                            htmlFor="approvalFile"
                            className="w-full inline-block bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded cursor-pointer text-center"
                          >
                            {values.approvalFile
                              ? values.approvalFile.name
                              : "Choose file"}
                          </label>
                        </div>
                        {touched.approvalFile && errors.approvalFile && (
                          <p className="text-red-500 text-sm">
                            {errors.approvalFile}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <button
                        
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
      )}
    </Suspense>
  );
}
