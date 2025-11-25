import { AllowedPaths } from "@/constants/static.data";
import RoleModel from "@/modals/RoleModel";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import {
  isCreateAccess,
  isDeleteAccess,
  isHaveAction,
  isModifyAccess,
  isViewAccess,
} from "@/utils/pageAccess";
import Access from "@/components/role/Access";
import { getRoles, deleteRoles } from "../services/ManageRoles.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TableSkeletonLoading } from "@/Skeletons/Components/TablesSkeleton";
import { useAuthStore } from "@/store/AuthStore";

const Roles = () => {
  // all context api hooks
  const { token, authenticate } = useAuthStore();

  // location hook
  const location = useLocation();

  // use States
  const [showModal, setModal] = useState(false);
  const [editable, setEditable] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const pathMap = AllowedPaths.reduce((acc, path) => {
    acc[path.name] = {
      bgColor: path.bgColor || "bg-blue-600/80",
      textColor: path.textColor || "text-white",
    };
    return acc;
  }, {});

  //===================Getting data from Tanstack===========================

  const { data: roles, isLoading: isRolesLoading } = useQuery({
    queryKey: ["roles", page],
    queryFn: () => getRoles({ page }),
    enabled: !!token,
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }) => deleteRoles({ id }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  const DeleteRolesData = async (id) => {
    if (window.confirm("Are you sure you want to delete roles data?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const filteredRoles = roles?.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.role?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.allowed_path?.some((p) => p.name.toLowerCase().includes(q))
    );
  });

  if (isViewAccess(authenticate, location)) {
    return <Access />;
  }

  return (
    <>
      <section className="min-h-screen w-full px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-3xl font-semibold text-white">Role Management</h1>
        <p className="text-gray-400">
          Manage user roles and permissions across the platform
        </p>

        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 border-[#6B728033] rounded-md border-b backdrop-blur-md bg-[#6B728033] my-6 sm:my-10 px-4 py-4">
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search roles..."
            className="bg-[#23252750] backdrop-blur-md py-2 px-4 w-full sm:w-1/3 rounded-md text-white"
          />

          {isCreateAccess() && (
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
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <RoleModel handleClose={() => setModal(false)} editable={editable} />
        )}

        {/* Table */}
        <div className="mt-10 w-full border bg-[#1a233c] border-[#1e2b45] rounded-xl mb-20 overflow-x-auto">
          {roles?.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-10">
              No roles found.
            </p>
          ) : (
            <div className="bg-[#0c1120] rounded-md shadow-xl">
              {isRolesLoading ? (
                <TableSkeletonLoading />
              ) : (
                <table className="min-w-full h-20 divide-y divide-[#1e2b45] text-sm">
                  <thead className="bg-[#1a233b]">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-white w-[20px]">
                        <input type="checkbox" />
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-white">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-white">
                        Allowed Paths
                      </th>
                      {isHaveAction() && (
                        <th className="px-4 py-3 text-left font-semibold text-white">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="text-white divide-y divide-[#1e2b45]">
                    {filteredRoles.map((roleItem, idx) => (
                      <tr
                        key={idx}
                        className="bg-[#151c39] transition w-10 duration-200"
                      >
                        <td className="px-4 py-4">
                          <input type="checkbox" />
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-semibold">{roleItem.role}</p>
                          <p className="text-sm text-gray-400">
                            {roleItem.description || "No description provided"}
                          </p>
                        </td>
                        <td className="px-4 w-[60%] py-4">
                          {roleItem.allowed_path?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {roleItem.allowed_path
                                .slice(0, 5)
                                .map((path, i) => {
                                  const style = pathMap[path.name] || {
                                    bgColor: `bg-blue-600/80`,
                                    textColor: "text-white",
                                    border: ``,
                                  };
                                  return (
                                    <span
                                      key={i}
                                      className={`px-3 py-1 rounded text-xs font-medium ${style.bgColor} ${style.textColor} ${style.border}`}
                                    >
                                      {path.name}
                                    </span>
                                  );
                                })}
                              {roleItem?.allowed_path?.length > 6 && (
                                <span className="bg-[#2e3a5e] text-white px-3 py-1 rounded text-xs font-medium">
                                  +{roleItem?.allowed_path?.length - 6} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">
                              No paths selected
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-4">
                            {isModifyAccess() && (
                              <FiEdit2
                                className="cursor-pointer text-gray-300 hover:text-blue-400"
                                onClick={() => {
                                  setEditable(roleItem);
                                  setModal(true);
                                }}
                              />
                            )}
                            {isDeleteAccess() && (
                              <FiTrash2
                                className="cursor-pointer text-gray-300 hover:text-red-500"
                                onClick={() => DeleteRolesData(roleItem._id)}
                              />
                            )}
                            {/* <FiMoreVertical className="cursor-pointer text-gray-300 hover:text-gray-100" /> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            page={page}
            setPage={setPage}
            hasNextPage={filteredRoles?.length === 5}
            total={filteredRoles?.length}
            limit={5}
          />
        </div>
      </section>
    </>
  );
};

export default Roles;
