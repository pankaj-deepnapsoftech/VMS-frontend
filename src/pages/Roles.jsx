import Loader from "@/components/Loader/Loader";
import { AxiosHandler } from "@/config/AxiosConfig";
import { AllowedPaths } from "@/constants/static.data";
import { useAuthContext } from "@/context";
import { RoleSchema } from "@/Validation/RoleValidations";
import { useFormik } from "formik";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Pagination from "./Pagination";

const Roles = () => {
  const [showModal, setModal] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [editable, setEditable] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { token } = useAuthContext();

  const GetData = async (pg = 1) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/role/get?page=${pg}&limit=10`);
      const roles = res?.data?.data || [];
      setRolesList(roles);
      setFilteredRoles(roles); // Set initially unfiltered data
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      role: editable?.role || "",
      allowed_path: editable?.allowed_path || [],
      _id: editable?._id || null,
    },
    validationSchema: RoleSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (editable) {
          await AxiosHandler.put(`/role/update/${values._id}`, values);
        } else {
          await AxiosHandler.post("/role/create", values);
        }
        await GetData(page);
        setModal(false);
        formik.resetForm();
        setEditable(null);
      } catch (error) {
        console.error("Error saving role:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const onSelect = (selectedList) => {
    formik.setFieldValue("allowed_path", selectedList);
  };

  const onRemove = (selectedList) => {
    formik.setFieldValue("allowed_path", selectedList);
  };

  const DeleteData = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    setLoading(true);
    try {
      await AxiosHandler.delete(`/role/delete/${_id}`);
      await GetData(page);
    } catch (error) {
      console.error("Error deleting role:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (!value) {
      setFilteredRoles(rolesList);
    } else {
      const filtered = rolesList.filter((role) =>
        role.role.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRoles(filtered);
    }
  };

  useEffect(() => {
    if (token) {
      GetData(page);
    }
  }, [token, page]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="h-screen w-full px-6 py-8">
          {/* Top Bar */}
          <div className="max-w-screen px-4 justify-between h-16 border-[#6B728033] flex items-center gap-4 rounded-md backdrop-blur-md bg-[#6B728033] my-10 mx-5">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search..."
              className="bg-[#23252750] backdrop-blur-md py-2 w-1/3 px-4 rounded-md text-white"
            />
            <button
              onClick={() => {
                setModal(true);
                setEditable(null);
              }}
              className="px-4 py-2 bg-blue-800 hover:bg-blue-900 mr-5 rounded-md text-white font-medium flex items-center gap-2"
            >
              <BiPlus className="h-5 w-5" />
              Add Role
            </button>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300">
              <form
                onSubmit={formik.handleSubmit}
                className="bg-input rounded-lg shadow-xl w-full max-w-lg"
              >
                <div className="bg-table border-b px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">
                    {editable ? "Edit Role" : "Add Role"}
                  </h2>
                  <button
                    onClick={() => {
                      setModal(false);
                      formik.resetForm();
                      setEditable(null);
                    }}
                    type="button"
                    className="text-gray-300 hover:text-red-500 transition duration-200 text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 bg-[#0c1120]">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Role Name
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter role name"
                      className="w-full px-3 py-2 rounded-md bg-input text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.role && formik.errors.role && (
                      <p className="text-sm text-red-500">
                        {formik.errors.role}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 z-[100]">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Allowed Paths
                    </label>
                    <Multiselect
                      options={AllowedPaths}
                      selectedValues={formik.values.allowed_path}
                      onSelect={onSelect}
                      onRemove={onRemove}
                      displayValue="name"
                      className="z-10 bg-input"
                    />
                    {formik.touched.allowed_path &&
                      formik.errors.allowed_path && (
                        <p className="text-sm text-red-500">
                          {formik.errors.allowed_path}
                        </p>
                      )}
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setModal(false);
                        formik.resetForm();
                        setEditable(null);
                      }}
                      className="px-4 py-2 bg-gray-400 text-gray-800 rounded-md hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Table */}
          <div className="mt-10 max-w-6xl mx-auto">
            {filteredRoles.length === 0 ? (
              <p className="text-center text-gray-400 text-sm">
                No roles found.
              </p>
            ) : (
              <div className="overflow-x-auto bg-[#0c1120] rounded-md shadow-xl">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gradient-to-bl from-[#0a0f39] via-[#080d27] to-[#050b20]">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Allowed Paths
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-300">
                    {filteredRoles.map((roleItem, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-700 hover:bg-[#1e1e1e] transition"
                      >
                        <td className="px-6 py-4 text-white">
                          {roleItem.role}
                        </td>
                        <td className="px-6 py-4">
                          {roleItem.allowed_path?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {roleItem.allowed_path.map((path, i) => (
                                <span
                                  key={i}
                                  className="bg-blue-600/80 text-white px-3 py-1 rounded text-xs"
                                >
                                  {path.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">
                              No paths selected
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                setEditable(roleItem);
                                setModal(true);
                              }}
                              className="flex items-center gap-1 bg-gray-700 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded transition"
                            >
                              <FiEdit2 />
                              Edit
                            </button>
                            <button
                              onClick={() => DeleteData(roleItem._id)}
                              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition"
                            >
                              <FiTrash2 />
                              Delete
                            </button>
                          </div>
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
              hasNextPage={rolesList?.length === 10}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Roles;
