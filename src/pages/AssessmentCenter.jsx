import React from "react";

const scans = [];

export default function AssessmentCenter() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Assessment Center
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Launch security assessments and view scan results
          </p>
        </div>
      </header>

      {/* Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="rounded-2xl bg-slate-800 border border-slate-700 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center shadow-inner">
              <svg
                className="w-6 h-6 text-cyan-300"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2L3 6v5c0 5 3.7 9.7 9 11 5.3-1.3 9-6 9-11V6l-9-4z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">
                Defendly AI-Powered Scan
              </h3>
              <p className="text-slate-400 mt-1 leading-relaxed text-sm">
                Run intelligent automated scans for vulnerabilities,
                misconfigurations, and missing security controls across web
                apps, APIs, IPs, and cloud assets.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-800 border border-slate-700 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center shadow-inner">
              <svg
                className="w-6 h-6 text-emerald-300"
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
            <div>
              <h3 className="text-lg font-semibold text-slate-100">
                Need Advanced Testing?
              </h3>
              <p className="text-slate-400 mt-1 leading-relaxed text-sm">
                Looking for advanced assessment pentesting, cloud config audits,
                or thick client assessments? Request our security experts now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scans History */}
      <section className="rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-semibold">Scans History</h2>
            <p className="text-slate-400 text-sm">
              View your latest scans and their security grades, issue counts,
              and compliance scores.
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm border border-slate-600 transition-colors shadow">
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl">
          <table className="w-full table-auto text-sm">
            <thead className="bg-slate-800 text-slate-300 text-left text-xs uppercase tracking-wide">
              <tr>
                <th className="py-3 px-4">Scan Targets</th>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Target Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Start</th>
                <th className="py-3 px-4">End</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-4 px-4">{s.target}</td>
                  <td className="py-4 px-4 text-slate-300">{s.org}</td>
                  <td className="py-4 px-4 text-slate-400">—</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-slate-700 border border-slate-600 text-xs">
                      {s.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-300">{s.start}</td>
                  <td className="py-4 px-4 text-slate-300">{s.end}</td>
                  <td className="py-4 px-4">
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
                  <td className="py-4 px-4 text-slate-300 cursor-pointer hover:text-slate-100">
                    Actions ▾
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
