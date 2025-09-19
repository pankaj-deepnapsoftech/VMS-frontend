import React, { useState } from "react";

const scans = [];

export default function AssessmentCenter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                <th className="py-3 px-3 sm:px-4">Scan Targets</th>
                <th className="py-3 px-3 sm:px-4">Organization</th>
                <th className="py-3 px-3 sm:px-4">Target Name</th>
                <th className="py-3 px-3 sm:px-4">Type</th>
                <th className="py-3 px-3 sm:px-4">Start</th>
                <th className="py-3 px-3 sm:px-4">End</th>
                <th className="py-3 px-3 sm:px-4">Status</th>
                <th className="py-3 px-3 sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scans.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-slate-500">
                    No scans available. Start a new scan to see results here.
                  </td>
                </tr>
              ) : (
                scans.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 px-3 sm:px-4">{s.target}</td>
                    <td className="py-4 px-3 sm:px-4 text-slate-300">
                      {s.org}
                    </td>
                    <td className="py-4 px-3 sm:px-4 text-slate-400">—</td>
                    <td className="py-4 px-3 sm:px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-slate-700 border border-slate-600 text-xs">
                        {s.type}
                      </span>
                    </td>
                    <td className="py-4 px-3 sm:px-4 text-slate-300">
                      {s.start}
                    </td>
                    <td className="py-4 px-3 sm:px-4 text-slate-300">
                      {s.end}
                    </td>
                    <td className="py-4 px-3 sm:px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          s.status === "Completed"
                            ? "bg-emerald-700 text-emerald-100"
                            : "bg-rose-700 text-rose-100"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-3 sm:px-4 text-slate-300 cursor-pointer hover:text-slate-100">
                      Actions ▾
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl p-6 relative">
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
              {/* Org + Target in one row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    defaultValue="BIGMINT"
                    className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Target Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Target Name"
                    className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Scan Targets */}
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Scan Targets <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter URL with http(s)://"
                  className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <p className="text-xs text-slate-400 mt-1">
                  💡 Type a URL and press{" "}
                  <span className="px-1 py-0.5 rounded bg-slate-700 text-slate-200">
                    comma
                  </span>
                  ,{" "}
                  <span className="px-1 py-0.5 rounded bg-slate-700 text-slate-200">
                    space
                  </span>{" "}
                  or{" "}
                  <span className="px-1 py-0.5 rounded bg-slate-700 text-slate-200">
                    enter
                  </span>{" "}
                  to add multiple URLs. First URL becomes the primary target.
                </p>
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
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="auth"
                      defaultChecked
                      className="accent-cyan-500"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Label */}
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Label (optional)
                </label>
                <input
                  type="text"
                  placeholder="Add a label for this scan"
                  className="mt-1 w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

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
                      defaultChecked
                      className="accent-cyan-500"
                    />
                    <span>Now</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="schedule"
                      className="accent-cyan-500"
                    />
                    <span>Later</span>
                  </label>
                </div>
              </div>

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
                type="button"
                className="w-full rounded-md bg-slate-700 hover:bg-slate-600 py-2.5 text-sm font-medium text-slate-200 mt-2"
              >
                Add at least one URL to continue
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
