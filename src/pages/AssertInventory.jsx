import { useEffect, useState } from "react";
import { X, Boxes } from "lucide-react";
import { BiPlus } from "react-icons/bi";
import { useFormik } from "formik";
import { InfraAssetvalidation } from "@/Validation/InfrastructureAssetvalidation";
import {
  useAuthContext,
  useInfraAssetContext,
  useTagsContext,
} from "@/context";
import * as XLSX from "xlsx";
import { useLocation } from "react-router-dom";
import CustomSelection from "@/components/customSelection/CustomSelection";
import Pagination from "./Pagination";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import NoDataFound from "@/components/NoDataFound";
import Access from "@/components/role/Access";
import { isCreateAccess, isDeleteAccess, isHaveAction, isModifyAccess, isViewAccess } from "@/utils/pageAccess";

export default function TenantDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tenant, setTenant] = useState("");
  const location = useLocation();

  const [model, setmodel] = useState(false);
  const { token, authenticate } = useAuthContext();


  console.log("authenticate", authenticate.allowed_path)

  console.log(location)






  const { AllTags } = useTagsContext();

  const {
    CreateInfraAsset,
    GetInfraAsset,
    infraAssetdata,
    DeleteInfraAsset,
    UpdateInfraAsset,
    CreateBulkInfraAsset,
  } = useInfraAssetContext();
  const [editable, setEditable] = useState(null);

  const filteredTenants = infraAssetdata.filter((tenant) =>
    tenant.asset_hostname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: editable || {
      asset_hostname: "",
      modify_criticality: "",
      asset_ip: "",
      asset_class: "",
      service_role: null,
      exposure: "",
      hosting: "",
      data_sensitivity: "",
    },
    validationSchema: InfraAssetvalidation,
    enableReinitialize: true,
    onSubmit: (value) => {
      if (!tenant && !editable) {
        return alert("Please select a tenant");
      }
      if (editable) {
        UpdateInfraAsset(editable._id, value);
      } else {
        CreateInfraAsset({ ...value, creator: tenant });
      }
      setmodel(false);
      handleReset();
    },
  });

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files[0]);
  };

  const handleDownload = () => {
    const data = [
      {
        asset_hostname: "",
        modify_criticality: "",
        asset_ip: "",
      },
    ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vulnerabilities");
    XLSX.writeFile(workbook, "infraStructure-asset.xlsx");
  };

  useEffect(() => {
    if (token) {
      GetInfraAsset(currentPage, tenant);
    }
  }, [currentPage, tenant]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTenant(params.get("tenant") || "");
  }, [location.search]);

   if (isViewAccess(authenticate,location)) {
        return <Access />
    }

  return (
    <>
      <div className="min-h-screen bg-gradient-custom text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="w-full px-6  my-5 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                All InfraStructure Asset
              </h2>
              <span className="text-subtext text-sm">
                Manage your infraStructure asset
              </span>
            </div>

            {/* Buttons */}
           {isCreateAccess() && <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-button hover:bg-hoverbutton rounded-md text-white font-medium flex items-center justify-center gap-2"
              >
                <BiPlus className="h-6 w-6" />
                Bulk Upload
              </button>

              <button
                onClick={() => {
                  setmodel(true);
                  setEditable(null);
                }}
                className="px-4 py-2 bg-button hover:bg-hoverbutton rounded-md text-white font-medium flex items-center justify-center gap-2"
              >
                <BiPlus className="h-6 w-6" />
                Infrastructure Asset
              </button>
            </div>}
          </div>

          {/*table */}

          <div className="w-full   p-6">
            <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-700 relative">
                <div className="relative">
                  <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
                  <input
                    type="search"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-input backdrop-blur-md py-2 w-1/3 text-white ps-7 pe-3 rounded-md "
                  />
                </div>
              </div>

              {/* Table */}
              {filteredTenants?.length < 1 ? (
                <NoDataFound />
              ) : (
                <div className="overflow-x-auto custom-scrollbar w-full">
                  <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
                    <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
                      <tr>
                        {[
                          "S No.",
                          "Asset Hostname",
                          "Asset IP",
                          "Modify Criticality",
                          "Asset Class",
                          "Exposure",
                          "Hosting",
                          "Data Sensitivity",
                          "Service Role",
                          isHaveAction() && "Actions",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-4 py-3 border-b border-gray-600 font-medium"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredTenants.map((tenant, index) => (
                        <tr
                          key={tenant._id}
                          className="hover:bg-[#2d2f32] transition-colors duration-150 whitespace-nowrap"
                        >
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3 ">
                            {tenant.asset_hostname || "-"}
                          </td>
                          <td className="px-4 py-3 ">
                            {tenant.asset_ip || "-"}
                          </td>
                          <td className="px-4 py-3">
                            {tenant.modify_criticality || "-"}
                          </td>
                          <td className="px-4 py-3">
                            {tenant.asset_class || "0"}
                          </td>
                          <td className="px-4 py-3">
                            {tenant.exposure || "0"}{" "}
                          </td>
                          <td className="px-4 py-3">
                            {tenant.hosting || "0"}{" "}
                          </td>
                          <td className="px-4 py-3">
                            {tenant?.data_sensitivity?.tag_score || "0"}{" "}
                          </td>

                          <td className="py-4 px-6 text-white flex flex-wrap gap-2 w-40">
                            {tenant?.service_role?.length > 0
                              ? tenant?.service_role?.map((item) => (
                                <p
                                  key={item._id}
                                  style={{ backgroundColor: item.tag_color }}
                                  className="px-3 py-1 rounded-full"
                                >
                                  {item.tag_name}
                                </p>
                              ))
                              : "-"}
                          </td>

                          <td className="px-4 py-3 space-x-4">
                            {isDeleteAccess() && <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this item?"
                                  )
                                ) {
                                  DeleteInfraAsset(tenant._id);
                                }
                              }}
                              title="Delete"
                              className="text-subtext hover:text-subTextHover"
                            >
                              <FaRegTrashAlt className="w-5 h-5" />
                            </button>}

                           {isModifyAccess() && <button
                              onClick={() => {
                                setEditable(tenant);
                                setmodel(!model);
                              }}
                              title="Edit"
                              className="text-subtext hover:text-blue-700"
                            >
                              <RiEdit2Line className="w-5 h-5" />
                            </button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Footer */}
              <Pagination
                page={currentPage}
                setPage={setCurrentPage}
                hasNextPage={filteredTenants.length === 10}
                total={filteredTenants.length}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-lg animate-fade-in">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
              <h2 className="text-xl font-semibold text-white">
                📥 Bulk Upload Files
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="text-white flex justify-between py-3">
              <h3>Get sample excel file </h3>
              <span
                onClick={handleDownload}
                className="font-normal text-blue-400 cursor-pointer"
              >
                Download Sample File
              </span>
            </div>

            {/* File Input */}
            <div className="space-y-3">
              <label className="block text-sm text-slate-300">
                Select multiple files:
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-300 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
              />
            </div>

            {/* Modal Footer Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md text-sm bg-slate-700 text-gray-300 hover:bg-slate-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!tenant) {
                    return alert("Please select a tenant");
                  }
                  const formData = new FormData();
                  console.log(selectedFiles);
                  formData.append("excel", selectedFiles);
                  formData.append("creator", tenant);
                  CreateBulkInfraAsset(formData);
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {model && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-md mx-auto h-[80%] custom-scrollbar overflow-y-scroll">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Boxes className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-medium text-white">
                  Infrastructure Asset
                </span>
                <button
                  onClick={() => setmodel(!model)}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Integration Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Asset IP
                  </label>
                  <input
                    type="text"
                    placeholder="What is your Asset IP?"
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                    name="asset_ip"
                    value={values.asset_ip}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.asset_ip && touched.asset_ip && (
                    <p className="text-red-400">{errors.asset_ip}</p>
                  )}
                </div>

                {/* API Key */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Asset Hostname
                  </label>
                  <input
                    type="text"
                    placeholder="What is your title?"
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                    name="asset_hostname"
                    value={values.asset_hostname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.asset_hostname && touched.asset_hostname && (
                    <p className="text-red-400">{errors.asset_hostname}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Modify Criticality
                  </label>
                  <select
                    type="text"
                    placeholder="What is your title?"
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                    name="modify_criticality"
                    value={values.modify_criticality}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option value={""} disabled selected>
                      select value
                    </option>
                    <option value={"Critical"}>Critical</option>
                    <option value={"High"}>High</option>
                    <option value={"Medium"}>Medium</option>
                    <option value={"Low"}>Low</option>
                  </select>
                  {errors.modify_criticality && touched.modify_criticality && (
                    <p className="text-red-400">{errors.modify_criticality}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Asset class
                  </label>
                  <select
                    type="text"
                    placeholder="What is your title?"
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                    name="asset_class"
                    value={values.asset_class}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option value={""} disabled selected>
                      select value
                    </option>
                    <option value={3}>Endpoint</option>
                    <option value={6}>Server</option>
                  </select>
                  {errors.asset_class && touched.asset_class && (
                    <p className="text-red-400">{errors.asset_class}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Exposure
                  </label>
                  <select
                    type="text"
                    placeholder="What is your title?"
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                    name="exposure"
                    value={values.exposure}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option value={""} disabled selected>
                      select value
                    </option>
                    <option value={0}>Does not have Internet Access</option>
                    <option value={6}>Has Internet Access</option>
                  </select>
                  {errors.exposure && touched.exposure && (
                    <p className="text-red-400">{errors.exposure}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Data Sensitivity
                  </label>
                  <select
                    type="text"
                    placeholder="What is your title?"
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                    name="data_sensitivity"
                    value={values.data_sensitivity}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option value={""} disabled selected>
                      select value
                    </option>
                    {AllTags.length > 0 &&
                      AllTags.filter(
                        (item) => item.related === "Data Sensitivity"
                      ).map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.tag_name}
                        </option>
                      ))}
                  </select>
                  {errors.data_sensitivity && touched.data_sensitivity && (
                    <p className="text-red-400">{errors.data_sensitivity}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Hosting
                  </label>
                  <select
                    type="text"
                    placeholder="What is your title?"
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                    name="hosting"
                    value={values.hosting}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option value={""} disabled selected>
                      select value
                    </option>
                    <option value={2}>On-Prem</option>
                    <option value={4}>Cloud</option>
                  </select>
                  {errors.hosting && touched.hosting && (
                    <p className="text-red-400">{errors.hosting}</p>
                  )}
                </div>

                {values.asset_class === "6" && (
                  <CustomSelection
                    setFieldvalue={setFieldValue}
                    isError={errors.tages && touched.tages}
                    error={errors.tages}
                    handleBlur={() => handleBlur("service_role")}
                    alreadySelected={editable && editable.tages}
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setmodel(!model)}
                  className="flex-1 bg-transparent border border-slate-600 text-white rounded-md py-2 px-4 hover:bg-slate-800 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4 transition-colors font-medium"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
