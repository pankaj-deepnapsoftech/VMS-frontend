/* eslint-disable react/prop-types */
import React from "react";

const ExceptionTable = ({ data }) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="min-h-screen bg-[#0F172A] p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Pending Exception</h1>

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
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-slate-700/50 transition-colors ${
                    index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/50"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {item.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {item.endDate}
                  </td>                   
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.compensatoryControl === "Yes"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"      
                      }`}
                    >
                      {item.compensatoryControl}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {item.compensatoryControl === "Yes"
                      ? item.controlDetails
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {item.approvalFile?.name ? (
                      <a
                        href="#"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        download={item.approvalFile.name}
                      >
                        {item.approvalFile.name}
                      </a>
                    ) : (
                      "No file"
                    )}
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
