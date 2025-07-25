import { useEffect, useState } from "react";
import { ExternalLink, Trash2, Edit, X, Boxes } from "lucide-react";
import { BiPlus } from "react-icons/bi";
import { useFormik } from "formik";
import { useAuthContext, useInfraAssetContext } from "@/context";
import { BusinessApplicationValidation } from "@/Validation/BusinessApp.validation";
import axios from "axios";
import * as XLSX from "xlsx";
import Pagination from "./Pagination";
import NoDataFound from "@/components/NoDataFound";
import { IoSearch } from "react-icons/io5";

export default function BusinessApplications() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [model, setmodel] = useState(false);
  const { token } = useAuthContext();
  const {
    CreateBussinerssApplcation,
    GetBussinerssApplcation,
    businessApplication,
    DeleteBussinerssApplcation,
    UpdateBussinerssApplcation,
    CreateBulkBussinerssApplcation,
    GetAllInfraAssetData,
    totalInfraAsset,
  } = useInfraAssetContext();
  const [editable, setEditable] = useState(null);
  const [countryData, setcountryData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tenant, setTenant] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTenants = businessApplication.filter((tenant) =>
    tenant?.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: editable || {
        name: "",
        description: "",
        country: "",
        state: "",
        city: "",
        type: "",
        applicationUrl: "",
        modifyCriticality: "",
        asset: "",
      },
      validationSchema: BusinessApplicationValidation,
      enableReinitialize: true,
      onSubmit: (value) => {
        if (!tenant && !editable) {
          return alert("Please select a tenant");
        }
        console.log(value);
        if (editable) {
          UpdateBussinerssApplcation(editable._id, value);
        } else {
          CreateBussinerssApplcation({ ...value, creator: tenant });
        }
        setmodel(false);
      },
    });

  const handleDownload = () => {
    const data = [
      {
        name: "",
        description: "",
        country: "",
        state: "",
        city: "",
        type: "",
        applicationUrl: "",
        modifyCriticality: "",
      },
    ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vulnerabilities");
    XLSX.writeFile(workbook, "business-applications.xlsx");
  };

  const GetCountryData = async () => {
    try {
      const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/states"
      );
      setcountryData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files[0]);
  };

  useEffect(() => {
    if (token) {
      GetBussinerssApplcation(currentPage, tenant);
      GetCountryData();
    }
  }, [currentPage, tenant]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTenant(params.get("tenant") || "");
  }, [location.search]);

  useEffect(() => {
    if (token) {
      GetAllInfraAssetData(tenant);
    }
  }, [tenant]);

  return (
    <>
      <div className="min-h-screen mb-10 bg-gradient-custom text-white p-6">
        <div className="w-full px-6  my-5 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Header */}

          <div>
            <h2 className="text-2xl font-semibold text-white">
              All Business Applications
            </h2>
            <span className="text-subtext text-sm">
              Manage your business applications
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-button hover:bg-hoverbutton rounded-md text-white font-medium flex items-center justify-center gap-2"
            >
              <BiPlus className="h-6 w-6" />
              Bulk Upload
            </button>

            <button
              onClick={() => {
                setmodel(!model);
                setEditable(null);
              }}
              className="px-4 py-2 bg-button hover:bg-hoverbutton rounded-md text-white font-medium flex items-center justify-center gap-2"
            >
              <BiPlus className="h-6 w-6" />
              Business Applications
            </button>
          </div>
        </div>

        <div className="w-full  min-h-screen p-6">
          <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-700 relative">
              <div className="relative">
                <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
                <input
                  type="search"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                        "Name",
                        "Description",
                        "Country",
                        "State",
                        "City",
                        "Type",
                        "Application URL",
                        "Modify Criticality",
                        "Infrastructure Asset",
                        "Actions",
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
                        <td className="px-4 py-3">{tenant?.name}</td>
                        <td className="px-4 py-3 capitalize">
                          {tenant?.description}
                        </td>
                        <td className="px-4 py-3 capitalize">
                          {tenant?.country}
                        </td>
                        <td className="px-4 py-3">{tenant?.state}</td>
                        <td className="px-4 py-3">{tenant?.city}</td>
                        <td className="px-4 py-3">{tenant?.type}</td>
                        <td className="px-4 py-3">{tenant?.applicationUrl}</td>
                        <td className="px-4 py-3">
                          {tenant?.modifyCriticality}
                        </td>
                        <td className="px-4 py-3">
                          {tenant?.asset?.asset_hostname}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-400 hover:text-blue-300">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                const confirmDelete = window.confirm(
                                  "Are you sure you want to delete this business application?"
                                );
                                if (confirmDelete) {
                                  DeleteBussinerssApplcation(tenant._id);
                                }
                              }}
                              className="text-subtext hover:text-subTextHover"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() => {
                                setEditable(tenant);
                                setmodel(!model);
                              }}
                              className="text-subtext hover:text-blue-700"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                          </div>
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
                  CreateBulkBussinerssApplcation(formData);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ">
          <div className="bg-slate-900 rounded-xl shadow-2xl w-full  md:w-[60%] mx-auto h-[80%] overflow-y-scroll custom-scrollbar">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Boxes className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-medium text-white">
                  Business Applications
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
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="What is your Asset IP?"
                      className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                      name="name"
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* API Key */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Application URL
                    </label>
                    <input
                      type="text"
                      placeholder="What is your title?"
                      className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                      name="applicationUrl"
                      value={values.applicationUrl}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.applicationUrl && touched.applicationUrl && (
                      <p className="text-red-400">{errors.applicationUrl}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Description*
                  </label>
                  <textarea
                    rows={4}
                    value={values.description}
                    name="description"
                    placeholder="Enter you description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors resize-none"
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-400">{errors.description}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Country
                    </label>
                    <select
                      type="text"
                      placeholder="What is your title?"
                      className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                      name="country"
                      value={values.country}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <option value={"select Country"} selected>
                        select Country
                      </option>
                      {countryData.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.country && touched.country && (
                      <p className="text-red-400">{errors.country}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      State
                    </label>
                    <select
                      type="text"
                      placeholder="What is your title?"
                      className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                      name="state"
                      value={values.state}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <option value={"select value"} selected>
                        select value
                      </option>
                      {values.country &&
                        countryData
                          .filter((item) => item.name === values.country)[0]
                          .states.map((item, index) => (
                            <option key={index} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                    </select>
                    {errors.state && touched.state && (
                      <p className="text-red-400">{errors.state}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="What is your title?"
                      className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                      name="city"
                      value={values.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.city && touched.city && (
                      <p className="text-red-400">{errors.city}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Type
                    </label>
                    <select
                      type="text"
                      placeholder="What is your title?"
                      className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                      name="type"
                      value={values.type}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <option value={"select value"} selected>
                        select value
                      </option>
                      <option value={"Mobile"}>Mobile</option>
                      <option value={"Web"}>Web</option>
                      <option value={"Microservice"}>Microservice</option>
                      <option value={"APIs"}>APIs</option>
                    </select>
                    {errors.type && touched.type && (
                      <p className="text-red-400">{errors.type}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm text-white">
                    Infrastructure Asset
                  </label>
                  <select
                    name="asset"
                    value={values.asset}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-2 rounded border border-gray-600 bg-[#252A3A] text-white focus:outline-none"
                  >
                    <option value="">-- Select --</option>
                    {totalInfraAsset?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.asset_hostname}
                      </option>
                    ))}
                  </select>
                  {errors.asset && touched.asset && (
                    <p className="text-red-400">{errors.asset}</p>
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
                    name="modifyCriticality"
                    value={values.modifyCriticality}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option value={"select value"} selected>
                      select value
                    </option>
                    <option value={"Critical"}>Critical</option>
                    <option value={"High"}>High</option>
                    <option value={"Medium"}>Medium</option>
                    <option value={"Low"}>Low</option>
                  </select>
                  {errors.modifyCriticality && touched.modifyCriticality && (
                    <p className="text-red-400">{errors.modifyCriticality}</p>
                  )}
                </div>
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
                  type="button"
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
