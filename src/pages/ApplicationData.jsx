import { Suspense, useEffect, useState } from "react";
import { useAuthContext, useVulnerabililtyDataContext } from "@/context";
import Loader from "@/components/Loader/Loader";
import { Eye, Pencil, Trash2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ApplicationData() {
  const { loading, GetApplicationData, allApplicationData, DeleteData } =
    useVulnerabililtyDataContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (token) {
      GetApplicationData();
    }
  }, [token]);

  // Function to filter rows based on searchTerm across all fields
  const filteredData = allApplicationData?.filter((item) => {
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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gradient-custom min-h-screen p-4 rounded-lg text-white">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search across all fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-96 px-4 py-2 rounded-md bg-[#0F172A] text-white border border-[#334155] focus:outline-none"
            />
          </div>

          {/* Horizontal Scrollable Table */}
          <div className="overflow-x-auto custom-scrollbar rounded-lg">
            <table className="min-w-[1400px] text-sm text-left">
              <thead className="bg-[#1E293B] text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">
                    <input type="checkbox" />
                  </th>
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
                {Array.isArray(filteredData) && filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-700 hover:bg-[#1E293B] transition"
                    >
                      <td className="px-4 py-3">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-3">{item.scan_type || "-"}</td>
                      <td className="px-4 py-3">{item.asset_type || "-"}</td>
                      <td className="px-4 py-3">{item.threat_type || "-"}</td>
                      <td className="px-4 py-3">{item.CVE || "-"}</td>
                      <td className="px-4 py-3">
                        {item.Exploit_Details?.length || 0}
                      </td>
                      <td className="px-4 py-3">
                        {item.exploit_complexity || "-"}
                      </td>
                      <td className="px-4 py-3">{item.Location || "-"}</td>
                      <td className="px-4 py-3">{item.Title || "-"}</td>
                      <td className="px-4 py-3">{item.Description || "-"}</td>
                      <td className="px-4 py-3">{item.Severity || "-"}</td>
                      <td className="px-4 py-3">{item.CVSS || "-"}</td>
                      <td className="px-4 py-3">{item.Reference_URL || "-"}</td>
                      <td className="px-4 py-3">
                        {item.BusinessApplication?.name || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {item.Proof_of_Concept?.length || 0}
                      </td>
                      <td className="px-4 py-3">
                        {item.creator?.company_name || "-"}
                      </td>
                      <td className="px-4 py-3 flex items-center mt-3 space-x-3">
                        <Pencil onClick={()=>navigate("/add-vulnerability-data",{state:{data:item}})} className="w-4 h-4 text-blue-400 cursor-pointer" />

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

                        <User className="w-4 h-4 text-green-500 cursor-pointer" />
                        <Eye className="w-4 h-4 text-lime-400 cursor-pointer" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="17" className="text-center py-4 text-gray-400">
                      No data found matching search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              className="bg-slate-800 border-slate-700 text-gray-400 hover:bg-slate-700 hover:text-white px-4 py-2 rounded-lg"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span className="text-gray-300">Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={filteredData.length !== 10}
              className="bg-slate-800 border-slate-700 text-gray-400 hover:bg-slate-700 hover:text-white px-4 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Suspense>
  );
}
