import { Suspense, useEffect } from "react";
import { useAuthContext, useVulnerabililtyDataContext } from "@/context";
import Loader from "@/components/Loader/Loader";
import { Eye, Pencil, Trash2, User } from "lucide-react";

export function ApplicationData() {
  const { loading, GetApplicationData, allApplicationData } = useVulnerabililtyDataContext();
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      GetApplicationData();
    }
  }, [token]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gradient-custom min-h-screen p-4 rounded-lg text-white">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search Vulnerabilities ..."
              className="w-96 px-4 py-2 rounded-md bg-[#0F172A] text-white border border-[#334155] focus:outline-none"
            />
          </div>

          {/* Horizontal Scroll Container */}
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
                  <th className="px-4 py-3">Business Application</th>
                  <th className="px-4 py-3">Proof of Concept</th>
                  <th className="px-4 py-3">Tenant</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-[#0F172A] border-t border-slate-700">
                {Array.isArray(allApplicationData) && allApplicationData.map((item, index) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Suspense>
  );
}
