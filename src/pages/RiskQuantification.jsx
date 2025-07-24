import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import Pagination from "./Pagination";
import NoDataFound from "@/components/NoDataFound";
import { IoSearch } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";

const RiskOperation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState("");
  const [EmpData, setEmpData] = useState([]);

  const filteredData = [];

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Optional Left Side Heading */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-white">Risk Quantification</h2>
          <span className="text-subtext text-sm">
            Manage your Risk Quantification
          </span>
        </div>
      </div>

      <div className="w-full  min-h-screen p-6">
        <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-700 relative">
            <div className="relative">
              <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
              <input
                type="search"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-input backdrop-blur-md py-2 w-1/3 text-white ps-7 pe-3 rounded-md "
              />
            </div>
          </div>

          {/* Table */}
          {filteredData?.length < 1 ? (
            <NoDataFound />
          ) : (
            <div className="overflow-x-auto custom-scrollbar w-full">
              <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
                <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
                  <tr>
                    {[
                      "S No.",
                      "First Name",
                      "Last Name",
                      "Email",
                      "Phone",
                      "Role",
                      "Tenant",
                      "Partner",
                      "Status",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 border-b border-gray-600 font-medium"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredData.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-[#2d2f32] transition-colors duration-150 whitespace-nowrap"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 capitalize">{user.fname}</td>
                      <td className="px-4 py-3 capitalize">{user.lname}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.phone}</td>
                      <td className="px-4 py-3">{user.role?.role || "—"}</td>
                      <td className="px-4 py-3">
                        {user.tenant?.company_name || "—"}
                      </td>
                      <td className="px-4 py-3">
                        {user.partner?.company_name || "—"}
                      </td>
                      <td className="px-4 py-3">
                        {user.deactivate ? (
                          <button className="bg-[#395042] hover:bg-green-700 text-green-500 px-3 py-1 rounded-full text-xs">
                            Activate
                          </button>
                        ) : (
                          <button className="bg-[#3E212D] hover:bg-[#2b161e] text-[#EC6C6D] px-3 py-1 rounded-full text-xs">
                            Deactivate
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          title="Delete"
                          className="text-subtext hover:text-subTextHover"
                        >
                          <FaRegTrashAlt className="w-5 h-5" />
                        </button>
                        <button
                          title="Edit"
                          className="text-subtext hover:text-blue-700"
                        >
                          <RiEdit2Line className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <Pagination
            page={page}
            setPage={setPage}
            hasNextPage={EmpData.length === 10}
            total={EmpData.length}
          />
        </div>
      </div>
    </div>
  );
};

export default RiskOperation;
