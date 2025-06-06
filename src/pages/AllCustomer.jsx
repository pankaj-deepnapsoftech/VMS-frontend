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
import { useEffect, useState } from "react";
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

export default function AllCustomer() {
  const { loading, page, setPage } = useAllCustomerContext();

  const { authenticate, token } = useAuthContext();
  const { VerifyEmployee } = useAllEmployeeContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [dataId, setDataId] = useState(null);
  const [tenants, setTenants] = useState([]);

  const getTenants = async () => {
    try {
      const response = await fetch("/tenant/get");
      const data = await response.json();
      setTenants(data?.tenants || []);
    } catch (error) {
      console.error("Failed to fetch tenants", error);
    }
  };

  useEffect(() => {
    getTenants();
  }, []);

  useEffect(() => {
    // Handle any role-based logic here if needed
  }, [token, page]);

  useEffect(() => {
    getTenants(); // refresh on verify
  }, [VerifyEmployee]);

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      company_name: "",
      Website_url: "",
      Employee_count: "",
      Country: "",
      State: "",
      City: "",
      Industry: "",
      Risk_Apetite: "",
    },
    validationSchema: BaseValidationSchema,
    onSubmit: async (values) => {
      try {
        await fetch("/tenant/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        setIsModalOpen(false);
        resetForm();
        getTenants(); // Refresh the table
      } catch (error) {
        console.error("Tenant creation failed", error);
      }
    },
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="m-6 p-2 bg-[#2a2c2f] shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            {(authenticate?.role === "ClientCISO" ||
              authenticate?.role === "Admin") && (
              <div className="flex w-full justify-end py-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white font-medium rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <BiPlus className="h-6 w-6" />
                  Add Tenant
                </button>
              </div>
            )}

            {isModalOpen && (
              <div className="fixed inset-0 bg-input bg-opacity-50 flex items-center justify-center p-4 z-10">
                <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
                        name="password"
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
                        <p className="text-red-400 text-sm">{errors.Country}</p>
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

          {/* Table Content */}
          <div className="overflow-x-auto rounded-lg">
            {tenants?.length < 1 ? (
              <NoDataFound />
            ) : (
              <table className="table-auto w-full bg-[#2d333b] rounded-md">
                <thead>
                  <tr className="bg-gradient-to-bl from-[#333333] to-[#666666] text-white">
                    <th className="px-2 py-1 border text-left text-sm">
                      Company Name
                    </th>
                    <th className="px-2 py-1 border text-left text-sm">
                      Website URL
                    </th>
                    <th className="px-2 py-1 border text-left text-sm">
                      Employee Count
                    </th>
                    <th className="px-2 py-1 border text-left text-sm">
                      Country
                    </th>
                    <th className="px-2 py-1 border text-left text-sm">
                      State
                    </th>
                    <th className="px-2 py-1 border text-left 0 text-sm">City</th>
                    <th className="px-2 py-1 border text-left text-sm">
                      Industry
                    </th>
                    <th className="px-2 py-1 border text-left text-sm">
                      Risk Apetite
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map((tenant, index) => (
                    <tr key={index} className="text-gray-200 hover:bg-[#444]">
                      <td className="px-2 py-1">{tenant.tenantCode}</td>
                      <td className="px-2 py-1">{tenant.name}</td>
                      <td className="px-2 py-1">{tenant.apiKey}</td>
                      <td className="px-2 py-1">{tenant.createdOn}</td>
                      <td className="px-2 py-1">{tenant.createdBy}</td>
                      <td className="px-2 py-1">{tenant.safeDomain}</td>
                      <td className="px-2 py-1 flex gap-2">
                        <FaEdit className="cursor-pointer" />
                        <FaTrash className="cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
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
