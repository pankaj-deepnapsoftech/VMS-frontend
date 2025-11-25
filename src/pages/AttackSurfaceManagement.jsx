import React, { useEffect, useState } from "react";
import {
  Eye,
  Download,
  Settings,
} from "lucide-react";
import { useAIVAContext} from "@/context";
import AssessmentModal from "@/components/modal/AssessmentModal";
import "react-circular-progressbar/dist/styles.css";
import Pagination from "./Pagination";
import NoDataFound from "@/components/NoDataFound";
import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { getAllApplicationData } from "@/services/BusinessApplication.service";
import { useAuthStore } from "@/store/AuthStore";

export default function AssessmentCenter() {
  const { tenant, token } = useAuthStore();

  // ============= tenstack query start here =====================

  const { data: totalBusinessApplication } =
    useQuery({
      queryKey: ["all-business-application", { tenant }],
      queryFn: () => getAllApplicationData({ tenant }),
      enabled: !!token && !!tenant,
      placeholderData: keepPreviousData,
    });


  const { getAIVA, AIVAData } = useAIVAContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [editable, setEditable] = useState(null);
  const [page, setPage] = useState(1);

  // const handleDelete = (id) => {
  //   DeleteAIVA(id);
  // };

  // const handleEdit = (data) => {
  //   setEditable(data);
  //   setIsModalOpen(true);
  // };

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
            <table className="w-full min-w-[900px] table-auto text-xs sm:text-sm">
              <thead className="bg-slate-800 text-slate-300 uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4 text-left">Scan Name</th>
                  <th className="py-3 px-4 text-left">Severity Breakdown</th>
                  <th className="py-3 px-4 text-left">Assets</th>
                  <th className="py-3 px-4 text-left">Last Update</th>
                  <th className="py-3 px-4 text-left">Options</th>
                </tr>
              </thead>

              <tbody>
                {AIVAData && AIVAData.length > 0 ? (
                  AIVAData.map((scan) => (
                    <React.Fragment key={scan._id}>
                      <tr
                        className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors cursor-pointer"
                        onClick={(e) => {
                          if (
                            e.target.closest("button") ||
                            e.target.closest("svg") ||
                            e.target.closest("a")
                          )
                            return;
                          setExpanded(expanded === scan._id ? null : scan._id);
                        }}
                      >
                        {/* SCAN NAME */}
                        <td className="py-4 px-4 font-medium text-slate-200">
                          {scan.target_name || "—"}
                        </td>

                        {/* SEVERITY BREAKDOWN */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {/* Critical */}
                            <span className="px-2 py-1 rounded-md bg-red-100 text-red-600 text-xs font-semibold">
                              {scan.vulns?.critical ?? 0}
                            </span>

                            {/* High */}
                            <span className="px-2 py-1 rounded-md bg-orange-100 text-orange-600 text-xs font-semibold">
                              {scan.vulns?.high ?? 0}
                            </span>

                            {/* Medium */}
                            <span className="px-2 py-1 rounded-md bg-yellow-100 text-yellow-600 text-xs font-semibold">
                              {scan.vulns?.medium ?? 0}
                            </span>

                            {/* Low */}
                            <span className="px-2 py-1 rounded-md bg-green-100 text-green-600 text-xs font-semibold">
                              {scan.vulns?.low ?? 0}
                            </span>

                            {/* Info */}
                            <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-600 text-xs font-semibold">
                              {scan.vulns?.info ?? 0}
                            </span>
                          </div>
                        </td>

                        {/* ASSETS */}
                        <td className="py-4 px-4 text-slate-200">
                          {scan.assets_count || 0}
                        </td>

                        {/* LAST UPDATE */}
                        <td className="py-4 px-4 text-slate-300">
                          {scan.updatedAt
                            ? new Date(scan.updatedAt).toLocaleString()
                            : "—"}
                        </td>

                        {/* OPTIONS */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-4 text-blue-400">
                            <button title="View">
                              <Eye size={18} />
                            </button>
                            <button title="Download">
                              <Download size={18} />
                            </button>
                            <button title="Settings">
                              <Settings size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-slate-500">
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
        totalBusinessApplication={totalBusinessApplication}
      />
    </div>
  );
}
