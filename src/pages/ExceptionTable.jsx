/* eslint-disable react/prop-types */
import { useAllEmployeeContext, useExceptionContext } from "@/context";
import { dateFormaterWithDate } from "@/utils/dateFormate";
import { useEffect, useState } from "react";
import { FaUserCheck } from "react-icons/fa";

const ExceptionTable = () => {
  const { ExpectionPendingData, expectionData } = useExceptionContext();
  const {TenantData} = useAllEmployeeContext()
  const hasData = Array.isArray(expectionData) && expectionData.length > 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [approvers, setApprovers] = useState({
    approver1: "",
    approver2: "",
    approver3: "",
  });

  // Example tenant users


  useEffect(() => {
    ExpectionPendingData();
  }, []);

  const openModal = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const handleSaveApprovers = () => {
    console.log("Saving approvers:", approvers);
    console.log("For row:", selectedRow);
    setIsModalOpen(false);
    setApprovers({ approver1: "", approver2: "", approver3: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApprovers((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0F172A] p-8 text-gray-400">
      <h1 className="text-3xl font-bold mb-6">Pending Exception</h1>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#0F172A] text-white w-[400px] rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Add Approver</h2>

            <div>
              <label className="block font-medium mb-1">1st Approver</label>
              <select
                name="approver1"
                value={approvers.approver1}
                onChange={handleChange}
                className="w-full bg-input rounded px-3 py-2"
              >
                <option value="">Select User</option>
                {TenantData.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.company_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">2nd Approver</label>
              <select
                name="approver2"
                value={approvers.approver2}
                onChange={handleChange}
                className="w-full bg-input rounded px-3 py-2"
              >
                <option value="">Select User</option>
                {TenantData.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.company_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">3rd Approver</label>
              <select
                name="approver3"
                value={approvers.approver3}
                onChange={handleChange}
                className="w-full bg-input rounded px-3 py-2"
              >
                <option value="">Select User</option>
                {TenantData.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.company_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-black bg-white rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApprovers}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {hasData ? (
        <div className="overflow-auto custom-scrollbar">
          <div className="overflow-auto rounded-xl border border-slate-700 shadow-xl backdrop-blur-sm">
            <table className="min-w-full text-sm text-slate-200">
              <thead className="sticky top-0 z-10 bg-slate-800/90 backdrop-blur border-b border-slate-700">
                <tr>
                  {[
                    "Start Date",
                    "End Date",
                    "Reason",
                    "Control",
                    "Control Details",
                    "File",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-left text-xs font-semibold tracking-widest uppercase text-slate-300"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-700 bg-slate-800/60">
                {expectionData.map((item, index) => (
                  <tr
                    key={index}
                    className="transition-colors duration-300 hover:bg-slate-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dateFormaterWithDate(item?.exception_start_data)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dateFormaterWithDate(item?.exception_end_data)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.reason}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                          item.compensatory_control === "Yes"
                            ? "bg-green-500/10 text-green-300 border border-green-500/20"
                            : "bg-red-500/10 text-red-300 border border-red-500/20"
                        }`}
                      >
                        {item.compensatory_control}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.compensatory_control === "Yes" ? item.detail : "—"}
                    </td>
                    <td className="px-6 py-4">
                      {item.proof ? (
                        <a
                          href={item.proof}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 hover:text-blue-300 transition"
                        >
                          <img
                            src={item.proof}
                            alt="Proof"
                            className="w-10 h-10 object-cover rounded-md border border-slate-600 shadow-sm hover:scale-105 transition-transform"
                          />
                          <span className="text-xs underline">Download</span>
                        </a>
                      ) : (
                        <span className="italic text-slate-500">No file</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => openModal(item)}
                        className="p-2 rounded-md hover:bg-slate-600/30 transition"
                        title="View Details"
                      >
                        <FaUserCheck className="w-5 h-5 text-green-400 hover:scale-110 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-6">
          No exception requests submitted yet.
        </p>
      )}
    </div>
  );
};

export default ExceptionTable;
