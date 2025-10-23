import { Download, Eye } from "lucide-react";

export default function DownloadReports() {
  const reports = [
    {
      name: "All Vulnerabilities",
      description: "A report containing a summary of case-related details",
    },
    {
      name: "Executive Report",
      description: "A report containing deep statistics on playbooks",
    },
    {
      name: "TVM Report",
      description: "A report containing MTTD/MTTA/MTTR related case details",
    },
  ];

  return (
    <div className="w-full p-6 text-white bg-[#0e1529] min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          Reports
          <span className="bg-[#1a2140] text-gray-300 text-sm px-2 py-0.5 rounded-lg">
            {reports.length}
          </span>
        </h1>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-lg border border-[#1e2746] bg-[#131b33]">
        <table className="w-full text-sm">
          {/* Table Header */}
          <thead className="bg-[#1a2342] text-gray-300 uppercase text-xs">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Name</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {reports.map((report, idx) => (
              <tr
                key={idx}
                className="border-t border-[#1e2746] hover:bg-[#192240] transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold text-gray-100">
                      {report.name}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {report.description}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-right flex justify-end gap-3">
                  <button className="text-green-400 hover:text-green-300 transition">
                    <Download size={18} />
                  </button>
                  <button className="text-blue-400 hover:text-blue-300 transition">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="text-gray-400 text-xs px-6 py-3 border-t border-[#1e2746]">
          Showing {reports.length} reports
        </div>
      </div>
    </div>
  );
}
