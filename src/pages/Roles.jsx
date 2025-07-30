import Loader from "@/components/Loader/Loader";
import { AxiosHandler } from "@/config/AxiosConfig";
import { AllowedPaths } from "@/constants/static.data";
import { useAuthContext } from "@/context";
import { RoleSchema } from "@/Validation/RoleValidations";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Pagination from "./Pagination";
import RoleModel from "@/modals/RoleModel";

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
        <section className="min-h-screen w-full px-4 sm:px-6 py-6 sm:py-8">
            <h1 className="text-3xl font-semibold text-white">Role Management</h1>
            <p className="text-gray-400">Manage user roles and permissions accross the platform</p>
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 h-auto sm:h-16 border-[#6B728033] rounded-md border-b backdrop-blur-md bg-[#6B728033] my-6 sm:my-10 mx-0 sm:mx-5 px-4 py-4">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search..."
              className="bg-[#23252750] backdrop-blur-md py-2 px-4 w-full sm:w-1/3 rounded-md text-white"
            />
            <button
              onClick={() => {
                setModal(true);
                setEditable(null);
              }}
              className="px-4 py-2 bg-button hover:bg-hoverbutton rounded-md text-white font-medium flex items-center gap-2 w-full sm:w-auto"
            >
              <BiPlus className="h-5 w-5" />
              Add Role
            </button>
          </div>
          {/* Modal */}
          {showModal && (
          <RoleModel handleClose={()=>setModal(false)} />
          )}

          {/* Table */}
          <div className="mt-10 max-w-full sm:max-w-6xl mx-auto px-2 sm:px-0">
            {filteredRoles.length === 0 ? (
              <p className="text-center text-gray-400 text-sm">
                No roles found.
              </p>
            ) : (
              <div className="overflow-x-auto bg-[#0c1120] rounded-md shadow-xl">
                <table className="min-w-full divide-y divide-gray-700 text-sm">
                  <thead className="bg-gradient-to-bl from-[#0a0f39] via-[#080d27] to-[#050b20]">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold text-white">
                        Role
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold text-white">
                        Allowed Paths
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {filteredRoles.map((roleItem, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-700 hover:bg-[#1e1e1e] transition"
                      >
                        <td className="px-4 sm:px-6 py-4 text-white">
                          {roleItem.role}
                        </td>
                        <td className="px-4 sm:px-6 py-4">
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
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => {
                                setEditable(roleItem);
                                setModal(true);
                              }}
                              className="flex items-center gap-1 bg-gray-700 hover:bg-blue-500 text-white text-sm px-5 py-1 rounded transition"
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
