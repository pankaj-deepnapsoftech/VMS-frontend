import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Edit, Trash2 } from "lucide-react";
import { useAIVAContext, useAuthContext, useDataContext } from "@/context";

const scans = [
  {
    id: 1,
    target: "https://itsybizz.com/",
    org: "SecurEnd",
    type: "AI Scan",
    start: "2025-09-22 05:59 AM",
    end: "2025-09-22 11:29 AM",
    status: "Completed",
    details: {
      description: "Security assessment for https://itsybizz.com/",
      vulnerabilities: 12,
      endpoints: 6,
      severity: { high: 0, medium: 2, low: 6 },
    },
  },
  {
    id: 2,
    target: "deepnap.com",
    org: "SecurEnd",
    type: "AI Scan",
    start: "2025-09-15 17:46",
    end: "-",
    status: "Failed",
    details: null,
  },
];

export default function AssessmentCenter() {
    const { TenantAllData } = useDataContext();
  const { createAIVA } = useAIVAContext();
  const {tenant} = useAuthContext();


  console.log(TenantAllData)


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const [authScan, setAuthScan] = useState(false);
  const [scheduleLater, setScheduleLater] = useState(false);
  const [targets, setTargets] = useState([""]);


  const handleAddTarget = () => {
    setTargets([...targets, ""]);
  };

  const handleTargetChange = (index, value) => {
    const updatedTargets = [...targets];
    updatedTargets[index] = value;
    setTargets(updatedTargets);
  };

  const handleRemoveTarget = (index) => {
    const updatedTargets = targets.filter((_, i) => i !== index);
    setTargets(updatedTargets);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleDelete = (onDelete) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      onDelete(); // Call your delete handler here
    }
  };

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

      {/* Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {/* Card 1 */}
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

        {/* Card 2 */}
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

      {/* Scans History */}
      <section className="rounded-2xl bg-slate-900 border border-slate-700 p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Scans History</h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              View your latest scans and their security grades, issue counts,
              and compliance scores.
            </p>
          </div>
          <button className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs sm:text-sm border border-slate-600 transition-colors shadow">
            Refresh
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full min-w-[700px] table-auto text-xs sm:text-sm">
            <thead className="bg-slate-800 text-slate-300 text-left uppercase tracking-wide">
              <tr>
                <th className="py-3 px-3 sm:px-4"></th>
                <th className="py-3 px-3 sm:px-4">Scan Targets</th>
                <th className="py-3 px-3 sm:px-4">Organization</th>
                <th className="py-3 px-3 sm:px-4">Type</th>
                <th className="py-3 px-3 sm:px-4">Start</th>
                <th className="py-3 px-3 sm:px-4">End</th>
                <th className="py-3 px-3 sm:px-4">Status</th>
                <th className="py-3 px-3 sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <React.Fragment key={scan.id}>
                  {/* Main Row */}
                  <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td
                      className="px-4 cursor-pointer text-slate-400 hover:text-slate-200"
                      onClick={() =>
                        setExpanded(expanded === scan.id ? null : scan.id)
                      }
                    >
                      {expanded === scan.id ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </td>
                    <td className="py-4 px-4">{scan.target}</td>
                    <td className="py-4 px-4 text-slate-300">{scan.org}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-slate-700 border border-slate-600 text-xs">
                        {scan.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{scan.start}</td>
                    <td className="py-4 px-4 text-slate-300">{scan.end}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          scan.status === "Completed"
                            ? "bg-emerald-700 text-emerald-100"
                            : "bg-rose-700 text-rose-100"
                        }`}
                      >
                        {scan.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 cursor-pointer hover:text-slate-100 flex items-center gap-3">
                      <button
                        onClick={() => console.log("Edit clicked")}
                        className="hover:text-blue-400 transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={handleDelete}
                        className="hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expanded === scan.id && (
                    <tr>
                      <td colSpan="8" className="bg-slate-900 p-5">
                        {scan.details ? (
                          <div className="space-y-4">
                            <p className="text-slate-300 text-sm">
                              {scan.details.description}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                              <div className="p-4 bg-slate-800 rounded-lg text-center">
                                <p className="text-2xl font-bold text-cyan-400">
                                  {scan.details.vulnerabilities}
                                </p>
                                <p className="text-xs text-slate-400">
                                  Vulnerabilities
                                </p>
                              </div>
                              <div className="p-4 bg-slate-800 rounded-lg text-center">
                                <p className="text-2xl font-bold text-emerald-400">
                                  {scan.details.endpoints}
                                </p>
                                <p className="text-xs text-slate-400">
                                  Endpoints
                                </p>
                              </div>
                              <div className="p-4 bg-slate-800 rounded-lg text-center">
                                <p className="text-2xl font-bold text-red-400">
                                  {scan.details.severity.high}
                                </p>
                                <p className="text-xs text-slate-400">High</p>
                              </div>
                              <div className="p-4 bg-slate-800 rounded-lg text-center">
                                <p className="text-2xl font-bold text-yellow-400">
                                  {scan.details.severity.medium}
                                </p>
                                <p className="text-xs text-slate-400">Medium</p>
                              </div>
                              <div className="p-4 bg-slate-800 rounded-lg text-center">
                                <p className="text-2xl font-bold text-green-400">
                                  {scan.details.severity.low}
                                </p>
                                <p className="text-xs text-slate-400">Low</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-slate-500 flex justify-center text-sm">
                            No details available
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center bg-black/50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[80vh] overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Start AI-Powered Scan</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {/* Organization + Target */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Tenant Name
                  </label>
                  <input
                    type="text"
                    value={TenantAllData.filter((item)=> item.value === tenant)[0].label}
                    className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    User Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter User Name"
                    className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Target Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Target Name"
                    className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                  />
                </div>
              </div>

              {/* Scan Targets */}
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Scan Targets <span className="text-rose-400">*</span>
                </label>

                {targets.map((url, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) =>
                        handleTargetChange(index, e.target.value)
                      }
                      placeholder="Enter URL with http(s)://"
                      className="flex-1 rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                    />
                    {index === 0 ? (
                      <span></span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRemoveTarget(index)}
                        className="px-2 text-rose-400 hover:text-rose-300"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddTarget}
                  className="mt-3 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded-md text-sm"
                >
                  + Add
                </button>

                <p className="mt-2 text-xs text-slate-400">
                  💡 Tip: You can scan multiple websites in one go. The first
                  URL will be used as the primary target.
                </p>
              </div>

              {/* Label Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Label{" "}
                  <span className="text-slate-400 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Add a label for this scan (e.g. 'Quarterly PCI', 'Staging')"
                  className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                />
              </div>

              {/* Auth Scan */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Auth Scan?
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="auth"
                      className="accent-cyan-500"
                      checked={authScan}
                      onChange={() => setAuthScan(true)}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="auth"
                      className="accent-cyan-500"
                      checked={!authScan}
                      onChange={() => setAuthScan(false)}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Auth fields (only when Yes) */}
              {authScan && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      Email ID <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter email/username"
                      className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      Password <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Login URL <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter login page URL"
                      className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Schedule
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="schedule"
                      className="accent-cyan-500"
                      checked={!scheduleLater}
                      onChange={() => setScheduleLater(false)}
                    />
                    <span>Now</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="schedule"
                      className="accent-cyan-500"
                      checked={scheduleLater}
                      onChange={() => setScheduleLater(true)}
                    />
                    <span>Later</span>
                  </label>
                </div>
              </div>

              {/* Date + Time (only when Later) */}
              {scheduleLater && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                      min={getTodayDate()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300">
                      Time
                    </label>
                    <input
                      type="time"
                      className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Confirm */}
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 accent-cyan-500" />
                <p className="text-xs text-slate-400">
                  I confirm that I own or have authorization to scan the
                  specified assets and that the information provided is
                  accurate.
                </p>
              </div>

              {/* Submit */}
              
                <button
                  type="submit"
                  className="w-full rounded-md bg-cyan-800 hover:bg-cyan-900 py-2.5 text-sm font-medium text-slate-100 mt-2"
                >
                  Start Scan
                </button>
              
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
