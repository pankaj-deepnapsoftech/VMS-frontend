import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, Edit, Trash2 } from "lucide-react";
import { useAIVAContext, useAuthContext } from "@/context";
import AssessmentModal from "@/components/modal/AssessmentModal";

export default function AssessmentCenter() {
  const { getAIVA, AIVAData, DeleteAIVA } = useAIVAContext();
  const { tenant, token } = useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const handleDelete = (id) => {
    DeleteAIVA(id);
  };

  const handleRefresh = () => {
    getAIVA(tenant);
  };

  useEffect(() => {
    if (token) getAIVA(tenant);
  }, [tenant, token]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Assessment Center
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
          onClick={() => setIsModalOpen(true)}
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
              Securend AI-Powered Scan
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
      <section className="rounded-2xl bg-slate-900 border border-slate-700 p-5 sm:p-6 shadow-lg">
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
                    <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <td
                        className="px-4 cursor-pointer text-slate-400 hover:text-slate-200"
                        onClick={() =>
                          setExpanded(expanded === scan._id ? null : scan._id)
                        }
                      >
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
                          onClick={() => console.log("Edit clicked")}
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
                          <div className="text-sm text-slate-300 space-y-2">
                            <p>
                              <strong>Auth Scan:</strong>{" "}
                              {scan.auth_scan ? "Yes" : "No"}
                            </p>
                            <p>
                              <strong>Schedule:</strong>{" "}
                              {scan.schedule ? "Yes" : "No"}
                            </p>
                            {scan.auth_fields && (
                              <div>
                                <p>
                                  <strong>Login URL:</strong>{" "}
                                  {scan.auth_fields.login_url}
                                </p>
                              </div>
                            )}
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
      </section>

      {/* Modal */}
      <AssessmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
