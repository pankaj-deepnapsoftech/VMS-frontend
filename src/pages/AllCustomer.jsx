/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import Loader from "@/components/Loader/Loader";
import AllowedModal from "@/components/modal/AllowedModal";
import NoDataFound from "@/components/NoDataFound";
import InputField from "@/components/InputField";
import {
  useAllCustomerContext,
  useAllEmployeeContext,
  useAuthContext,
} from "@/context";
import { useEffect, useState, useMemo } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCompass,
  FaEdit,
  FaTrash,
  FaGlobe,
  FaBuilding,
  FaUsers,
  FaMapMarkedAlt,
  FaCity,
  FaIndustry,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useFormik } from "formik";
import { BaseValidationSchema } from "@/Validation/AuthValidation";
import axios from "axios";
import { AxiosHandler } from "@/config/AxiosConfig";
import { tenantValidator } from "@/Validation/TenantsValidations";

export default function AllCustomer() {
  const { loading } = useAllCustomerContext();

  const { authenticate, token } = useAuthContext();

  const { VerifyEmployee } = useAllEmployeeContext();
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [dataId, setDataId] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [editTable, setEditTable] = useState(null);

  // get api
  const getTenants = async () => {
    try {
      const res = await AxiosHandler.get(`/tenant/get?page=${page}&limit=10`);
      setTenants(res?.data.data);
    } catch (error) {
      console.error("Failed to fetch tenants", error);
    }
  };

  // post
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
          const res = await AxiosHandler.put(
            `/tenant/update/${values._id}`,
            values
          );
        } else {
          const res = await AxiosHandler.post(`/tenant/create`, values, {});
        }
        setIsModalOpen(false);
        resetForm();
        getTenants();
      } catch (error) {
        console.error("Tenant creation failed", error);
      }
    },
  });

  // delete
  const DeleteData = async (_id) => {
    try {
      if (window.confirm("are you sure you want to delete this element?")) {
        const res = await AxiosHandler.delete(`/tenant/delete/${_id}`);
        getTenants();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const paginatedTenants = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return tenants.slice(start, start + rowsPerPage);
  }, [currentPage, tenants]);

  useEffect(() => {
    if (token) {
      getTenants(page);
    }
  }, [token, page, VerifyEmployee]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex w-full justify-end py-4">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setEditTable(null);
              }}
              className="px-4 py-2 bg-gradient-to-tr mr-5 from-[#1f1d1d] to-[#666666] text-white font-medium rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <BiPlus className="h-6 w-6" />
              Add Tenant
            </button>
          </div>
          <div className="m-6 p-2 bg-tablecolor shadow-lg rounded-lg">
            <div>
              {isModalOpen && (
                <div className="fixed inset-0 bg-input bg-opacity-50 flex items-center justify-center p-4 z-10">
                  <div className="bg-gradient-custom rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b p-4 bg-table">
                      <h2 className="text-lg font-semibold text-gray-200">
                        Add Tenant
                      </h2>
                      <button onClick={() => setIsModalOpen(false)}>
                        <MdClose className="h-6 w-6 text-gray-100" />
                      </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-10 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="Company Name"
                          type="text"
                          icon={FaBuilding}
                          name="company_name"
                          value={values.company_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your company name"
                        />
                        {touched.company_name && errors.company_name && (
                          <p className="text-red-400 text-sm">
                            {errors.company_name}
                          </p>
                        )}

                        <InputField
                          label="Website URL"
                          type="text"
                          icon={FaGlobe}
                          name="Website_url"
                          value={values.Website_url}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your website url"
                          // showPassword={true}
                        />
                        {touched.Website_url && errors.Website_url && (
                          <p className="text-red-400 text-sm">
                            {errors.Website_url}
                          </p>
                        )}

                        <InputField
                          label="Employee Count"
                          type="text"
                          icon={FaUsers}
                          name="Employee_count"
                          value={values.Employee_count}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter Employee Count"
                        />
                        {touched.Employee_count && errors.Employee_count && (
                          <p className="text-red-400 text-sm">
                            {errors.Employee_count}
                          </p>
                        )}
                        <InputField
                          label="Country"
                          type="text"
                          icon={FaCompass}
                          name="Country"
                          value={values.Country}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter Country"
                        />
                        {touched.Country && errors.Country && (
                          <p className="text-red-400 text-sm">
                            {errors.Country}
                          </p>
                        )}

                        <InputField
                          label="State"
                          type="text"
                          icon={FaMapMarkedAlt}
                          name="State"
                          value={values.State}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter state"
                        />
                        {touched.State && errors.State && (
                          <p className="text-red-400 text-sm">{errors.State}</p>
                        )}

                        <InputField
                          label="City"
                          type="text"
                          icon={FaCity}
                          name="City"
                          value={values.City}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter city"
                        />
                        {touched.City && errors.City && (
                          <p className="text-red-400 text-sm">{errors.City}</p>
                        )}

                        <InputField
                          label="Industry"
                          type="text"
                          icon={FaIndustry}
                          name="Industry"
                          value={values.Industry}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter industry"
                        />
                        {touched.Industry && errors.Industry && (
                          <p className="text-red-400 text-sm">
                            {errors.Industry}
                          </p>
                        )}

                        <InputField
                          label="Risk Apetite"
                          type="text"
                          icon={FaExclamationTriangle}
                          name="Risk_Apetite"
                          value={values.Risk_Apetite}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter risk apetite"
                        />
                        {touched.Risk_Apetite && errors.Risk_Apetite && (
                          <p className="text-red-400 text-sm">
                            {errors.Risk_Apetite}
                          </p>
                        )}
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
            </div>

            <div className="mt-6 bg-[#0c1120] border border-gray-700 rounded-xl overflow-x-auto text-sm text-white">
              {tenants?.length < 1 ? (
                <div className="text-center py-6 text-gray-400">
                  No matching records found.
                </div>
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gradient-to-bl from-[#0a0f39] via-[#080d27] to-[#050b20]">
                      <tr>
                        <th className="px-4 py-3 text-left">Company Name</th>
                        <th className="px-4 py-3 text-left">Website URL</th>
                        <th className="px-4 py-3 text-left">Employee Count</th>
                        <th className="px-4 py-3 text-left">Country</th>
                        <th className="px-4 py-3 text-left">State</th>
                        <th className="px-4 py-3 text-left">City</th>
                        <th className="px-4 py-3 text-left">Industry</th>
                        <th className="px-4 py-3 text-left">Risk Appetite</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-300">
                      {paginatedTenants.map((tenant, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-700 hover:bg-[#1e1e1e] transition"
                        >
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
                              onClick={() => {
                                setEditTable(tenant);
                                setIsModalOpen(true);
                              }}
                              className="text-blue-400 cursor-pointer"
                            />
                            <FaTrash
                              onClick={() => DeleteData(tenant?._id)}
                              className="text-red-500 cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination Controls */}
                  <div className="flex justify-between items-center px-4 py-2 text-xs border-t border-gray-700">
                    <div>
                      Showing {paginatedTenants.length} of {tenants.length}{" "}
                      results
                    </div>
                    <div className="space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-700 rounded text-white"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                      >
                        Previous
                      </button>
                      <span className="px-3 py-1 bg-blue-600 rounded text-white">
                        Page {currentPage}
                      </span>
                      <button
                        className="px-2 py-1 bg-gray-700 rounded text-white"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            prev * rowsPerPage < tenants.length
                              ? prev + 1
                              : prev
                          )
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-between items-center my-6 px-5">
              <button
                className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white rounded-md ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span className="text-white">Page {page}</span>
              <button
                className="px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white rounded-md"
                disabled={tenants?.length < 10}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {isChecked && (
        <AllowedModal
          setIsChecked={setIsChecked}
          isChecked={isChecked}
          id={dataId}
        />
      )}
    </>
  );
}
