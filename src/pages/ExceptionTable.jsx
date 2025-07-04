/* eslint-disable react/prop-types */
import { useExceptionContext } from "@/context";
import { dateFormaterWithDate } from "@/utils/dateFormate";
import { useEffect } from "react";
import { FaUserCheck } from "react-icons/fa";

const ExceptionTable = () => {
  const { ExpectionPendingData, expectionData } = useExceptionContext();
  const hasData = Array.isArray(expectionData) && expectionData.length > 0;
  console.log(expectionData)


  useEffect(() => {
    ExpectionPendingData()
  }, [])

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
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {expectionData.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-slate-700/50 transition-colors ${index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/50"
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
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.compensatory_control
                          === "Yes"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {item.compensatory_control
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {item.compensatory_control
                      === "Yes"
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
                   <FaUserCheck className="size-8 text-green-400" />
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
