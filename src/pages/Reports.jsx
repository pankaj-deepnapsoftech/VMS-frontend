import InputField from "@/components/InputField";
import ReportModal from "@/components/modal/ReportModal";
import NoDataFound from "@/components/NoDataFound";
import { AxiosHandler } from "@/config/AxiosConfig";
import {
  useAuthContext,
  useMainReportContext,
  useScheduleAssessmentContext,
} from "@/context";
import { DeleteImage, Imageuploader, UpdateImage } from "@/utils/firebaseImageUploader";
import { EmptyFieldRemover } from "@/utils/RemoveEmptyField";
import { Reportvalidation } from "@/Validation/VulnerabililtyDataValidation";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BiEditAlt, BiUpload } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token, tenant } = useAuthContext();
  const [file, setFile] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const { getAllInProgress, allOption } = useScheduleAssessmentContext();

  const { GetAllReports, reportsData,uploadReports,DeleteReport,UpdateReport} = useMainReportContext();


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true)
    let file;

    if (values?.report && !editData) {
      file = await Imageuploader(values?.report);
    }else if(values?.report?.type && editData) {
      file = await UpdateImage(values?.report,editData?.report?.image_id)
    };




    let data = { ...values, file, creator: tenant };

    data = EmptyFieldRemover(data)


    if(editData){
      await UpdateReport(editData.id,data);
    }else {
      await uploadReports(data);
    }

    setEditData(null)

    resetForm();
    setSubmitting();
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleEdit = (report) => {
    setEditData({id:report._id,report:report.file,Type_Of_Assesment:report?.Type_Of_Assesment?._id,report_name:report?.report_name});
    setIsEdit(true);
    setIsModalOpen(true);
    getAllInProgress(report?.creator?._id);
  };

  useEffect(() => {
    if (token) {
      getAllInProgress(tenant);
      GetAllReports(tenant);
    }
  }, [token, tenant]);

  return (
    <div className="p-6 md:p-8 bg-[#0f172a] min-h-screen text-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-white">
            Upload Reports
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
      <div className="mt-6 bg-table rounded-2xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden">
        {!reportsData || reportsData.length === 0 ? (
          <NoDataFound />
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <table className="min-w-full text-sm text-gray-300">
              {/* Sticky Table Header */}
              <thead className="bg-gradient-to-r from-[#23314f] to-[#1c2740] text-gray-100 uppercase text-xs tracking-wider sticky top-0 z-10 shadow-md">
                <tr>
                  {[
                    "S.No",
                    "Report Name",
                    "Type Of Assessment",
                    "Report File",
                    "Actions",
                  ].map((head, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-4 text-center font-semibold whitespace-nowrap"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-700/70">
                {reportsData.map((report, index) => (
                  <tr
                    key={report?._id || index}
                    className="hover:bg-[#24314e] transition-colors duration-200 odd:bg-[#1b253f] even:bg-[#1e2943]"
                  >
                    <td className="px-6 py-3 text-center text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 text-center font-medium text-gray-200">
                      {report?.report_name || "-"}
                    </td>
                    <td className="px-6 py-3 text-center text-gray-400">
                      {report?.Type_Of_Assesment?.Type_Of_Assesment || "-"}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {report?.file ? (
                        <a
                          href={report.file?.image_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-1.5 rounded-lg shadow-md text-xs font-medium transition-all duration-200"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(report)}
                        className="p-2 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-all"
                        title="Edit"
                      >
                        <BiEditAlt className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 transition-all"
                        title="Delete"
                        onClick={()=>{DeleteReport(report._id);DeleteImage(report?.file?.image_id)}}
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
              initialValues={editData || {
                report: "",
                Type_Of_Assesment:"",
                report_name: "",
              }}
              validationSchema={Reportvalidation}
              enableReinitialize={true}
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
                    label="Report Name"
                    name="report_name"
                    placeholder="Report name"
                    type="text"
                    value={values.report_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isError={errors.report_name && touched.report_name}
                    error={errors.report_name}
                  />

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
                      {allOption.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type?.Type_Of_Assesment}
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
                      disabled={loading}
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded-md shadow transition"
                    >
                      {isEdit ? "Update" : loading ? "saving..." :  "Save"}
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
