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
import { isDeleteAccess, isHaveAction, isModifyAccess, isViewAccess } from "@/utils/pageAccess";
import Access from "@/components/role/Access";

export function ApplicationData() {
  const { loading, GetApplicationData, allApplicationData, DeleteData } =
    useVulnerabililtyDataContext();
  const { token,authenticate } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();     
  const { closeModal, isOpen, openModal } = useAccessPartner();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tenant, setTenant] = useState("");
  const [exploitDetails, setExploitDetails] = useState([]);
  const [status,setStatus] = useState(null)

  // Popup Menu States
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isStatusModalOpen,setIsStatusModalOpen] = useState(false)

  // Filtered Data
  const filteredData = allApplicationData?.filter((item) => {
    const valuesToSearch = [
      item.scan_type,
      item.asset_type,
      item.threat_type,
      item.CVE,
      item.CVE_ID,
      item.Exploit_Availale,
      item.Exploit_Details?.toString(),
      item.exploit_complexity,
      item.Location,
      item.Title,
      item.Description,
      item.Severity,
      item.CVSS?.toString(),
      item.Reference_URL,
      item.BusinessApplication?.name,
      item.Proof_of_Concept?.toString(),
      item.creator?.company_name,
    ];

    return valuesToSearch
      .filter(Boolean)
      .some((field) =>
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
  });

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
  }, [tenant, currentPage,token]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTenant(params.get("tenant") || "");
  }, [location.search]);

  if(isViewAccess(authenticate,location)){
    return <Access/>
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gradient-custom min-h-screen p-4 rounded-lg text-white">
          {/* HEADER */}
          <div className="w-full px-6">
            <h2 className="text-2xl font-semibold text-white">
              All Application Data
            </h2>
            <span className="text-subtext text-sm">
              Manage your Application Data
            </span>
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
              {filteredData?.length < 1 ? (
                <NoDataFound />
              ) : (
                <div className="overflow-x-auto custom-scrollbar w-full">
                  <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
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
                            key={header}
                            className="px-4 py-3 border-b border-gray-600 font-medium"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredData.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-slate-700 hover:bg-[#1E293B] transition"
                        >
                          <td className="px-4 py-3">{(currentPage -1 ) * 10 + 1+ index}</td>
                          <td className="px-4 py-3">{item.Title || "-"}</td>
                          <td className="px-4 py-3">{item.scan_type || "-"}</td>
                          <td className="px-4 py-3">{item.asset_type || "-"}</td>
                          <td className="px-4 py-3">{item.Severity || "-"}</td>
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
                          {isHaveAction() && <td className="px-4 py-3">
                            <button
                              className="hover:bg-gray-700 px-3 py-2 rounded-lg"
                              onClick={(e) => toggleMenu(index, e)}
                            >
                              <BsThreeDotsVertical />
                            </button>
                          </td>}
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
                hasNextPage={filteredData.length === 10}
                total={filteredData.length}
              />
            </div>
          </div>

          {/* POPUP MENU USING PORTAL */}
          <PopupMenu position={menuPosition} onClose={closeMenu}>
            {activeMenu !== null && (
              <>
                {isModifyAccess() && <li
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex gap-2 items-center"
                  onClick={() =>
                    navigate("/edit-vulnerability-data", {
                      state: { data: filteredData[activeMenu] },
                    })
                  }
                >
                  <MdModeEditOutline /> Edit
                </li>}
                {isDeleteAccess() && <li
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex gap-2 items-center"
                  onClick={() => {
                    if (window.confirm("Are you sure to delete?")) {
                      DeleteData(filteredData[activeMenu]._id);
                      closeMenu();
                    }
                  }}
                >
                  <MdDelete /> Delete
                </li>}
                {isModifyAccess() && <li
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex gap-2 items-center"
                  onClick={() => {
                    handleExpectionModal(filteredData[activeMenu]);
                    closeMenu();
                  }}
                >
                  <IoWarningOutline /> Add Exception
                </li>}
                <li
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex gap-2 items-center"
                  onClick={() => {
                    setExploitDetails(filteredData[activeMenu]);
                    openModal();
                    closeMenu();
                  }}
                >
                  <BiDetail /> View Details
                </li>
                {isModifyAccess() &&  <li
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex gap-2 items-center"
                  onClick={() => {
                    setStatus({status:filteredData[activeMenu].status,_id:filteredData[activeMenu]._id});
                    setIsStatusModalOpen(true)
                  }}
                >
                  <GrStatusGood /> Change Status
                </li>}
              </>
            )}
          </PopupMenu>

          {/* EXCEPTION MODAL */}
          {isModalOpen && (
            <ExpectionModal
              setIsModalOpen={setIsModalOpen}
              creator={selectedId}
            />
          )}

          {/* EXPLOIT DETAIL MODAL */}
          
            <ExploitDetail data={exploitDetails} isOpen={isOpen} onClose={closeModal} />
          

          {/* STATUS MODAL */}
          {isStatusModalOpen && (
            <StatusModal setIsModalOpen={setIsStatusModalOpen} defaultData={status} />
          )}
        </div>
      )}
    </Suspense>
  );
}
