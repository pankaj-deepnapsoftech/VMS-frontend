import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, Edit, Trash2 } from "lucide-react";
import { useAIVAContext, useAuthContext } from "@/context";
import AssessmentModal from "@/components/modal/AssessmentModal";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Pagination from "./Pagination";
import NoDataFound from "@/components/NoDataFound";

export default function AssessmentCenter() {
  const { getAIVA, AIVAData, DeleteAIVA } = useAIVAContext();
  const { tenant, token } = useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [editable, setEditable] = useState(null);
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    DeleteAIVA(id);
  };

  const handleEdit = (data) => {
    setEditable(data);
    setIsModalOpen(true);
  };

  const handleRefresh = () => {
    getAIVA(tenant, page);
  };

  useEffect(() => {
    if (token) getAIVA(tenant, page);
  }, [tenant, token, page]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Attack Surface Management 
          </h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Launch security assessments and view scan results
          </p>
        </div>
      </header>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {/* Start AI Scan */}
        <div
          className="rounded-2xl bg-slate-800 border border-slate-700 p-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => {
            if (tenant) {
              setIsModalOpen(true);
              setEditable(null);
            } else {
              alert("Please selcet tenant first !");
            }
          }}
        >
          <div className="flex flex-col items-start text-left">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-slate-700 flex items-center justify-center shadow-inner mb-3">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2L3 6v5c0 5 3.7 9.7 9 11 5.3-1.3 9-6 9-11V6l-9-4z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="text-sm sm:text-base font-semibold">
              New Exposure Scan
            </h3>
            <p className="text-slate-400 mt-1 leading-relaxed text-xs sm:text-sm">
              Run intelligent automated scans for vulnerabilities,
              misconfigurations, and missing security controls across web apps,
              APIs, IPs, and cloud assets.
            </p>
          </div>
        </div>

        {/* Request Experts */}
        <div className="rounded-2xl bg-slate-800 border border-slate-700 p-4 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex flex-col items-start text-left">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-slate-700 flex items-center justify-center shadow-inner mb-3">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="14"
                  rx="2"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="text-sm sm:text-base font-semibold">
              Need Advanced Testing?
            </h3>
            <p className="text-slate-400 mt-1 leading-relaxed text-xs sm:text-sm">
              Looking for advanced assessment pentesting, cloud config audits,
              or thick client assessments? Request our security experts now.
            </p>
          </div>
        </div>
      </section>

      {/* Scans Table */}
      <section className="rounded-2xl mb-10 bg-slate-900 border border-slate-700 p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Scans History</h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              View your latest scans and their security grades, issue counts,
              and compliance scores.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs sm:text-sm border border-slate-600 transition-colors shadow"
          >
            Refresh
          </button>
        </div>

        {/* Table */}
        {AIVAData?.length < 1 ? (
          <NoDataFound />
        ) : (
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full min-w-[700px] table-auto text-xs sm:text-sm">
              <thead className="bg-slate-800 text-slate-300 text-left uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-3 sm:px-4"></th>
                  <th className="py-3 px-3 sm:px-4">Target Name</th>
                  <th className="py-3 px-3 sm:px-4">Scan Tags</th>
                  <th className="py-3 px-3 sm:px-4">Label</th>
                  <th className="py-3 px-3 sm:px-4">Status</th>
                  <th className="py-3 px-3 sm:px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {AIVAData && AIVAData.length > 0 ? (
                  AIVAData.map((scan) => (
                    <React.Fragment key={scan._id}>
                      <tr
                        className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                        onClick={(e) => {
                          // Prevent triggering expand when clicking edit/delete buttons
                          if (
                            e.target.closest("button") ||
                            e.target.closest("svg") ||
                            e.target.closest("a")
                          )
                            return;
                          setExpanded(expanded === scan._id ? null : scan._id);
                        }}
                      >
                        <td className="px-4 text-slate-400">
                          {expanded === scan._id ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </td>
                        <td className="py-4 px-4">{scan.target_name}</td>
                        <td className="py-4 px-4">
                          {scan.scan_tags?.join(", ")}
                        </td>
                        <td className="py-4 px-4">{scan.labels}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              scan.status === "Pending"
                                ? "bg-yellow-700 text-yellow-100"
                                : scan.status === "Completed"
                                ? "bg-emerald-700 text-emerald-100"
                                : "bg-rose-700 text-rose-100"
                            }`}
                          >
                            {scan.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(scan)}
                            className="hover:text-blue-400 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(scan._id)}
                            className="hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>

                      {expanded === scan._id && (
                        <tr>
                          <td colSpan="8" className="bg-slate-900 p-5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-slate-200">
                              {/* Scan Summary */}
                              <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-lg">
                                <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-700">
                                    🧭
                                  </span>
                                  Scan Summary
                                </h3>
                                <div className="space-y-3 text-sm">
                                  <div>
                                    <p className="text-slate-400">
                                      Scan Target
                                    </p>
                                    <p className="font-medium text-emerald-300 break-all">
                                      {scan.target_url || "—"}
                                    </p>
                                  </div>
                                  <div className="flex justify-between">
                                    <div>
                                      <p className="text-slate-400">
                                        Scan Type
                                      </p>
                                      <p className="font-medium">
                                        {scan.scan_type || "AI Scan"}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-slate-400">
                                        Auth Scan
                                      </p>
                                      <p className="font-medium">
                                        {scan.auth_scan ? "Yes" : "No"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <div>
                                      <p className="text-slate-400">
                                        Organization
                                      </p>
                                      <p className="font-medium">
                                        {scan.organization || "SecurEnd"}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-slate-400">Duration</p>
                                      <p className="font-medium">
                                        {scan.duration || "5h 30m"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Vulnerabilities */}
                              <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-lg flex flex-col justify-between">
                                <div>
                                  <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-700">
                                      🛡️
                                    </span>
                                    Vulnerabilities
                                  </h3>

                                  <div className="flex items-center justify-between gap-3">
                                    <div>
                                      <p className="text-3xl font-bold">
                                        {scan.total_vulns || 12}
                                      </p>
                                      <p className="text-slate-400 text-xs">
                                        Security issues found
                                      </p>
                                    </div>
                                    <div className="w-20 h-20">
                                      <CircularProgressbar
                                        value={scan.vuln_score || 60}
                                        text={`${scan.vuln_score || 60}%`}
                                        styles={buildStyles({
                                          textColor: "#fff",
                                          pathColor: "#22c55e",
                                          trailColor: "#1e293b",
                                        })}
                                      />
                                    </div>
                                  </div>

                                  {/* Severity Breakdown */}
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5 text-xs">
                                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-red-900/40 border border-red-700">
                                      <span className="font-medium">
                                        Critical
                                      </span>
                                      <span className="font-semibold text-red-300">
                                        {scan.vulns?.critical ?? 2}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-orange-900/40 border border-orange-700">
                                      <span className="font-medium">High</span>
                                      <span className="font-semibold text-orange-300">
                                        {scan.vulns?.high ?? 3}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-yellow-900/40 border border-yellow-700">
                                      <span className="font-medium">
                                        Medium
                                      </span>
                                      <span className="font-semibold text-yellow-300">
                                        {scan.vulns?.medium ?? 4}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-green-900/40 border border-green-700">
                                      <span className="font-medium">Low</span>
                                      <span className="font-semibold text-green-300">
                                        {scan.vulns?.low ?? 2}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-900/40 border border-blue-700 col-span-2 sm:col-span-1">
                                      <span className="font-medium">Info</span>
                                      <span className="font-semibold text-blue-300">
                                        {scan.vulns?.info ?? 1}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* securend Metrics */}
                              <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-lg">
                                <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-700">
                                    📊
                                  </span>
                                  Securend Metrics
                                </h3>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div className="bg-slate-700/50 rounded-xl p-3">
                                    <p className="text-slate-400 text-xs">
                                      Endpoints
                                    </p>
                                    <p className="font-medium">
                                      {scan.endpoints || 6}
                                    </p>
                                  </div>
                                  <div className="bg-slate-700/50 rounded-xl p-3">
                                    <p className="text-slate-400 text-xs">
                                      Open Ports
                                    </p>
                                    <p className="font-medium">
                                      {scan.open_ports || 3}
                                    </p>
                                  </div>
                                  <div className="bg-slate-700/50 rounded-xl p-3">
                                    <p className="text-slate-400 text-xs">
                                      Cyber Hygiene
                                    </p>
                                    <p className="font-medium">
                                      {scan.cyber_hygiene || 59}
                                    </p>
                                  </div>
                                  <div className="bg-slate-700/50 rounded-xl p-3">
                                    <p className="text-slate-400 text-xs">
                                      Threat Intel
                                    </p>
                                    <p className="font-medium">
                                      {scan.threat_intel || 64}
                                    </p>
                                  </div>
                                  <div className="bg-slate-700/50 rounded-xl p-3 col-span-2 flex items-center justify-between">
                                    <div>
                                      <p className="text-slate-400 text-xs">
                                        OWASP Coverage
                                      </p>
                                      <p className="font-medium">
                                        {scan.owasp_score || 76.67}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="px-2 py-0.5 bg-green-800/40 rounded-md border border-green-700 text-xs">
                                        7 Present
                                      </span>
                                      <span className="px-2 py-0.5 bg-red-800/40 rounded-md border border-red-700 text-xs">
                                        2 Missing
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-slate-500 py-6 text-sm"
                    >
                      No scans available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4">
          <Pagination
            page={page}
            setPage={setPage}
            total={AIVAData.length}
            hasNextPage={AIVAData.length === 10}
          />
        </div>
      </section>

      {/* Modal */}
      <AssessmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editable={editable}
      />
    </div>
  );
}
