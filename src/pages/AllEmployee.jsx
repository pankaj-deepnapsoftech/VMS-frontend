/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import InputField from "@/components/InputField";
import Loader from "@/components/Loader/Loader";
import NoDataFound from "@/components/NoDataFound";
import { AxiosHandler } from "@/config/AxiosConfig";
import {
  useAllEmployeeContext,
  useAuthContext,

} from "@/context";
import { BaseValidationSchema, EditUser } from "@/Validation/AuthValidation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { RiDeleteBinFill, RiEdit2Line } from "react-icons/ri";
import Pagination from "./Pagination";

const AllEmployee = () => {
  const {
    VerifyEmployee,
    DeleteUser,
   
  } = useAllEmployeeContext();

  const {  token  } =
    useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editable, setEdiTable] = useState(null);
  const [EmpData, setEmpData,] = useState([]);
  const [TenantData, setTenantData] = useState([]);
  const [RoleAllData, setRoleAllData] = useState([]);
  const [page, setPage] = useState(1)
  const [isloading, setloading] = useState(false)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: editable || {
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: "",
        tenant: "",
        role: "",

      },
      validationSchema: editable ? EditUser : BaseValidationSchema,
      enableReinitialize: true,
      onSubmit: async (value) => {
        setloading(true)
        try {
          if (editable) {
             await AxiosHandler.put(`/auth/update-user/${value._id}`, value);
          } else {
             await AxiosHandler.post(`/auth/create`, value);
          }
          setIsModalOpen(false);
          GetUsers()
          resetForm()
        } catch (error) {
          console.error(error);
        }finally{
          setloading(false)
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

  const GetUsers = async (page=1) => {
    setloading(true)
    try {
      const res = await AxiosHandler.get(`/auth/all-users?page=${page}&limit=10`);
      setEmpData(res?.data.data);

    } catch (error) {
      console.error(error);

    }finally{
      setloading(false)
    }
  };

  const GetAllTenentData = async () => {
    try {
      const res = await AxiosHandler.get("/tenant/get-all");
      setTenantData(res?.data?.data);

    } catch (error) {
      console.error(error);

    }
  };

  const GetAllRoleData = async () => {
    try {
      const res = await AxiosHandler.get("/role/get-all");
      setRoleAllData(res?.data?.data);

    } catch (error) {
      console.error("Error fetching roles:", error);
      setApiError("Failed to fetch roles. Please try again.");
    }
  };



  useEffect(() => {
    if (token) {
      GetUsers(page);
      GetAllTenentData();
      GetAllRoleData();
    }
  }, [token, page]);


  return (
    <>
      { isloading ? (
        <Loader />
      ) : (
        <div className=" p-2  h-screen shadow-lg ">
          <div className="flex justify-between items-center">
            <div className="flex w-full justify-end py-4">
              <button
                onClick={() => { setIsModalOpen(true); setEdiTable(null) }}
                className="px-4 py-2 bg-[#101b3d] text-white font-medium rounded-md hover:bg-blue-900 flex flex-row"
              >
                <BiPlus className="h-6 w-6 mr-1" />
                Add User
              </button>
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 bg-input bg-opacity-50 flex items-center justify-center p-4 z-10">
                <div className="bg-gradient-custom rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b p-4 bg-table">
                    <h2 className="text-lg font-semibold text-gray-200">
                      {editable ? "Edit User" : "Add User"}
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-100 hover:text-gray-200"
                    >
                      <MdClose className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="p-10">

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5 w-full flex flex-col"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <InputField
                          label="First Name"
                          type="text"
                          showPassword={false}
                          icon={FaUser}
                          value={values.fname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your First Name"
                          name="fname"
                        />
                        {touched.fname && errors.fname && (
                          <p className="text-red-400 text-sm">
                            {errors.fname}
                          </p>
                        )}
                        <InputField
                          label="Last Name"
                          type="text"
                          showPassword={false}
                          icon={FaUser}
                          value={values.lname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your Last Name"
                          name="lname"
                        />
                        {touched.lname && errors.lname && (
                          <p className="text-red-400 text-sm">
                            {errors.lname}
                          </p>
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

                        <div className="w-full">
                          <label className="text-white "> Role</label>
                          <select
                            className="w-full bg-input border py-2 rounded-lg text-white px-2 border-gray-600"
                            name="role"
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option selected disabled value="">
                              {" "}
                              Select role
                            </option>
                            {RoleAllData?.map((ele) => (
                              <option key={ele._id} value={ele._id}>
                                {ele?.role}
                              </option>
                            ))}
                          </select>
                          {touched.role && errors.role && (
                            <p className="text-red-500">{errors.role}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="tenant"
                            className="block text-sm text-white font-medium mb-1"
                          >
                            Tenant
                          </label>
                          <select
                            id="tenant"
                            name="tenant"
                            value={values.tenant}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className="bg-input w-full py-2 rounded-lg px-3 text-white"
                          >
                            <option selected disabled value="">
                              {" "}
                              Select tenant
                            </option>
                            {TenantData?.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item?.company_name}
                              </option>
                            ))}
                          </select>
                          {touched.tenant && errors.tenant && (
                            <p className="text-red-500">{errors.tenant}</p>
                          )}
                        </div>

                        <InputField
                          label="Phone Number"
                          type="text"
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
                        {!editable && (
                          <>
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
                          </>
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

          {EmpData?.length < 1 ? (
            <NoDataFound />
          ) : (
                <div className="overflow-x-auto w-[95%] rounded-xl mx-auto shadow-lg bg-[#0c1120]">
                  <table className="min-w-full table-auto text-sm text-left text-gray-300 divide-y divide-gray-700">
                    <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider"> 
                      <tr>
                        {[
                          "S No.",
                          "First Name",
                          "Last Name",
                          "Email",
                          "Phone",
                          "Role",
                          "Tenant",
                          "Approval Status",
                          "Status",
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
                      {EmpData?.map((user, index) => (
                        <tr
                          key={user._id}
                          className="hover:bg-[#2d2f32] transition-colors duration-150 whitespace-nowrap"
                        >
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3 capitalize">{user.fname}</td>
                          <td className="px-4 py-3 capitalize">{user.lname}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">{user.phone}</td>
                          <td className="px-4 py-3">{user.role?.role || "—"}</td>
                          <td className="px-4 py-3">{user.tenant?.company_name || "—"}</td>
                          <td className="px-4 py-3">
                            {user.employee_approve ? (
                              <span className="inline-block px-3 py-1 text-xs font-semibold text-green-500 bg-green-900/30 rounded-full">
                                Approved
                              </span>
                            ) : (
                              <button
                                onClick={() =>
                                  window.confirm("Verify this employee?") &&
                                  VerifyEmployee(user._id)
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                              >
                                Verify
                              </button>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {user.deactivate ? (
                              <button
                                onClick={() => handleChangeStatus("deactivate", user._id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                              >
                                Activate
                              </button>
                            ) : (
                              <button
                                onClick={() => handleChangeStatus("activate", user._id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                              >
                                Deactivate
                              </button>
                            )}
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            <button
                              onClick={() =>
                                window.confirm("Delete this user?") && DeleteUser(user._id)
                              }
                              title="Delete"
                              className="text-red-500 hover:text-red-700"
                            >
                              <RiDeleteBinFill className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setEdiTable(user);
                                setIsModalOpen(true);
                              }}
                              title="Edit"
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <RiEdit2Line className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
          
          )}
          <Pagination page={page} setPage={setPage} hasNextPage={EmpData.length === 10} /> 
        </div>
      )}
    </>
  );
};

export default AllEmployee;
