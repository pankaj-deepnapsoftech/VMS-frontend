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
import { FaCompass, FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { RiDeleteBinFill, RiEdit2Line } from "react-icons/ri";

const AllEmployee = () => {
  const {
    loading,
    allEmployeesData,
    page,
    VerifyEmployee,
    AllEmployee,
    AllClientSME,
    DeleteUser,
  } = useAllEmployeeContext();
  const { getOrgnizationData } = useScheduleAssessmentContext();
  const { authenticate, token, Signup, ChangeStatus, runner } =
    useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editable, setEdiTable] = useState(null);
  const [EmpData, setEmpData,] = useState([]);
  const [TententData, setTententData] = useState([]);
  const [RoleAllData, setRoleAllData] = useState([]);
 
  const { values, errors, touched, handleBlur, handleChange, handleSubmit,resetForm } =
    useFormik({
      initialValues: editable ||  {
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: "",
        tenant: "",
        role: "",
       
      },
      validationSchema: BaseValidationSchema,
      enableReinitialize:true,
      onSubmit: async (value) => {
        try {
         if(editable){
           const res = await AxiosHandler.post(`/auth/create`, value);
         }
          
          setIsModalOpen(false);
          GetUsers()
          resetForm()
        } catch (error) {
          console.error( error);
        }
      },
    });

  const handleChangeStatus = (type, id) => {
    if (window.confirm("Are you sure you want to change this user's status? ")) {
      switch (type) {
        case "activate":
          ChangeStatus({ deactivate: true }, id);
          break;
        case "deactivate":
          ChangeStatus({ deactivate: false }, id);
          break;
        default:
          console.warn("Unknown status change type:", type);
      }
    }
  };

  const GetUsers = async () => {
    try {
      const res = await AxiosHandler.get("/auth/all-users");
      setEmpData(res?.data?.data);
    
    } catch (error) {
      console.error( error);
     
    }
  };

  const GetAllTenentData = async () => {
    try {
      const res = await AxiosHandler.get("/tenant/get-all");
      setTententData(res?.data?.data);
    
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
      GetAllTenentData();
      GetAllRoleData();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      GetUsers();
    }
  }, [token, page, runner]);



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" p-2 bg-[#2a2c2f] h-screen shadow-lg ">
          <div className="flex justify-between items-center">
            <div className="flex w-full justify-end py-4">
              <button
                  onClick={() => { setIsModalOpen(true); setEdiTable(null) }}
                className="px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666] text-white font-medium rounded-md hover:bg-blue-700 flex flex-row"
              >
                <BiPlus className="h-6 w-6 mr-1" />
                Add User
              </button>
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 bg-input bg-opacity-50 flex items-center justify-center p-4 z-10">
                <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b p-4 bg-table">
                    <h2 className="text-lg font-semibold text-gray-200">
                      { editable ? "Edit User" : "Add User"}
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
                            {TententData?.map((item) => (
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
                          <p className="text-red-400 text-sm">
                            {errors.password}
                          </p>
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
                <div className="overflow-x-auto  rounded-lg w-full ">
                  <table className="table-auto w-full    border-b bg-[#2d333b]">
                <thead className="bg-gradient-to-bl from-[#333333] to-[#666666] text-white ">
                  <tr>
                    <th className="px-4 whitespace-nowrap py-1 text-sm border text-left">
                      S No.
                    </th>
                    <th className="px-4 whitespace-nowrap py-1 text-sm border text-left">
                      Full Name
                    </th>
                    <th className="px-4 whitespace-nowrap py-1 text-sm border text-left">
                      Last Name
                    </th>
                    <th className="px-4 whitespace-nowrap py-1 text-sm border text-left">
                      Email
                    </th>
                    <th className="px-4 whitespace-nowrap py-1 text-sm border text-left">
                      Phone
                    </th>
                    {/* <th className="px-4 whitespace-nowrap py-1 text-sm border text-left">Role</th> */}
                    <th className="px-4 whitespace-nowrap py-1 text-sm border text-left">
                      Approval Status
                    </th>
                    <th className="px-4 whitespace-nowrap py-1 text-sm border text-left">
                      Status
                    </th>
                    <th className="px-4 whitespace-nowrap py-1 text-sm border text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {EmpData?.map((user, index) => (
                    <tr
                      key={user._id}
                      className="bg-[#2d333b] text-gray-200 hover:bg-[#53565c] transition duration-200"
                    >
                      <td className="px-2 py-1 border">{index + 1}</td>
                      <td className="px-2 py-1 border">{user.fname}</td>
                      <td className="px-2 py-1 border">{user.lname}</td>
                      <td className="px-2 py-1 border">{user.email}</td>
                      <td className="px-2 py-1 border">{user.phone}</td>
                      {/* <td className="px-2 py-1 border">{user.role}</td> */}
                      <td className="px-2 py-2 border">
                        {user?.employee_approve ? (
                          <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                            Approved
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              if (window.confirm("Are you sure you want to verify this employee?")) {
                                VerifyEmployee(user?._id);
                              }
                            }}

                            className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                          >
                            Verify
                          </button>
                        )}
                      </td>
                      <td className="px-2 py-1 border">
                        {user?.deactivate ? (
                          <button
                            onClick={() =>
                              handleChangeStatus("deactivate", user._id)
                            }
                            type="button"
                            className="bg-green-400 text-white px-3 py-1 rounded-2xl"
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              handleChangeStatus("activate", user._id)
                            }
                            className="bg-red-400/60 text-white px-3 py-1 rounded-2xl"
                          >
                            Deactivate
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 flex border  gap-2"> 
                        <button
                          onClick={() => {
                            if (window.confirm("are you sure you want to delete this user?")) {
                              DeleteUser(user._id);
                            }
                          }}
                          className="text-red-600  hover:text-red-800 transition-colors duration-150 border-none" 
                          title="Delete"
                        >
                          <RiDeleteBinFill className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEdiTable(user);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-150 border-none" 
                          title="Edit"
                        >
                          <RiEdit2Line className="h-4 w-4" />
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

export default AllEmployee;