import {useState } from "react";
import {
  useVulnerabililtyDataContext,
} from "@/context";
import { IoSearch } from "react-icons/io5";
import Loader from "@/components/Loader/Loader";
import Pagination from "./Pagination";
import { isHaveAction } from "@/utils/pageAccess";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import EnhancedDetailsModal from "@/modals/ExploitDetail";
import useAccessPartner from "@/hooks/AccessPartner";
import { handlerSeverity } from "@/utils/vulnerableOperations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteVulnerableData, getAllVulnerableData } from "@/services/Vulnerable.service";
import { TableSkeletonLoading } from "@/Skeletons/Components/TablesSkeleton";
import { useAuthStore } from "@/store/AuthStore";

export default function VulnerabilityData() {
  const { loading } = useVulnerabililtyDataContext();
  const { token, tenant } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
const queryClient = useQueryClient();

  // -------------------- tenstack query start here ------------------

  const {data:NessusData,isLoading:isNessusDataLoading} = useQuery({
    queryKey:["All-vulnerablities-data",{currentPage,tenant}],
    queryFn:()=>getAllVulnerableData({page:currentPage,tenant}),
    enabled: !!token
  })

  const {mutate:deleteNessusData} = useMutation({
    mutationFn:(id)=>DeleteVulnerableData(id),
    onSuccess:async () => {
      await queryClient.invalidateQueries({queryKey:["All-vulnerablities-data"]})
    }
  })


  const { closeModal, isOpen, openModal } = useAccessPartner();

  const [searchTerm, setSearchTerm] = useState("");
  const [exploitDetails, setExploitDetails] = useState(null);

  const itemsPerPage = 10;

  // Always return a string for title attributes
  const showTitle = (header) => {
    if (header === "VRS") return "Vulnerability Risk Score";
    return "";
  };

  // Defensive: ensure isHaveAction() returns boolean
  const hasAction = Boolean(isHaveAction());



  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <>
      {/* Heading */}
      <div className="w-full pt-6 px-6">
        <h2 className="text-2xl font-semibold text-white">
          All Vulnerability Data
        </h2>
        <span className="text-subtext text-sm">
          Manage your Vulnerability Data
        </span>
      </div>

      <div className="w-full min-h-screen p-6">
        <div className="bg-[#1a1f2e] mb-12 rounded-lg shadow-xl overflow-hidden">
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
          <div className="overflow-x-auto w-full custom-scrollbar">
          {isNessusDataLoading ? <TableSkeletonLoading/>  :  <table className="table-fixed min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
              <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
                <tr>
                  {[
                    "S No.",
                    "Title",
                    "Scan Type",
                    "Threat Type",
                    "Severity",
                    "Asset",
                    "Status",
                  ]
                    .concat(hasAction ? ["Actions"] : [])
                    .map((header) => (
                      <th
                        key={String(header)} // ✅ always a string
                        title={String(showTitle(header))} // ✅ always a string
                        className="px-4 py-3 border-b border-gray-600 font-medium"
                      >
                        {String(header)}
                      </th>
                    ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {Array.isArray(NessusData) && NessusData.length > 0 ? (
                  NessusData.map((item, index) => (
                    <tr
                      key={item._id || index}
                      className="border-b border-slate-700 hover:bg-[#1E293B] transition"
                    >
                      <td className="px-4 py-3">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-4 py-3">
                        {String(item?.Title || item?.plugin_name || "-")}
                      </td>
                      <td className="px-4 py-3">
                        {String(item?.scan_type || "-")}
                      </td>
                      <td className="px-4 py-3">
                        {String(item?.threat_type || "-")}
                      </td>
                      <td className="px-4 py-3">
                        {String(
                          item?.Severity?.name ||
                            handlerSeverity(item?.severity) ||
                            "-"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {String(
                          item?.BusinessApplication?.name ||
                            item?.InfraStructureAsset?.asset_hostname ||
                            "-"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {String(item?.status || "-")}
                      </td>

                      {hasAction && (
                        <td className="px-4 py-3 flex items-center gap-3">
                          <button
                            title="View"
                            className="text-green-500 hover:text-green-600 transition"
                            onClick={() => {
                              openModal();
                              setExploitDetails(item);
                            }}
                          >
                            <FaEye />
                          </button>
                          <button
                            title="Edit"
                            className=" text-blue-500 hover:text-blue-600 transition"
                            onClick={() => {
                              openModal();
                              setExploitDetails(item);
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            title="Delete"
                            className=" text-red-500 hover:text-red-600 transition"
                            onClick={() => deleteNessusData(item._id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={hasAction ? 8 : 7}
                      className="text-center py-6 text-gray-400"
                    >
                      {loading ? <Loader /> : "No data found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>}
          </div>

          {/* PAGINATION */}
          <Pagination
            page={currentPage}
            setPage={setCurrentPage}
            hasNextPage={itemsPerPage <= (NessusData?.length || 0)}
            total={NessusData?.length || 0}
          />
        </div>
      </div>

      <EnhancedDetailsModal
        data={exploitDetails}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>
  );
}
