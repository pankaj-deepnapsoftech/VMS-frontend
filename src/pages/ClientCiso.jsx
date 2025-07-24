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
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCompass } from "react-icons/fa";
import { useFormik } from "formik";
import { BaseValidationSchema } from "@/Validation/AuthValidation";
import axios from "axios";

export default function ClientCISO() {
  const {
    loading,
    AllCustomersData,
    AllCustomers,
    page,
    setPage,
    setDataCount,
    dataCount,
  } = useAllCustomerContext();

  const { authenticate, token, Signup, runner } = useAuthContext();
  const { clientSme,VerifyEmployee,DeleteUser } = useAllEmployeeContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [dataId, setDataId] = useState(null);
  const [smeUsers, setSmeUsers] = useState([]); // SME Data State

  // Fetch SME users from API
  const fetchSMEUsers = async () => {
    try {
      const res = await axios.get("/auth/all-sme", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data && Array.isArray(res.data)) {
        setSmeUsers(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch SME users", error);
    }
  };

  useEffect(() => {
    if (authenticate?.role === "ClientCISO") {
      // Add ClientCISO-specific function
    }
  }, [token, page, runner]);

  useEffect(() => {
    if (token && dataCount === 0) {
      AllCustomers();
      fetchSMEUsers(); // Fetch SME users once
      setDataCount(1);
    }
  }, [token, page]);

  useEffect(() => {
    AllCustomers();
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
      full_name: "",
      email: "",
      phone: "",
      password: "",
      role: "ClientCISO",
      Organization: "",
      employee_approve: true,
      email_verification: true,
    },
    validationSchema: BaseValidationSchema,
    onSubmit: (data) => {
      Signup(data, true);
      setIsModalOpen(false);
      resetForm();
    },
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="m-6 p-2 bg-[#2a2c2f] shadow-lg rounded-lg">
          {/* Header */}
          {/* <div className="flex justify-between items-center">
            {(authenticate?.role === "ClientCISO" ||
              authenticate?.role === "Admin") && (
              <div className="flex w-full justify-end py-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white font-medium rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <BiPlus className="h-6 w-6" />
                  Add Customer
                </button>
              </div>
            )}

           
            {isModalOpen && (
              <div className="fixed inset-0 bg-input bg-opacity-50 flex items-center justify-center p-4 z-10">
                <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b p-4 bg-table">
                    <h2 className="text-lg font-semibold text-gray-200">
                      Add Customer
                    </h2>
                    <button onClick={() => setIsModalOpen(false)}>
                      <MdClose className="h-6 w-6 text-gray-100" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="p-10 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="Full Name"
                        type="text"
                        icon={FaUser}
                        name="full_name"
                        value={values.full_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your Full Name"
                      />
                      {touched.full_name && errors.full_name && (
                        <p className="text-red-400 text-sm">
                          {errors.full_name}
                        </p>
                      )}

                      <InputField
                        label="Email Address"
                        type="email"
                        icon={FaEnvelope}
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your Email Address"
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-400 text-sm">{errors.email}</p>
                      )}

                      <InputField
                        label="Organization"
                        type="text"
                        icon={FaCompass}
                        name="Organization"
                        value={values.Organization}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your Organization"
                      />
                      {touched.Organization && errors.Organization && (
                        <p className="text-red-400 text-sm">{errors.Organization}</p>
                      )}

                      <InputField
                        label="Phone Number"
                        type="text"
                        icon={FaPhone}
                        name="phone"
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your Phone Number"
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-red-400 text-sm">{errors.phone}</p>
                      )}

                      <InputField
                        label="Password"
                        type="password"
                        icon={FaLock}
                        name="password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your Password"
                        showPassword={true}
                      />
                      {touched.password && errors.password && (
                        <p className="text-red-400 text-sm">{errors.password}</p>
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
                        className="px-4 py-2 bg-[#015289] text-white rounded-md hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div> */}

          {/* Table Content */}
          <div className="overflow-x-auto rounded-lg">
            {(AllCustomersData?.length < 1 && clientSme?.length < 1) ? (
              <NoDataFound />
            ) : (
              <table className="table-auto w-full bg-[#2d333b] rounded-md">
                <thead className="bg-gradient-to-bl from-[#333333] to-[#666666] text-white">
                  <tr>
                    <th className="px-2 py-1 border text-left text-sm">S No.</th>
                    <th className="px-2 py-1 border text-left text-sm">Full Name</th>
                    <th className="px-2 py-1 border text-left text-sm">Email</th>
                    <th className="px-2 py-1 border text-left text-sm">Phone</th>
                    <th className="px-2 py-1 border text-left text-sm">Organization</th>
                    <th className="px-2 py-1 border text-left text-sm">Role</th>
                    <th className="px-4 py-1 text-sm  border text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...clientSme].map((user, index) => (
                    <tr key={user._id} className="bg-[#2d333b] text-gray-200 hover:bg-[#53565c]">
                      <td className="px-2 py-1 border">{index + 1}</td>
                      <td className="px-2 py-1 border">{user?.full_name}</td>
                      <td className="px-2 py-1 border">{user?.email}</td>
                      <td className="px-2 py-1 border">{user?.phone}</td>
                      <td className="px-2 py-1 border">{user?.owner?.Organization}</td>
                      <td className="px-2 py-1 border">{user?.role}</td>
                  
                      <td className="px-4 py-3 border">
                        <button
                          onClick={() => {
                            DeleteUser(user._id); 
                          }}
                          className="text-red-600 hover:text-red-800 transition-colors ml-5 duration-150"
                          title="Delete"
                        >
                          <RiDeleteBinFill className="h-4 w-4" />
                        </button>
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
              className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white rounded-md ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span className="text-white">Page {page}</span>
            <button
              className="px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white rounded-md"
              disabled={AllCustomersData?.length < 10}
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
