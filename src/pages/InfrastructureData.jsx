import { Suspense, useEffect, useState } from "react";
import { useAuthContext, useVulnerabililtyDataContext } from "@/context";
import Loader from "@/components/Loader/Loader";
import { Eye, Pencil, Trash2, User } from "lucide-react";

export function InfrastructureData() {
  const { loading, GetInfrastructureData, allInfrastructureData } = useVulnerabililtyDataContext();
  const { token } = useAuthContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (token) {
      GetInfrastructureData();
    }
  }, [token]);

  // Filter data by search
  const filteredData = allInfrastructureData?.filter((item) => {
    const valuesToSearch = [
      item.scan_type,
      item.asset_type,
      item.threat_type,
      item.CVE,
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

  // Pagination Logic
  const totalItems = filteredData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gradient-custom min-h-screen p-4 rounded-lg text-white">
          {/* Search Input */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search across all fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-96 px-4 py-2 rounded-md bg-[#0F172A] text-white border border-[#334155] focus:outline-none"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto custom-scrollbar rounded-lg">
            <table className="min-w-[1400px] text-sm text-left">
              <thead className="bg-[#1E293B] text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3"><input type="checkbox" /></th>
                  <th className="px-4 py-3">Scan Type</th>
                  <th className="px-4 py-3">Asset Type</th>
                  <th className="px-4 py-3">Threat Type</th>
                  <th className="px-4 py-3">CVE</th>
                  <th className="px-4 py-3">Exploit Details</th>
                  <th className="px-4 py-3">Exploit Complexity</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">CVSS</th>
                  <th className="px-4 py-3">Reference URL</th>
                  <th className="px-4 py-3">Asset</th>
                  <th className="px-4 py-3">Proof of Concept</th>
                  <th className="px-4 py-3">Tenant</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-[#0F172A] border-t border-slate-700">
                {currentItems && currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={index} className="border-b border-slate-700 hover:bg-[#1E293B] transition">
                      <td className="px-4 py-3"><input type="checkbox" /></td>
                      <td className="px-4 py-3">{item.scan_type || "-"}</td>
                      <td className="px-4 py-3">{item.asset_type || "-"}</td>
                      <td className="px-4 py-3">{item.threat_type || "-"}</td>
                      <td className="px-4 py-3">{item.CVE || "-"}</td>
                      <td className="px-4 py-3">{item.Exploit_Details?.length || 0}</td>
                      <td className="px-4 py-3">{item.exploit_complexity || "-"}</td>
                      <td className="px-4 py-3">{item.Location || "-"}</td>
                      <td className="px-4 py-3">{item.Title || "-"}</td>
                      <td className="px-4 py-3">{item.Description || "-"}</td>
                      <td className="px-4 py-3">{item.Severity || "-"}</td>
                      <td className="px-4 py-3">{item.CVSS || "-"}</td>
                      <td className="px-4 py-3">{item.Reference_URL || "-"}</td>
                      <td className="px-4 py-3">{item.BusinessApplication?.name || "-"}</td>
                      <td className="px-4 py-3">{item.Proof_of_Concept?.length || 0}</td>
                      <td className="px-4 py-3">{item.creator?.company_name || "-"}</td>
                      <td className="px-4 py-3 flex items-center mt-3 space-x-3">
                        <Pencil className="w-4 h-4 text-blue-400 cursor-pointer" />
                        <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                        <User className="w-4 h-4 text-green-500 cursor-pointer" />
                        <Eye className="w-4 h-4 text-lime-400 cursor-pointer" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="17" className="text-center py-4 text-gray-400">
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 rounded text-white disabled:opacity-50"
              >
                Previous
              </button>

              <div className="space-x-2">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 rounded text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </Suspense>
  );
}
