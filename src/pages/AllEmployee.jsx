import InputField from "@/components/InputField";
import Loader from "@/components/Loader/Loader";
import NoDataFound from "@/components/NoDataFound";
import { AxiosHandler } from "@/config/AxiosConfig";
import {
  useAllEmployeeContext,
  useAuthContext,
  useDataContext,
} from "@/context";
import { BaseValidationSchema, EditUser } from "@/Validation/AuthValidation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import {
  FaEnvelope,
  FaLock,
  FaPhone,
  FaRegTrashAlt,
  FaUser,
} from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import Pagination from "./Pagination";
import { IoClose, IoSearch } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { isCreateAccess, isDeleteAccess, isHaveAction, isModifyAccess, isViewAccess } from "@/utils/pageAccess";
import Access from "@/components/role/Access";

const AllEmployee = () => {
  // all context api hooks
  const { DeleteUser, GetUsers,
    EmpData } = useAllEmployeeContext();
  const { partners } = useDataContext();
  const { token, ChangeStatus, authenticate } = useAuthContext();
  const { TenantData } = useAllEmployeeContext();
  // use location hook

  const location = useLocation()

  // all useState

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editable, setEdiTable] = useState(null);


  const [RoleAllData, setRoleAllData] = useState([]);
  const [page, setPage] = useState(1);
  const [isloading, setloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiError, setApiError] = useState(null);
  const [partOfPartner, setPartOfPartner] = useState(null);

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
    initialValues: editable ? {...editable,role:editable?.role?._id} : {
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
        Object.entries(value).filter(
          ([, value]) => value !== "" && value !== null && value !== undefined
        )
      );
      try {
        if (editable) {
          await AxiosHandler.put(
            `/auth/update-user/${editable._id}`,
            filteredData
          );
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



  const handleChangeStatus = async (type, id) => {
    if (window.confirm("Are you sure you want to change this user's status?")) {
      const deactivate = type === "activate";
      await ChangeStatus({ deactivate }, id);
      GetUsers();
    }
  };

  const isPartOfSecurend = (e) => {
    if (e.target.value === "no") {
      setFieldValue("part_securend", false);
    } else if (e.target.value === "yes") {
      setFieldValue("part_securend", true);
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
      GetAllRoleData();
    }
  }, [token, page]);

  if (isViewAccess(authenticate, location)) {
    return <Access />
  }

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <div className="min-h-screen shadow-lg py-4">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Optional Left Side Heading */}
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-white">All Users</h2>
              <span className="text-subtext text-sm">
                Manage your organization employees
              </span>
            </div>

            {/* Right Side Button */}
            {isCreateAccess() && <button
              onClick={() => {
                setIsModalOpen(true);
                setEdiTable(null);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-button hover:bg-hoverbutton rounded-md text-white font-medium whitespace-nowrap"
            >
              <BiPlus className="h-5 w-5" />
              Add User
            </button>}
          </div>

          <div className="w-full  min-h-screen p-6">
            <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-700 relative">
                <div className="relative">
                  <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
                  <input
                    type="search"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-input backdrop-blur-md py-2 w-1/3 text-white ps-7 pe-3 rounded-md "
                  />
                </div>
              </div>

              {/* Table */}
              {filteredData?.length < 1 ? (
                <NoDataFound />
              ) : (
                <div className="overflow-x-auto custom-scrollbar w-full">
                  <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
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
                          isModifyAccess() && "Status",
                          isHaveAction() && "Actions",
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
                          <td className="px-4 py-3">{(page - 1) * 10 + 1 + index}</td>
                          <td className="px-4 py-3 capitalize">{user.fname}</td>
                          <td className="px-4 py-3 capitalize">{user.lname}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">{user.phone}</td>
                          <td className="px-4 py-3">
                            {user.role?.role || "—"}
                          </td>
                          <td className="px-4 py-3">
                            {user.tenant?.company_name || "—"}
                          </td>
                          <td className="px-4 py-3">
                            {user.partner?.company_name || "—"}
                          </td>
                          <td className="px-4 py-3">
                            {isModifyAccess() && (user.deactivate ? (
                              <button
                                onClick={() =>
                                  handleChangeStatus("deactivate", user._id)
                                }
                                className="bg-[#395042] hover:bg-green-700 text-green-500 px-3 py-1 rounded-full text-xs"
                              >
                                Activate
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleChangeStatus("activate", user._id)
                                }
                                className="bg-[#3E212D] hover:bg-[#2b161e] text-[#EC6C6D] px-3 py-1 rounded-full text-xs"
                              >
                                Deactivate
                              </button>
                            ))}
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            {isDeleteAccess() && <button
                              onClick={() => {
                                if (window.confirm("Delete this user?")) {
                                  DeleteUser(user._id)
                                }

                              }
                              }
                              title="Delete"
                              className="text-subtext hover:text-subTextHover"
                            >
                              <FaRegTrashAlt className="w-5 h-5" />
                            </button>}
                            {isModifyAccess() && <button
                              onClick={() => {
                                setEdiTable(user);
                                setIsModalOpen(true);
                              }}
                              title="Edit"
                              className="text-subtext hover:text-blue-700"
                            >
                              <RiEdit2Line className="w-5 h-5" />
                            </button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Footer */}
              <Pagination
                page={page}
                setPage={setPage}
                hasNextPage={EmpData.length === 10}
                total={EmpData.length}
              />
            </div>
          </div>
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
              // eslint-disable-next-line no-undef
              formik.resetForm();
            }}
            className="text-3xl hover:text-gray-400 transition duration-300"
          >
            <IoClose />
          </button>
        </div>
        <div className="flex justify-center px-4 sm:px-6 py-6 overflow-y-auto max-h-[90vh]">
          <div className="w-full sm:max-w-4xl bg-modalBg p-6 sm:p-10 rounded-md shadow-md overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  isError={touched.fname && errors.fname}
                  error={errors.fname}
                />

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
                  isError={touched.lname && errors.lname}
                  error={errors.lname}
                />

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
                  isError={touched.email && errors.email}
                  error={errors.email}
                />

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full bg-input text-gray-400 rounded-md px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-sky-500 outline-none"
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
                  <div className="flex gap-4">
                    <label>
                      <input
                        type="radio"
                        name="securend"
                        value="yes"
                        checked={values.part_securend}
                        onChange={isPartOfSecurend}
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="securend"
                        value="no"
                        checked={values.part_securend === false}
                        onChange={isPartOfSecurend}
                      />{" "}
                      No
                    </label>
                  </div>
                </div>

                {values.part_securend == false && (
                  <div>
                    <h3>Part of Partner</h3>
                    <div className="flex gap-4">
                      <label>
                        <input
                          type="radio"
                          name="Partner"
                          value="yes"
                          onChange={(e) => setPartOfPartner(e.target.value)}
                        />{" "}
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Partner"
                          value="no"
                          onChange={(e) => setPartOfPartner(e.target.value)}
                        />{" "}
                        No
                      </label>
                    </div>
                  </div>
                )}

                {partOfPartner === "no" && (
                  <div>
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
                      <option value="" disabled selected>
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
                  </div>
                )}

                {partOfPartner === "yes" && (
                  <div>
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
                      <option value="" disabled selected>
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
                  </div>
                )}

                {/* Tenant */}

                {/* Phone Number */}
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
                  isError={touched.phone && errors.phone}
                  error={errors.phone}
                />

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
                      isError={touched.password && errors.password}
                      error={errors.password}
                    />
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
                  className="px-5 py-2 bg-button text-white rounded-md hover:shadow-lg hover:scale-105 transition duration-200"
                >
                  {editable ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEmployee;
