/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import Loader from "@/components/Loader/Loader";
import InputField from "@/components/InputField";
import NoDataFound from "@/components/NoDataFound";
import Pagination from "./Pagination";

import { useAllCustomerContext, useAllEmployeeContext, useAuthContext } from "@/context";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { tenantValidator } from "@/Validation/TenantsValidations";
import { AxiosHandler } from "@/config/AxiosConfig";

import { MdClose } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import {
  FaBuilding,
  FaGlobe,
  FaUsers,
  FaCompass,
  FaMapMarkedAlt,
  FaCity,
  FaIndustry,
  FaExclamationTriangle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function AllCustomer() {
  const { loading } = useAllCustomerContext();
  const { token } = useAuthContext();
  const { VerifyEmployee } = useAllEmployeeContext();

  const [page, setPage] = useState(1);
  const [tenants, setTenants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTable, setEditTable] = useState(null);

  // ✅ getTenants now accepts page parameter
  const getTenants = async (pageNumber = 1) => {
    try {
      const res = await AxiosHandler.get(`/tenant/get?page=${pageNumber}&limit=10`);
      setTenants(res?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch tenants", error);
    }
  };

  const DeleteData = async (_id) => {
    try {
      if (window.confirm("Are you sure you want to delete this element?")) {
        await AxiosHandler.delete(`/tenant/delete/${_id}`);
        await getTenants(page); // ✅ fetch again from current page
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: editTable || {
      company_name: "",
      Website_url: "",
      Employee_count: "",
      Country: "",
      State: "",
      City: "",
      Industry: "",
      Risk_Apetite: "",
    },
    validationSchema: tenantValidator,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (editTable) {
          await AxiosHandler.put(`/tenant/update/${values._id}`, values);
        } else {
          await AxiosHandler.post(`/tenant/create`, values);
        }
        setIsModalOpen(false);
        resetForm();
        await getTenants(page); // ✅ refresh after submission
      } catch (error) {
        console.error("Tenant creation failed", error);
      }
    },
  });

  useEffect(() => {
    if (token) {
      getTenants(page); // ✅ page passed
    }
  }, [token, page, VerifyEmployee]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* Add Tenant Button */}
          <div className="flex w-full justify-end py-4">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setEditTable(null);
              }}
              className="px-4 py-2 bg-gradient-to-tr mr-5 from-[#1f1d1d] to-[#666666] text-white font-medium hover:bg-blue-700 flex items-center gap-2"
            >
              <BiPlus className="h-6 w-6" />
              Add Tenant
            </button>
          </div>

          {/* Modal Form */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-input bg-opacity-50 flex items-center justify-center p-4 z-10">
              <div className="bg-gradient-custom rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b p-4 bg-table">
                  <h2 className="text-lg font-semibold text-gray-200">
                    {editTable ? "Edit Tenant" : "Add Tenant"}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)}>
                    <MdClose className="h-6 w-6 text-gray-100" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-10 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Fields */}
                    {[
                      { name: "company_name", label: "Company Name", icon: FaBuilding },
                      { name: "Website_url", label: "Website URL", icon: FaGlobe },
                      { name: "Employee_count", label: "Employee Count", icon: FaUsers },
                      { name: "Country", label: "Country", icon: FaCompass },
                      { name: "State", label: "State", icon: FaMapMarkedAlt },
                      { name: "City", label: "City", icon: FaCity },
                      { name: "Industry", label: "Industry", icon: FaIndustry },
                      { name: "Risk_Apetite", label: "Risk Appetite", icon: FaExclamationTriangle },
                    ].map(({ name, label, icon }) => (
                      <div key={name}>
                        <InputField
                          label={label}
                          type="text"
                          icon={icon}
                          name={name}
                          value={values[name]}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={`Enter ${label.toLowerCase()}`}
                        />
                        {touched[name] && errors[name] && (
                          <p className="text-red-400 text-sm">{errors[name]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2 mt-4 border-t pt-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#123e5c] text-white rounded-md hover:bg-sky-800"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="m-6 p-2 bg-tablecolor shadow-lg rounded-lg">
            <div className="mt-6 bg-[#0c1120] overflow-x-auto text-sm text-white">
              {tenants.length < 1 ? (
                <NoDataFound />
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gradient-to-br from-[#0a0f39] via-[#080d27] to-[#050b20]">
                      <tr>
                        {["Company Name", "Website URL", "Employee Count", "Country", "State", "City", "Industry", "Risk Appetite", "Actions"].map(
                          (header) => (
                            <th key={header} className="px-4 py-3 text-left">
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-300">
                      {tenants.map((tenant, index) => (
                        <tr key={tenant._id} className="border-b border-gray-700 hover:bg-[#1e1e1e] transition">
                          <td className="p-3">{tenant.company_name}</td>
                          <td className="p-3">{tenant.Website_url}</td>
                          <td className="p-3">{tenant.Employee_count}</td>
                          <td className="p-3">{tenant.Country}</td>
                          <td className="p-3">{tenant.State}</td>
                          <td className="p-3">{tenant.City}</td>
                          <td className="p-3">{tenant.Industry}</td>
                          <td className="p-3">{tenant.Risk_Apetite}</td>
                          <td className="p-3 flex gap-2">
                            <FaEdit
                              title="Edit"
                              onClick={() => {
                                setEditTable(tenant);
                                setIsModalOpen(true);
                              }}
                              className="text-blue-400 cursor-pointer"
                            />
                            <FaTrash
                              title="Delete"
                              onClick={() => DeleteData(tenant._id)}
                              className="text-red-500 cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>

            {/* Pagination */}
            <Pagination page={page} setPage={setPage} hasNextPage={tenants.length === 10} />
          </div>
        </div>
      )}
    </>
  );
}
