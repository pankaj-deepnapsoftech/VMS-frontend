/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import InputField from "@/components/InputField";
import Loader from "@/components/Loader/Loader";
import NoDataFound from "@/components/NoDataFound";
import { AxiosHandler } from "@/config/AxiosConfig";
import {
  useAllEmployeeContext,
  useAuthContext,
  useScheduleAssessmentContext,
} from "@/context";
import { BaseValidationSchema } from "@/Validation/AuthValidation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { RiDeleteBinFill, RiEdit2Line } from "react-icons/ri";

const AllEmployee = () => {
  const {
    loading,
    VerifyEmployee,
    DeleteUser,
    page,
    runner,
  } = useAllEmployeeContext();
  const { token } = useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editable, setEdiTable] = useState(null);
  const [EmpData, setEmpData] = useState([]);
  const [TententData, setTententData] = useState([]);
  const [RoleAllData, setRoleAllData] = useState([]);

  const formik = useFormik({
    initialValues:
      editable || {
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: "",
        tenant: "",
        role: "",
      },
    validationSchema: BaseValidationSchema,
    enableReinitialize: true,
    onSubmit: async (v) => {
      try {
        await AxiosHandler.post(`/auth/create`, v);
        setIsModalOpen(false);
        GetUsers();
        formik.resetForm();
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleChangeStatus = (type, id) => {
    if (
      window.confirm("Are you sure you want to change this user's status?")
    ) {
      const deactivate = type === "activate";
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAuthContext().ChangeStatus({ deactivate }, id);
    }
  };

  const GetUsers = async () => {
    try {
      const res = await AxiosHandler.get("/auth/all-users");
      setEmpData(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const GetAllTenentData = async () => {
    try {
      const res = await AxiosHandler.get("/tenant/get-all");
      setTententData(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const GetAllRoleData = async () => {
    try {
      const res = await AxiosHandler.get("/role/get-all");
      setRoleAllData(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      GetAllTenentData();
      GetAllRoleData();
      GetUsers();
    }
  }, [token, page, runner]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-6 bg-[#0c1120] min-h-screen text-white">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setEdiTable(null);
              }}
              className="px-4 py-2 bg-gradient-to-tr from-[#111] to-[#555] rounded-md hover:from-[#222] hover:to-[#666] shadow flex items-center"
            >
              <BiPlus className="mr-1" />
              Add User
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-[#1e1e1e] rounded-lg shadow-lg w-full max-w-2xl overflow-auto">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold">
                    {editable ? "Edit User" : "Add User"}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)}>
                    <MdClose className="text-gray-300 hover:text-white text-xl" />
                  </button>
                </div>
                <form
                  onSubmit={formik.handleSubmit}
                  className="px-6 py-4 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      name="fname"
                      label="First Name"
                      type="text"
                      icon={FaUser}
                      value={formik.values.fname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.fname && formik.errors.fname && (
                      <p className="text-red-400 text-sm">
                        {formik.errors.fname}
                      </p>
                    )}

                    <InputField
                      name="lname"
                      label="Last Name"
                      type="text"
                      icon={FaUser}
                      value={formik.values.lname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.lname && formik.errors.lname && (
                      <p className="text-red-400 text-sm">
                        {formik.errors.lname}
                      </p>
                    )}

                    <InputField
                      name="email"
                      label="Email Address"
                      type="email"
                      icon={FaEnvelope}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-400 text-sm">
                        {formik.errors.email}
                      </p>
                    )}

                    <InputField
                      name="phone"
                      label="Phone Number"
                      type="text"
                      icon={FaPhone}
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-red-400 text-sm">
                        {formik.errors.phone}
                      </p>
                    )}

                    <InputField
                      name="password"
                      label="Password"
                      type="password"
                      icon={FaLock}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-red-400 text-sm">
                        {formik.errors.password}
                      </p>
                    )}

                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Role
                      </label>
                      <select
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full bg-[#2a2a2a] border border-gray-600 rounded px-3 py-2 text-white"
                      >
                        <option value="" disabled>
                          Select role
                        </option>
                        {RoleAllData.map((r) => (
                          <option key={r._id} value={r._id}>
                            {r.role}
                          </option>
                        ))}
                      </select>
                      {formik.touched.role && formik.errors.role && (
                        <p className="text-red-400 text-sm">
                          {formik.errors.role}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Tenant
                      </label>
                      <select
                        name="tenant"
                        value={formik.values.tenant}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="w-full bg-[#2a2a2a] border border-gray-600 rounded px-3 py-2 text-white"
                      >
                        <option value="" disabled>
                          Select tenant
                        </option>
                        {TententData.map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.company_name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.tenant && formik.errors.tenant && (
                        <p className="text-red-400 text-sm">
                          {formik.errors.tenant}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 border-t border-gray-700 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="overflow-x-auto rounded-md shadow-xl bg-[#0c1120]">
            <table className="min-w-full divide-y divide-gray-700 text-sm">
              <thead className="bg-gradient-to-bl from-[#0a0f39] via-[#080d27] to-[#050b20] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">S No.</th>
                  <th className="px-6 py-3 text-left">First Name</th>
                  <th className="px-6 py-3 text-left">Last Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Phone</th>
                  <th className="px-6 py-3 text-left">Approval</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {EmpData.length > 0 ? (
                  EmpData.map((user, i) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-700 hover:bg-[#1e1e1e] transition"
                    >
                      <td className="px-6 py-3">{i + 1}</td>
                      <td className="px-6 py-3">{user.fname}</td>
                      <td className="px-6 py-3">{user.lname}</td>
                      <td className="px-6 py-3">{user.email}</td>
                      <td className="px-6 py-3">{user.phone}</td>
                      <td className="px-6 py-3">
                        {user.employee_approve ? (
                          <span className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                            Approved
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Verify this employee?"
                                )
                              ) {
                                VerifyEmployee(user._id);
                              }
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Verify
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        {user.deactivate ? (
                          <button
                            onClick={() =>
                              handleChangeStatus("deactivate", user._id)
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleChangeStatus("activate", user._id)
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Deactivate
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-3 flex gap-3 text-white">
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Delete this user?"
                              )
                            ) {
                              DeleteUser(user._id);
                            }
                          }}
                          title="Delete"
                          className="hover:text-red-400"
                        >
                          <RiDeleteBinFill className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setEdiTable(user);
                            setIsModalOpen(true);
                          }}
                          title="Edit"
                          className="hover:text-blue-400"
                        >
                          <RiEdit2Line className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {EmpData.length < 1 && <NoDataFound />}
          </div>
        </div>
      )}
    </>
  );
};

export default AllEmployee;
