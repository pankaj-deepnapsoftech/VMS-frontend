import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ExpectionModal from "@/modals/ExpectionModal";
import ExploitDetail from "@/modals/ExploitDetail";
import useAccessPartner from "@/hooks/AccessPartner";
import Pagination from "./Pagination";
import NoDataFound from "@/components/NoDataFound";
import { IoSearch, IoWarningOutline } from "react-icons/io5";
import { calculateACS } from "@/utils/vulnerableOperations";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PopupMenu } from "@/modals/PopupManue";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { StatusModal } from "@/modals/StatusModal";
import { GrStatusGood } from "react-icons/gr";
import {
  isDeleteAccess,
  isHaveAction,
  isModifyAccess,
  isViewAccess,
} from "@/utils/pageAccess";
import Access from "@/components/role/Access";
import { CircleUser } from "lucide-react";
import AssignUserModal from "@/components/modal/AssignUserModal";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteVulnerableData, getInfrastructureData } from "@/services/Vulnerable.service";
import { TableSkeletonLoading } from "@/Skeletons/Components/TablesSkeleton";
import { useAuthStore } from "@/store/AuthStore";

// Popup Menu Component using Portal

export default function InfrastructureData() {
  const { token, authenticate, tenant } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();



  const { data: allInfrastructureData, isLoading: isAllInfrastructureDataLoading } = useQuery({
    queryKey: ["All-Infrastructure-vulnerabilities", { page: currentPage, tenant }],
    queryFn: () => getInfrastructureData({ page: currentPage, tenant }),
    enabled: !!token,
    placeholderData: keepPreviousData,
  })


  const { mutate: DeleteData } = useMutation({
    mutationFn: (id) => DeleteVulnerableData(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["All-Infrastructure-vulnerabilities"] })
    }
  })


  const navigate = useNavigate();
  const location = useLocation();
  const showTitle = (header) => {
    if (header === "ACS") {
      return "Asset/Application Criticality Score";
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [exploitDetails, setExploitDetails] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const { closeModal, isOpen, openModal } = useAccessPartner();
  const [AssignUserOpenModal, setAssignUserOpenModal] = useState(false)
  // Popup state
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [tenantId, setTenantId] = useState(null)
  const [selectedDataId, setselectedData] = useState(null)
  const filteredData = allInfrastructureData?.filter((item) => {
    const valuesToSearch = [
      item.scan_type,
      item.threat_type,
      item.Title,
      item.Severity,
      item.BusinessApplication?.name,
    ];

    return valuesToSearch
      .filter(Boolean)
      .some((field) =>
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
  });
  const handleExpectionModal = (item) => {
    if (!item.Expection) {
      setIsModalOpen(true);
      setSelectedId(item._id);
    } else {
      alert("Expection already exists for this record");
    }
  };

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);





  if (isViewAccess(authenticate, location)) {
    return <Access />;
  }

  return (
    <div className="bg-gradient-custom min-h-screen p-4 rounded-lg text-white">
      <div className="w-full mt-4 px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          All Infrastructure Data
        </h2>
        <span className="text-subtext text-sm">
          Manage your Infrastructure Data
        </span>
      </div>

      <div className="relative w-full min-h-screen p-6">
        <div className="bg-[#1a1f2e] mb-12 rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-700 w-[700px] relative">
            <div className="relative">
              <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
              <input
                type="search"
                placeholder="Search infrastructure data..."
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
            <div className="overflow-x-auto custom-scrollbar w-full relative">
              {isAllInfrastructureDataLoading ? <TableSkeletonLoading /> : <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
                <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
                  <tr>
                    {[
                      "S No.",
                      "Title",
                      "Scan Type",
                      "Threat Type",
                      "Severity",
                      "Asset",
                      "ACS",
                      "Status",
                      isHaveAction() && "Actions",
                    ]?.map((header) => (
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
                <tbody className="divide-y divide-gray-700 relative">
                  {filteredData?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-700 hover:bg-[#1E293B] transition relative"
                    >
                      <td className="px-4 py-3">
                        {(currentPage - 1) * 10 + 1 + index}
                      </td>
                      <td className="px-4 py-3">{item.Title || "-"}</td>
                      <td className="px-4 py-3">{item.scan_type || "-"}</td>
                      <td className="px-4 py-3">
                        {item.threat_type || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {item?.Severity?.name || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {item.InfraStructureAsset?.asset_hostname || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {calculateACS(item.InfraStructureAsset) || "-"}
                      </td>
                      <td className="px-4 py-3">{item?.status || "-"}</td>
                      {isHaveAction() && (
                        <td className="px-4 py-3 ">
                          <button
                            className="hover:bg-gray-700 px-3 py-2 rounded-lg"
                            onClick={(e) => { toggleMenu(index, e); setTenantId(item?.Severity?.tenant); setselectedData(item) }}
                          >
                            <BsThreeDotsVertical />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>}
            </div>
          )}

          {/* Footer */}
          <Pagination
            page={currentPage}
            setPage={setCurrentPage}
            hasNextPage={filteredData?.length === 10}
            total={filteredData?.length}
          />
        </div>
      </div>

      {/* Portal Popup */}
      <PopupMenu position={menuPosition} onClose={closeMenu}>
        {activeMenu !== null && (
          <>
            {isModifyAccess() && (
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex gap-2 items-center"
                onClick={() =>
                  navigate("/edit-vulnerability-data", {
                    state: { data: filteredData[activeMenu] },
                  })
                }
              >
                <MdModeEditOutline /> Edit
              </li>
            )}
            {isDeleteAccess() && (
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex gap-2 items-center"
                onClick={() => {
                  DeleteData(filteredData[activeMenu]._id);
                  closeMenu();
                }}
              >
                <MdDelete /> Delete
              </li>
            )}
            {isModifyAccess() && (
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex gap-2 items-center"
                onClick={() => {
                  handleExpectionModal(filteredData[activeMenu]);
                  closeMenu();
                }}
              >
                <IoWarningOutline /> Add Exception
              </li>
            )}
            <li
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex gap-2 items-center"
              onClick={() => {
                setExploitDetails(filteredData[activeMenu]);
                openModal();
                closeMenu();
              }}
            >
              <BiDetail />
              View Details
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex gap-2 items-center"
              onClick={() => {

                setAssignUserOpenModal(true)
              }}
            >
              <CircleUser />
              Assign User
            </li>
            {isModifyAccess() && (
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex gap-2 items-center"
                onClick={() => {
                  setStatus({
                    status: filteredData[activeMenu].status,
                    _id: filteredData[activeMenu]._id,
                  });
                  setIsStatusModalOpen(true);
                }}
              >
                <GrStatusGood /> Change Status
              </li>
            )}
          </>
        )}
      </PopupMenu>

      {isModalOpen && (
        <ExpectionModal
          setIsModalOpen={setIsModalOpen}
          creator={selectedId}
        />
      )}

      <ExploitDetail
        data={exploitDetails}
        onClose={closeModal}
        isOpen={isOpen}
      />

      {isStatusModalOpen && (
        <StatusModal
          setIsModalOpen={setIsStatusModalOpen}
          defaultData={status}
        />
      )}


      {AssignUserOpenModal && (
        <AssignUserModal setAssignUserOpenModal={setAssignUserOpenModal} tenantId={tenantId} selectedDataId={selectedDataId} />
      )
      }
    </div>
  );
}
