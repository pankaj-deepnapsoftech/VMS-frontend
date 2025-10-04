import { Suspense, useEffect, useState } from "react";
import { useAuthContext, useNessusContext, useVulnerabililtyDataContext } from "@/context";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import Loader from "@/components/Loader/Loader";
import Pagination from "./Pagination";
import { calculateVRS } from "@/utils/vulnerableOperations";
import NoDataFound from "@/components/NoDataFound";
import { isHaveAction } from "@/utils/pageAccess";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export function VulnerabilityData() {
  const { loading, topVulnerabliltyData, TopVulnerablilty } =
    useVulnerabililtyDataContext();
  const { token, tenant } = useAuthContext();

  const { NessusData, getNessusData } = useNessusContext();

  console.log("this is just testing",NessusData)

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  const showTitle = (header) => {
    if (header === "VRS") {
      return "Vulnerability Risk Score";
    }
    return "";
  };

  useEffect(() => {
    if (token) {
      getNessusData();
    };
  }, [token,tenant]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = topVulnerabliltyData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {

  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Heading */}
          <div className="w-full pt-4 px-6">
            <h2 className="text-2xl font-semibold text-white">
              All Vulnerability Data
            </h2>
            <span className="text-subtext text-sm">
              Manage your Vulnerability Data
            </span>
          </div>

          <div className="w-full min-h-screen p-6">
            <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
              {/* SEARCH */}
              <div className="px-6 py-4 border-b border-gray-700 relative">
                <div className="relative">
                  <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
                  <input
                    type="search"
                    placeholder="Search data..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-input backdrop-blur-md py-2 w-1/3 text-white ps-7 pe-3 rounded-md "
                  />
                </div>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto w-full custom-scrollbar">
                <table className="table-fixed min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
                  <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
                    <tr>
                      {[
                        "S No.",
                        "Title",
                        "Scan Type",
                        "Threat Type",
                        "Severity",
                        "Asset",
                        "Status",
                      ]
                        .concat(isHaveAction() ? ["Actions"] : [])
                        .map((header) => (
                          <th
                            title={showTitle(header)}
                            key={header}
                            className="px-4 py-3 border-b border-gray-600 font-medium"
                          >
                            {header}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {NessusData?.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-700 hover:bg-[#1E293B] transition"
                      >
                        <td className="px-4 py-3">{startIndex + index + 1}</td>
                        <td className="px-4 py-3">{item?.Title || item?.plugin_name || "-"}</td>
                        <td className="px-4 py-3">{item?.scan_type || "-"}</td>
                        <td className="px-4 py-3">
                          {item?.threat_type || "-"}
                        </td>
                        <td className="px-4 py-3">
                          {item?.Severity?.name || "-"}
                        </td>
                        <td className="px-4 py-3">
                          {item?.BusinessApplication?.name || "-"}
                        </td>
                        <td className="px-4 py-3">{item?.status || "-"}</td>

                        {isHaveAction() && (
                          <td className="px-4 py-3 flex items-center gap-3">
                            <button
                              title="View"
                              className="text-green-500 hover:text-green-600 transition"
                              onClick={() => console.log("View", item.id)}
                            >
                              <FaEye />
                            </button>
                            <button
                              title="Edit"
                              className=" text-blue-500 hover:text-blue-600 transition"
                              onClick={() => console.log("Edit", item.id)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              title="Delete"
                              className= " text-red-500 hover:text-red-600 transition"
                              onClick={() => console.log("Delete", item.id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <Pagination
                page={currentPage}
                setPage={setCurrentPage}
                hasNextPage={
                  startIndex + itemsPerPage < topVulnerabliltyData?.length
                }
                total={topVulnerabliltyData?.length}
              />
            </div>
          </div>
        </>
      )}
    </Suspense>
  );
}
