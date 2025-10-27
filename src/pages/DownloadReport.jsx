import { useAuthContext, useMainReportContext } from "@/context";
import { Download, Eye, Mails } from "lucide-react";
import { useEffect } from "react";
import * as XLSX from "xlsx";

export default function DownloadReports() {

  const { DownloadReport, downloadData } = useMainReportContext();


  const handleDownloadExcel = (data) => {
    if (!data || !Array.isArray(data)) return;

    // Fields to skip
    const exclude = new Set(["Proof_of_Concept", "Exploit_Details"]);

    // Helper to clean each value for Excel cell
    const formatValue = (val) => {
      if (val === null || val === undefined) return "";
      if (Array.isArray(val)) return val.join("; ");
      if (typeof val === "object") return JSON.stringify(val);
      return val;
    };

    // Get all keys except excluded ones
    const keys = Object.keys(data[0]).filter((k) => !exclude.has(k));

    // Convert data into Excel-friendly objects
    const cleanedData = data.map((item) => {
      const row = {};
      keys.forEach((key) => (row[key] = formatValue(item[key])));
      return row;
    });

    // Convert to worksheet
    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Trigger file download
    XLSX.writeFile(workbook, "vulnerabilities.xlsx");
  };
  const { token } = useAuthContext()
  const reports = [
    {
      name: "All Vulnerabilities",
      description: "A report containing a summary of vulnerabilities in CSV Format",
      func: ()=>handleDownloadExcel(downloadData)
    },
    {
      name: "Executive Report",
      description: "A high level Executive Report",
      func:()=>{}
    },
    {
      name: "TVM Report",
      description: "A high level Threat & Vulnerability Management Report",
      func:()=>{}
    },
  ];

  useEffect(() => {
    if (token) {
      DownloadReport()
    }
  }, [token])

  return (
    <div className="w-full min-h-screen bg-[#0e1529] text-white p-6 md:p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-white">
          Download Reports
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Download all vulnerability assessment reports
        </p>
      </div>
      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border mt-8 border-[#1e2746] bg-[#131b33] shadow-lg shadow-black/20">
        <table className="w-full text-sm">
          {/* Table Header */}
          <thead className="bg-[#1a2342] text-gray-300 uppercase text-xs tracking-wider">
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
                className="border-t border-[#1e2746] hover:bg-[#1c2546] transition duration-200 ease-in-out"
              >
                {/* Name & Description */}
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold text-gray-100 text-base">
                      {report.name}
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      {report.description}
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <button
                      className="p-2 rounded-md bg-[#12203a] text-green-400 hover:text-green-300 hover:bg-[#1b2b4e] transition duration-200"
                      title="Download Report"
                      onClick={report.func}
                    >
                      <Download size={18} />
                    </button>
                    <button
                      className="p-2 rounded-md bg-[#12203a] text-blue-400 hover:text-blue-300 hover:bg-[#1b2b4e] transition duration-200"
                      title="View Report"
                    >
                      <Mails size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="text-gray-400 text-xs px-6 py-3 border-t border-[#1e2746] bg-[#0f162d]">
          Showing {reports.length} reports
        </div>
      </div>
    </div>
  );
}
