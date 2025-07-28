/* eslint-disable react/prop-types */
/* eslint-disable no-constant-binary-expression */
import { Suspense, useEffect, useState } from "react";
import { useAuthContext, useVulnerabililtyDataContext } from "@/context";
import Loader from "@/components/Loader/Loader";
import { Eye, Pencil, Trash2, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ExpectionModal from "@/modals/ExpectionModal";
import ExploitDetail from "@/modals/ExploitDetail";
import useAccessPartner from "@/hooks/AccessPartner";
import Pagination from "./Pagination";
import { IoSearch } from "react-icons/io5";
import NoDataFound from "@/components/NoDataFound";
import { calculateVRS } from "@/utils/vulnerableOperations";
import { StatusModal } from "@/modals/StatusModal";

export function ApplicationData() {
  const { loading, GetApplicationData, allApplicationData, DeleteData } =
    useVulnerabililtyDataContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [tenant, setTenant] = useState("");
  const location = useLocation();
  const [exploitDetails, setExploitDetails] = useState([]);

  const { closeModal, isOpen, openModal } = useAccessPartner();

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

  const handleExpectionModal = (item) => {
    if (!item.Expection) {
      setIsModalOpen(true);
      setSelectedId(item._id);
    } else {
      alert("Expection already exists for this record");
    }
  };

  useEffect(() => {
    if (token) {
      GetApplicationData(currentPage, tenant);
    }
  }, [tenant, currentPage]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTenant(params.get("tenant") || "");
  }, [location.search]);



  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gradient-custom min-h-screen p-4 rounded-lg text-white">
          <div className="w-full px-6">
            <h2 className="text-2xl font-semibold text-white">
              All Application Data
            </h2>
            <span className="text-subtext text-sm">
              Manage your Application Data
            </span>
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
                          "Title",
                          "Scan Type",
                          "Threat Type",
                          "Severity",
                          "Asset",
                          "VRS",
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
                      {filteredData.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-slate-700 hover:bg-[#1E293B] transition"
                        >
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3">{item.Title || "-"}</td>
                          <td className="px-4 py-3">{item.scan_type || "-"}</td>
                          <td className="px-4 py-3">
                            {item.asset_type || "-"}
                          </td>
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

                           <td className="px-4 py-3">
                            {item?.status || "-"}
                          </td>
                          
                          
                          <td className="px-4 py-3 flex items-center mt-3 space-x-3">
                            <Pencil
                              onClick={() =>
                                navigate("/add-vulnerability-data", {
                                  state: { data: item },
                                })
                              }
                              className="w-4 h-4 text-blue-400 cursor-pointer"
                            />
                            <Trash2
                              onClick={() => {
                                const confirmDelete = window.confirm(
                                  "Are you sure you want to delete this record?"
                                );
                                if (confirmDelete) {
                                  DeleteData(item._id);
                                }
                              }}
                              className="w-4 h-4 text-red-500 cursor-pointer"
                            />
                            <User
                              className="w-4 h-4 text-green-500 cursor-pointer"
                              onClick={() => handleExpectionModal(item)}
                            />
                            <Eye
                              onClick={() => {
                                setExploitDetails(item.Exploit_Details);
                                openModal();
                              }}
                              className="w-4 h-4 text-lime-400 cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Footer */}
              <Pagination
                page={currentPage}
                setPage={setCurrentPage}
                hasNextPage={filteredData.length === 10}
                total={filteredData.length}
              />
            </div>
          </div>

          {/* EXCEPTION MODAL */}
          {isModalOpen && (
            <ExpectionModal
              setIsModalOpen={setIsModalOpen}
              creator={selectedId}
            />
          )}

          {/* EXPLOIT DETAIL MODAL */}
          {isOpen && (
            <ExploitDetail links={exploitDetails} onClose={closeModal} />
          )}

          {/* STATUS MODAL */}
          {isModalOpen && <StatusModal setIsModalOpen={setIsModalOpen} defaultData={""}  />}
        </div>
      )}
    </Suspense>
  );
}
