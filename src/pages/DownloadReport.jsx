import { useAuthContext, useMainReportContext } from "@/context";
import { Download, Mails, X } from "lucide-react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Select from "react-select"; // ✅ import React Select

export default function DownloadReports() {
  const { DownloadReport, downloadData } = useMainReportContext();
  const { token,  UserViaTenant,GetTenantData, tenant } = useAuthContext();

  console.log("================>>>>>>>>>>>",UserViaTenant)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);

  // Example users (can be replaced with API)
  const users = ["Admin", "Manager", "Security Lead", "Auditor"];

  // ✅ Handle Excel Download
  const handleDownloadExcel = (data) => {
    if (!tenant) {
      alert("Please select tenant first");
      return;
    }

    if (!data || !Array.isArray(data)) return;

    const exclude = new Set(["Proof_of_Concept", "Exploit_Details"]);

    const formatValue = (val) => {
      if (val === null || val === undefined) return "";
      if (Array.isArray(val)) return val.join("; ");
      if (typeof val === "object") return JSON.stringify(val);
      return val;
    };

    const keys = Object.keys(data[0]).filter((k) => !exclude.has(k));
    const cleanedData = data.map((item) => {
      const row = {};
      keys.forEach((key) => (row[key] = formatValue(item[key])));
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "vulnerabilities.xlsx");
  };

  // ✅ Report List
  const reports = [
    {
      name: "All Vulnerabilities",
      description:
        "A report containing a summary of vulnerabilities in CSV Format",
      func: () => handleDownloadExcel(downloadData),
    },
    {
      name: "Executive Report",
      description: "A high level Executive Report",
      func: () => {},
    },
    {
      name: "TVM Report",
      description: "A high level Threat & Vulnerability Management Report",
      func: () => {},
    },
  ];

  // ✅ Fetch reports when token or tenant changes
  useEffect(() => {
    if (token && tenant) {
      DownloadReport(tenant);
      GetTenantData(tenant);
    }
  }, [token, tenant]);

  const handleOpenModal = (report) => {
    setCurrentReport(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUsers([]);
    setCurrentReport(null);
  };

  const handleSendReport = () => {
    if (selectedUsers.length === 0)
      return alert("Please select at least one user!");
    const userList = selectedUsers.map((u) => u.value).join(", ");
    alert(`Report "${currentReport?.name}" sent to: ${userList}`);
    handleCloseModal();
  };

  // ✅ Custom React Select Styles
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#0f162d",
      borderColor: "#334155",
      color: "white",
      borderRadius: "0.5rem",
      boxShadow: "none",
      "&:hover": { borderColor: "#3b82f6" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#0f162d",
      color: "white",
      borderRadius: "0.5rem",
      border: "1px solid #334155",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#1e293b" : "#0f162d",
      color: "white",
      cursor: "pointer",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#1e3a8a",
      color: "white",
      borderRadius: "0.375rem",
      padding: "0 4px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "white",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#6B7280", // gray-500 default
      cursor: "pointer",
      ":hover": {
        backgroundColor: "transparent",
        color: "#4B5563", // gray-600 on hover
      },
    }),
  };

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
      <div className="overflow-x-auto w-full custom-scrollbar mt-8 rounded-xl border border-[#1e2746] bg-[#1a1f2e] shadow-lg shadow-black/20">
        <table className="table-fixed min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
          <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
            <tr>
              <th className="px-4 py-3 border-b border-gray-600 font-medium">
                Name
              </th>
              <th className="px-4 py-3 border-b border-gray-600 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {reports.map((report, idx) => (
              <tr
                key={idx}
                className="border-b border-slate-700 hover:bg-[#1E293B] transition"
              >
                <td className="px-4 py-3">
                  <div>
                    <div className="font-semibold text-gray-100 text-base">
                      {report.name}
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      {report.description}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end items-center gap-3">
                    <button
                      className="text-green-500 hover:text-green-600 transition"
                      title="Download Report"
                      onClick={report.func}
                    >
                      <Download size={18} />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-600 transition"
                      title="Send Report"
                      onClick={() => handleOpenModal(report)}
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
        <div className="text-gray-400 text-xs px-4 py-3 border-t border-gray-700 bg-[#1a1f2e]">
          Showing {reports.length} reports
        </div>
      </div>

      {/* === Modal === */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#131b33] w-[90%] max-w-md rounded-xl p-6 relative border border-gray-700 shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-white mb-4">
              Send Report
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Select users to send{" "}
              <span className="text-white font-medium">
                {currentReport?.name}
              </span>{" "}
              report.
            </p>

            {/* Multi Selector */}
            <Select
              isMulti
              name="users"
              value={selectedUsers}
              onChange={setSelectedUsers}
              options={ tenant ?  UserViaTenant.map((u) => ({ value: u._id, label: u.email })) : alert("Please select tenant first !")}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select users..."
              styles={customSelectStyles}
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReport}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
