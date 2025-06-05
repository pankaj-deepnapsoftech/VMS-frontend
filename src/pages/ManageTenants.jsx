import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const tenants = [
  {
    code: "TC01",
    name: "Tenant One",
    apiKey: "*************",
    createdOn: "29-May-2025 13:41:12",
    createdBy: "admin",
    safeDomain: "safedomain1.com",
  },
  {
    code: "TC02",
    name: "Tenant Two",
    apiKey: "*************",
    createdOn: "20-May-2025 14:52:41",
    createdBy: "admin",
    safeDomain: "safedomain2.com",
  },
];

export default function ManageTenants() {
  return (
    <div className="bg-[#2a2c2f] min-h-screen text-white p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Manage Tenants</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Type to search"
            className="px-3 py-2 rounded bg-[#1f2124] border border-gray-600 text-sm w-64"
          />
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1 rounded">Go</button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded">+ New Tenant</button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 px-2 py-2 border-b border-gray-600 text-gray-400 text-sm font-medium">
        <div>Tenant Code</div>
        <div>Name</div>
        <div>API Key</div>
        <div>Created On</div>
        <div>Created By</div>
        <div className="flex items-center gap-1">
          Safe Domain(s)
          <span className="text-blue-400 cursor-pointer text-xs">ⓘ</span>
        </div>
        <div>Actions</div>
      </div>

      {/* Table Rows */}
      {tenants.map((tenant, index) => (
        <div
          key={index}
          className="grid grid-cols-7 gap-4 items-center border-b border-gray-700 py-4 px-2 text-sm"
        >
          <div className="bg-red-600 w-6 h-6 rounded-sm" />
          <div className="bg-red-600 w-32 h-6 rounded" />
          <div>{tenant.apiKey}</div>
          <div>{tenant.createdOn}</div>
          <div>{tenant.createdBy}</div>
          <div className="bg-red-600 w-32 h-6 rounded" />
          <div className="flex items-center gap-3 text-gray-300">
            <FaEye className="cursor-pointer hover:text-white" title="View" />
            <FaEdit className="cursor-pointer hover:text-white" title="Edit" />
            <FaTrash className="cursor-pointer hover:text-white" title="Delete" />
          </div>
        </div>
      ))}
    </div>
  );
}
