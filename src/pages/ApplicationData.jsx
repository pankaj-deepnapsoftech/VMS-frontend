/* eslint-disable react/prop-types */
/* eslint-disable no-constant-binary-expression */
import { Suspense, useEffect, useState } from "react";
import { useAuthContext, useVulnerabililtyDataContext } from "@/context";
import Loader from "@/components/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import ExpectionModal from "@/modals/ExpectionModal";
import ExploitDetail from "@/modals/ExploitDetail";
import useAccessPartner from "@/hooks/AccessPartner";
import Pagination from "./Pagination";
import { IoSearch, IoWarningOutline } from "react-icons/io5";
import NoDataFound from "@/components/NoDataFound";
import { calculateVRS } from "@/utils/vulnerableOperations";
import { StatusModal } from "@/modals/StatusModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { PopupMenu } from "@/modals/PopupManue";
import { GrStatusGood } from "react-icons/gr";
import {
  isDeleteAccess,
  isHaveAction,
  isModifyAccess,
  isViewAccess,
} from "@/utils/pageAccess";
import Access from "@/components/role/Access";

export function ApplicationData() {
  const { loading, GetApplicationData, allApplicationData, DeleteData } =
    useVulnerabililtyDataContext();
  const { token, authenticate } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { closeModal, isOpen, openModal } = useAccessPartner();

  const showTitle = (header) => {
    if (header === "VRS") {
      return "Vulnerability Risk Score";
    }
  };

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tenant, setTenant] = useState("");
  const [exploitDetails, setExploitDetails] = useState([]);
  const [status, setStatus] = useState(null);

  // Popup Menu States
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // 🔹 New states for Assign User Modal
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  // Fetch users API
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // Menu toggle logic
  const toggleMenu = (index, e) => {
    if (activeMenu === index) {
      setActiveMenu(null);
      setMenuPosition(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 120,
      });
      setActiveMenu(index);
    }
  };

  const closeMenu = () => {
    setActiveMenu(null);
    setMenuPosition(null);
  };

  // Exception Modal Handler
  const handleExpectionModal = (item) => {
    if (!item.Expection) {
      setIsModalOpen(true);
      setSelectedId(item._id);
    } else {
      alert("Exception already exists for this record");
    }
  };

  // API calls
  useEffect(() => {
    if (token) {
      GetApplicationData(currentPage, tenant);
    }
  }, [tenant, currentPage, token]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTenant(params.get("tenant") || "");
  }, [location.search]);

  if (isViewAccess(authenticate, location)) {
    return <Access />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gradient-custom min-h-screen p-4 rounded-lg text-white">
          {/* HEADER */}
          <div className="w-full px-6 mt-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                All Application Data
              </h2>
              <span className="text-subtext text-sm">
                Manage your Application Data
              </span>
            </div>

            {/* 🔹 Assign User Button */}
            <button
              onClick={() => {
                setIsAssignModalOpen(true);
                fetchUsers();
              }}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-900 text-white rounded-md"
            >
              Assign User
            </button>
          </div>

          {/* TABLE WRAPPER */}
          <div className="w-full min-h-screen p-6">
            <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
              {/* SEARCH */}
              <div className="px-6 py-4 border-b border-gray-700 relative">
                <div className="relative">
                  <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
                  <input
                    type="search"
                    placeholder="Search data..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-input backdrop-blur-md py-2 w-1/3 text-white ps-7 pe-3 rounded-md "
                  />
                </div>
              </div>

              {/* TABLE */}
              {allApplicationData?.length < 1 ? (
                <NoDataFound />
              ) : (
                <div className="overflow-x-auto w-full custom-scrollbar">
                  <table className="table-fixed min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
                    <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
                      <tr>
                        {[
                          "S No.",
                          "Title",
                          "Scan Type",
                          "Threat Type",
                          "Severity",
                          "Asset",
                          "VRS",
                          "Status",
                          isHaveAction() && "Actions",
                        ].map((header) => (
                          <th
                            title={showTitle(header)}
                            key={header}
                            className="px-4 py-3 border-b border-gray-600 font-medium"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {allApplicationData.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-slate-700 hover:bg-[#1E293B] transition"
                        >
                          <td className="px-4 py-3">
                            {(currentPage - 1) * 10 + 1 + index}
                          </td>
                          <td className="px-4 py-3">{item.Title || "-"}</td>
                          <td className="px-4 py-3">{item.scan_type || "-"}</td>
                          <td className="px-4 py-3">
                            {item.asset_type || "-"}
                          </td>
                          <td className="px-4 py-3">
                            {item?.Severity?.name || "-"}
                          </td>
                          <td className="px-4 py-3">
                            {item.BusinessApplication?.name || "-"}
                          </td>
                          <td className="px-4 py-3">
                            {calculateVRS(
                              item.EPSS,
                              item.exploit_complexity,
                              item.Exploit_Availale,
                              item.threat_type
                            ) || "-"}
                          </td>
                          <td className="px-4 py-3">{item?.status || "-"}</td>
                          {isHaveAction() && (
                            <td className="px-4 py-3">
                              <button
                                className="hover:bg-gray-700 px-3 py-2 rounded-lg"
                                onClick={(e) => toggleMenu(index, e)}
                              >
                                <BsThreeDotsVertical />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* PAGINATION */}
              <Pagination
                page={currentPage}
                setPage={setCurrentPage}
                hasNextPage={allApplicationData.length === 10}
                total={allApplicationData.length}
              />
            </div>
          </div>

          {/* 🔹 ASSIGN USER MODAL */}
          {isAssignModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#1a1f2e] p-6 rounded-lg w-[400px]">
                <h2 className="text-xl font-semibold mb-4">Assign User</h2>

                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-800 text-white mb-4"
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsAssignModalOpen(false)}
                    className="px-4 py-2 bg-gray-600 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      console.log("Assigned User:", selectedUser);
                      setIsAssignModalOpen(false);
                    }}
                    className="px-4 py-2 bg-blue-600 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* EXISTING MODALS (untouched) */}
          {isModalOpen && (
            <ExpectionModal
              setIsModalOpen={setIsModalOpen}
              creator={selectedId}
            />
          )}
          <ExploitDetail
            data={exploitDetails}
            isOpen={isOpen}
            onClose={closeModal}
          />
          {isStatusModalOpen && (
            <StatusModal
              setIsModalOpen={setIsStatusModalOpen}
              defaultData={status}
            />
          )}
        </div>
      )}
    </Suspense>
  );
}
