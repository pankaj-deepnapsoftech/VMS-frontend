/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import InputField from "@/components/InputField";
import Loader from "@/components/Loader/Loader";
import NoDataFound from "@/components/NoDataFound";
import { useAllEmployeeContext, useAuthContext } from "@/context";
import { BaseValidationSchema } from "@/Validation/AuthValidation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaCompass, FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

export default function AllEmployee() {
  const {
    loading,
    allEmployeesData,
    page,
    setPage,
    VerifyEmployee,
    AllEmployee,
    DeleteData,
    AllClientSME,
  } = useAllEmployeeContext();

  const { authenticate, token, Signup, ChangeStatus, runner } = useAuthContext();

  useEffect(() => {
    authenticate?.role === "ClientCISO" ? AllClientSME() : AllEmployee();
  }, [token, page, runner]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      full_name: "",
      phone: "",
      email: "",
      password: "",
      department: "",
      role: "ClientSME",
      owner: authenticate?._id,
      employee_approve: true,
      email_verification: true,
    },
    validationSchema: BaseValidationSchema,
    onSubmit: (value) => {
      Signup(value);
      setIsModalOpen(false);
    },
  });

  const handleChangeStatus = (type, id) => {
    switch (type) {
      case "activate":
        ChangeStatus({ deactivate: true }, id);
        break;
      case "deactivate":
        ChangeStatus({ deactivate: false }, id);
        break;
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="m-6 p-2 bg-[#2a2c2f] shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            {(authenticate?.role === "ClientCISO" || authenticate?.role === "Admin") && (
              <div className="flex w-full justify-end py-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white font-medium rounded-md hover:bg-blue-700 flex flex-row"
                >
                  <BiPlus className="h-6 w-6 mr-1" />
                  Add Employee
                </button>
              </div>
            )}
            {isModalOpen && (
              <div className="fixed inset-0 bg-input bg-opacity-50 flex items-center justify-center p-4 z-10">
                <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b p-4 bg-table">
                    <h2 className="text-lg font-semibold text-gray-200">Add Employees</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-100 hover:text-gray-200">
                      <MdClose className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="p-10">
                    <form onSubmit={handleSubmit} className="space-y-5 w-full flex flex-col">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <InputField
                          label="Full Name"
                          type="text"
                          showPassword={false}
                          icon={FaUser}
                          value={values.full_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your Full Name"
                          name="full_name"
                        />
                        {touched.full_name && errors.full_name && (
                          <p className="text-red-400 text-sm">{errors.full_name}</p>
                        )}

                        <InputField
                          label="Email Address"
                          type="email"
                          showPassword={false}
                          icon={FaEnvelope}
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your Email Address"
                          name="email"
                        />
                        {touched.email && errors.email && (
                          <p className="text-red-400 text-sm">{errors.email}</p>
                        )}

                        <InputField
                          label="Department"
                          type="text"
                          showPassword={false}
                          icon={FaCompass}
                          value={values.department}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your Department"
                          name="department"
                        />
                        {touched.department && errors.department && (
                          <p className="text-red-400 text-sm">{errors.department}</p>
                        )}

                        <InputField
                          label="Phone Number"
                          type="number"
                          showPassword={false}
                          icon={FaPhone}
                          value={values.phone}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your Phone Number"
                          name="phone"
                        />
                        {touched.phone && errors.phone && (
                          <p className="text-red-400 text-sm">{errors.phone}</p>
                        )}

                        <InputField
                          label="Password"
                          type="password"
                          showPassword={true}
                          icon={FaLock}
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your Password"
                          name="password"
                        />
                        {touched.password && errors.password && (
                          <p className="text-red-400 text-sm">{errors.password}</p>
                        )}
                      </div>
                      <div className="flex justify-end gap-2 border-t pt-4">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
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
              </div>
            )}
          </div>

          {allEmployeesData.length < 1 ? (
            <NoDataFound />
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <table className="table-auto w-full border-b bg-[#2d333b]">
                <thead className="bg-gradient-to-bl from-[#333333] to-[#666666] text-white">
                  <tr>
                    <th className="px-4 py-1 text-sm border text-left">S No.</th>
                    <th className="px-4 py-1 text-sm border text-left">Full Name</th>
                    <th className="px-4 py-1 text-sm border text-left">Email</th>
                    <th className="px-4 py-1 text-sm border text-left">Phone</th>
                    <th className="px-4 py-1 text-sm border text-left">Role</th>
                    <th className="px-4 py-1 text-sm border text-left">Approval Status</th>
                    <th className="px-4 py-1 text-sm border text-left">Status</th>
                    <th className="px-4 py-1 text-sm border text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allEmployeesData?.map((user, index) => (
                    <tr
                      key={user._id}
                      className="bg-[#2d333b] text-gray-200 hover:bg-[#53565c] transition duration-200"
                    >
                      <td className="px-2 py-1 border">{index + 1}</td>
                      <td className="px-2 py-1 border">{user.full_name}</td>
                      <td className="px-2 py-1 border">{user.email}</td>
                      <td className="px-2 py-1 border">{user.phone}</td>
                      <td className="px-2 py-1 border">{user.role}</td>
                      <td className="px-2 py-2 border">
                        {user?.employee_approve ? (
                          <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                            Approved
                          </span>
                        ) : (
                          <button
                            onClick={() => VerifyEmployee(user?._id)}
                            className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                          >
                            Verify
                          </button>
                        )}
                      </td>
                      <td className="px-2 py-1 border">
                        {user?.deactivate ? (
                          <button
                            onClick={() => handleChangeStatus("deactivate", user._id)}
                            type="button"
                            className="bg-green-400 text-white px-3 py-1 rounded-2xl"
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleChangeStatus("activate", user._id)}
                            className="bg-red-400/60 text-white px-3 py-1 rounded-2xl"
                          >
                            Deactivate
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 border">
                        <button
                          onClick={() => {
                            DeleteData(user._id);
                          }}
                          className="text-red-600 hover:text-red-800 transition-colors duration-150"
                          title="Delete"
                        >
                          <RiDeleteBinFill className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}
