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
          <table className="min-w-full text-sm border border-gray-900">
            <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
              <tr>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Reason</th>
                <th className="px-4 py-2 border">Control</th>
                <th className="px-4 py-2 border">Control Details</th>
                <th className="px-4 py-2 border">File Name</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {expectionData.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-slate-700/50 transition-colors ${
                    index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/50"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {dateFormaterWithDate(item?.exception_start_data)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {dateFormaterWithDate(item?.exception_end_data)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.compensatory_control === "Yes"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.compensatory_control}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {item.compensatory_control === "Yes"
                      ? item.detail
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {item.proof ? (
                      <a
                        href="#"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        download={item.proof}
                      >
                        <img src={item.proof} className="size-10" />
                      </a>
                    ) : (
                      "No file"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <FaUserCheck
                      className="size-8 text-green-400 cursor-pointer"
                      onClick={() => openModal(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
