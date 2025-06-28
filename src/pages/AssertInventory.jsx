import { useEffect, useState } from "react";
import { ExternalLink, Trash2, Edit, X, Boxes } from "lucide-react";
import { BiPlus } from "react-icons/bi";
import { useFormik } from "formik";
import { InfraAssetvalidation } from "@/Validation/InfrastructureAssetvalidation";
import { useAuthContext, useInfraAssetContext } from "@/context";

export default function TenantDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const [model, setmodel] = useState(false);
  const { token } = useAuthContext();
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

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: editable || {
        asset_hostname: "",
        modify_criticality: "",
        asset_ip: "",
      },
      validationSchema: InfraAssetvalidation,
      enableReinitialize: true,
      onSubmit: (value) => {
        if (editable) {
          UpdateInfraAsset(editable._id, value);
        } else {
          CreateInfraAsset(value);
        }
        setmodel(false);
      },
    });
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files[0]);
  };

  useEffect(() => {
    if (token) {
      GetInfraAsset();
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-custom text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-screen px-4 border-[#6B728033] flex items-center justify-between backdrop-blur-md bg-[#435b8a33] rounded-lg my-5 h-[70px]">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#13141450] border border-gray-500 backdrop-blur-md py-2 w-1/3 text-white px-4 rounded-md"
            />

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  // eslint-disable-next-line no-undef
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 bg-button hover:bg-hoverbutton rounded-md text-white font-medium flex items-center gap-2"
              >
                <BiPlus className="h-6 w-6" />
                Bulk Upload
              </button>

              <button
                onClick={() => {
                  setmodel(true);
                  setEditable(null);
                }}
                className="px-4 py-2 bg-button hover:bg-hoverbutton rounded-md text-white font-medium flex items-center gap-2"
              >
                <BiPlus className="h-6 w-6" />
                Infrastructure Asset
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-slate-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-4 px-6 font-medium text-gray-300">
                      Asset Hostname
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-300">
                      Asset IP
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-300">
                      Modify Criticality
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTenants.map((tenant) => (
                    <tr
                      key={tenant.id}
                      className="border-b border-slate-700 hover:bg-slate-750"
                    >
                      <td className="py-4 px-6 text-white">
                        {tenant.asset_hostname}
                      </td>
                      <td className="py-4 px-6 text-white">
                        {tenant.asset_ip}
                      </td>
                      <td className="py-4 px-6 text-white">
                        {tenant.modify_criticality}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button className="p-1 text-blue-400 hover:text-blue-300">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => DeleteInfraAsset(tenant._id)}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditable(tenant);
                              setmodel(!model);
                            }}
                            className="p-1 text-green-400 hover:text-green-300"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>  

          {/* Pagination */}
          {/* <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            className="bg-slate-800 border-slate-700 text-gray-400 hover:bg-slate-700 hover:text-white"
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-gray-300">Page {currentPage}</span>
          <Button
            variant="outline"
            className="bg-slate-800 border-slate-700 text-gray-400 hover:bg-slate-700 hover:text-white"
          >
            Next
          </Button>
        </div> */}
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
                  const formData = new FormData();
                  console.log(selectedFiles)
                  formData.append("excel", selectedFiles);
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
          <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-md mx-auto">
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
                    <option value={"select value"} selected>
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

                {/* <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Description*</label>
                  <textarea
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors resize-none"
                  />
                </div> */}
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
