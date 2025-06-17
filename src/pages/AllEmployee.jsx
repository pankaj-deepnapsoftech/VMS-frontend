/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import InputField from "@/components/InputField";
import Loader from "@/components/Loader/Loader";
import NoDataFound from "@/components/NoDataFound";
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAllEmployeeContext, useAuthContext } from "@/context";
import { BaseValidationSchema, EditUser } from "@/Validation/AuthValidation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { RiDeleteBinFill, RiEdit2Line } from "react-icons/ri";
import Pagination from "./Pagination";
import { IoClose } from "react-icons/io5";

const AllEmployee = () => {
  const { VerifyEmployee, DeleteUser } = useAllEmployeeContext();

  const { token, ChangeStatus } = useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editable, setEdiTable] = useState(null);
  const [EmpData, setEmpData] = useState([]);
  const [TenantData, setTenantData] = useState([]);
  const [RoleAllData, setRoleAllData] = useState([]);
  const [page, setPage] = useState(1);
  const [isloading, setloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiError, setApiError] = useState(null);
  const [partners, setPartners] = useState([])
  const [partOfPartner, setPartOfPartner] = useState(null);
  const [partOfSecurend, setPartOfSecurend] = useState(null);


  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: editable || {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      password: "",
      tenant: "",
      role: "",
      partner: "",
      email_verification: true,
      part_securend: null,
    },
    validationSchema: editable ? EditUser : BaseValidationSchema,
    enableReinitialize: true,
    onSubmit: async (value) => {
      setloading(true);

      setApiError(null); // Clear previous errors

      const filteredData = Object.fromEntries(
        Object.entries(value).filter(([key, value]) =>
          value !== "" && value !== null && value !== undefined
        )
      );
      try {
        if (editable) {
          await AxiosHandler.put(`/auth/update-user/${editable._id}`, filteredData);
        } else {
          await AxiosHandler.post(`/auth/create`, filteredData);
        }
        setIsModalOpen(false);
        GetUsers();
        resetForm();
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "An unexpected error occurred";
        setApiError(message);
        console.error("API Error:", message);
      } finally {
        setloading(false);
        setPartOfPartner(null);
        setPartOfSecurend(null);
      }
    },
  });

  const filteredData = EmpData?.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.fname?.toLowerCase().includes(search) ||
      user.lname?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.phone?.toLowerCase().includes(search) ||
      user.role?.role?.toLowerCase().includes(search) ||
      user.tenant?.company_name?.toLowerCase().includes(search)
    );
  });

  const GetUsers = async (page = 1) => {
    setloading(true);
    try {
      const res = await AxiosHandler.get(
        `/auth/all-users?page=${page}&limit=10`
      );
      setEmpData(res?.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  const handleChangeStatus = async(type, id) => {
    if (window.confirm("Are you sure you want to change this user's status?")) {
      const deactivate = type === "activate";
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await ChangeStatus({ deactivate }, id);
      GetUsers()
    }
  };


  const GetAllPartnerData = async () => {
    try {
      const res = await AxiosHandler.get("/partner/get-all");
      setPartners(res?.data?.data);
    } catch (error) {
      console.error(error);
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


  const isPartOfSecurend = (e) => {
    if (e.target.value === "no") {
      setFieldValue("part_securend", false)
      setPartOfSecurend("no")
    } else if (e.target.value === "yes") {
      setFieldValue("part_securend", true)
      setPartOfSecurend("yes")


    }
  }

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
      GetAllPartnerData()
    }
  }, [token, page]);

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <div className="h-screen shadow-lg ">
          <div className="max-w-screen px-4 h-16 border-[#6B728033] flex items-center gap-4 rounded-md backdrop-blur-md bg-[#6B728033] my-10 mx-5">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#23252750] backdrop-blur-md py-2 w-1/3 text-white px-4 rounded-md "
            />
            <div className="flex w-full justify-end py-4">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setEdiTable(null);
                }}
                className="px-4 py-2 mr-5 bg-blue-800 hover:bg-blue-900 rounded-md text-white font-medium flex items-center gap-2"
              >
                <BiPlus className="h-6 w-6 mr-1" />
                Add User
              </button>
            </div>
          </div>

          {filteredData?.length < 1 ? (
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
                      "Partner",
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
                  {filteredData.map((user, index) => (
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
                      <td className="px-4 py-3">{user.partner?.company_name || "—"}</td>
                      <td className="px-4 py-3">
                        {user.tenant?.company_name || "—"}
                      </td>
                    
                      <td className="px-4 py-3">
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
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() =>
                            window.confirm("Delete this user?") &&
                            DeleteUser(user._id)
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
          <Pagination
            page={page}
            setPage={setPage}
            hasNextPage={EmpData.length === 10}
          />
        </div>
      )}

      {/* MODAL */}
      <div
        className={`absolute top-0 left-0 z-50 min-h-screen bg-gradient-custom w-full text-white ${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } transition-opacity duration-500 ease-in-out`}
      >
        <div className="w-full flex justify-between items-center py-6 px-10">
          <div className="text-2xl text-center w-full">Add Users</div>
          <button
            onClick={() => {
              setIsModalOpen(false);
              formik.resetForm();
            }}
            className="text-3xl hover:text-red-400 transition duration-300"
          >
            <IoClose />
          </button>
        </div>
        <div className="flex justify-center px-10 py-8">
          <div className="flex-1 px-8 py-10 rounded-md shadow-md max-w-5xl bg-[#2a282e80]">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div>
                <h1 className="text-3xl font-semibold text-white mb-2">
                  {editable ? "Edit User Details" : "Add a New User"}
                </h1>
                <p className="text-gray-400 text-sm">
                  Enter user information to assign roles and tenant access. Make
                  sure all fields are accurate before saving.
                </p>
              </div>

              {apiError && (
                <div className="mb-4 text-red-500 text-sm font-medium bg-red-100 px-4 py-2 rounded">
                  {apiError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Name */}
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
                  <p className="text-red-400 text-sm">{errors.fname}</p>
                )}

                {/* Last Name */}
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
                  <p className="text-red-400 text-sm">{errors.lname}</p>
                )}

                {/* Email */}
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

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full bg-zinc-700 text-gray-200 rounded-md px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-sky-500 outline-none"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {RoleAllData?.map((ele) => (
                      <option key={ele._id} value={ele._id}>
                        {ele?.role}
                      </option>
                    ))}
                  </select>
                  {touched.role && errors.role && (
                    <p className="text-red-400 text-sm">{errors.role}</p>
                  )}
                </div>

                <div>
                  <h3>Part of Securend</h3>
                  <div className="flex gap-4" >
                    <label>
                      <input type="radio" name="securend" value="yes" onChange={isPartOfSecurend} /> Yes
                    </label>
                    <label>
                      <input type="radio" name="securend" value="no" onChange={isPartOfSecurend} /> No
                    </label>
                  </div>

                </div>

                {partOfSecurend === "no" && <div>
                  <h3>Part of Partner</h3>
                  <div className="flex gap-4" >
                    <label>
                      <input type="radio" name="Partner" value="yes" onChange={(e) => setPartOfPartner(e.target.value)} /> Yes
                    </label>
                    <label>
                      <input type="radio" name="Partner" value="no" onChange={(e) => setPartOfPartner(e.target.value)} /> No
                    </label>
                  </div>

                </div>}


                {partOfPartner === "no" && <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Tenant <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tenant"
                    name="tenant"
                    value={values.tenant}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full bg-zinc-700 text-gray-200 rounded-md px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    <option value="" disabled>
                      Select tenant
                    </option>
                    {TenantData?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item?.company_name}
                      </option>
                    ))}
                  </select>
                  {touched.tenant && errors.tenant && (
                    <p className="text-red-400 text-sm">{errors.tenant}</p>
                  )}
                </div>}


                {partOfPartner === "yes" && <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Partners <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tenant"
                    name="partner"
                    value={values.partner}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full bg-zinc-700 text-gray-200 rounded-md px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    <option value="" disabled>
                      Select Partners
                    </option>
                    {partners?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item?.company_name}
                      </option>
                    ))}
                  </select>
                  {touched.tenant && errors.tenant && (
                    <p className="text-red-400 text-sm">{errors.tenant}</p>
                  )}
                </div>}

                {/* Tenant */}


                {/* Phone Number */}
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

                {/* Password - Only if not editing */}
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

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-md border border-gray-500 text-white hover:bg-gray-700 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-tr from-sky-500 to-sky-700 text-white rounded-md hover:shadow-lg transition-all duration-300"
                >
                  {editable ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default AllEmployee;
