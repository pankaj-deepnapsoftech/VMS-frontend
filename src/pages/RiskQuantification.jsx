import { useState } from "react";
import Pagination from "./Pagination";
import NoDataFound from "@/components/NoDataFound";
import { IoSearch } from "react-icons/io5";
import {
  calculateACS,
  calculateALE,
  calculateARS,
  calculateVRS,
} from "@/utils/vulnerableOperations";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TableSkeletonLoading } from "@/Skeletons/Components/TablesSkeleton";
import { getRiskQuantificationData } from "@/services/RiskDetails.service";
import { useAuthStore } from "@/store/AuthStore";

const RiskOperation = () => {
  const { token, tenant } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: riskQuantificationData,
    isLoading: isRiskQuantificationDataLoading,
  } = useQuery({
    queryKey: ["risk-quantification", { tenant, page }],
    queryFn: () => getRiskQuantificationData({ tenant, page }),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });

  const showTitle = (header) => {
    if (header === "VRS") {
      return "Vulnerability Risk Score";
    } else if (header === "ACS") {
      return "Asset/Application Criticality Score";
    } else if (header === "ARS") {
      return "Aggregated Risk Score";
    } else if (header === "ALE") {
      return "Annualized Loss Expectancy";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-custom text-white p-6">
      <div className="w-full px-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Header */}
 
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Risk Quantification</h1>
          <span className="text-subtext text-sm">
            Manage your Risk Quantification
          </span>
        </div>
      </div>

      <div className="w-full min-h-screen">
        <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-4 py-4 border-b border-gray-700 relative">
            <div className="relative">
              <IoSearch className="text-subtext absolute top-[47%] -translate-y-[50%] left-2 z-10" />
              <input
                type="search"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-input backdrop-blur-md py-2 w-1/3 text-white ps-7 pe-3 rounded-md"
              />
            </div>
          </div>

          {/* Table */}
          {riskQuantificationData?.length < 1 ? (
            <NoDataFound />
          ) : (
            <div className="overflow-x-auto custom-scrollbar w-full">
              {isRiskQuantificationDataLoading ? (
                <TableSkeletonLoading />
              ) : (
                <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
                  <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
                    <tr>
                      {[
                        "S No.",
                        "Business Application",
                        "Infrastructure Asset",
                        "Vulnerability Title",
                        "SLA",
                        "VRS",
                        "ACS",
                        "ARS",
                        "ALE",
                      ].map((header) => (
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
                    {riskQuantificationData?.map((user, index) => (
                      <tr
                        key={user._id}
                        className="hover:bg-[#2d2f32] transition-colors duration-150 whitespace-nowrap"
                      >
                        <td className="px-4 py-3">
                          {index + 1 + (page - 1) * 10}
                        </td>
                        <td className="px-4 py-3 capitalize">
                          {user?.BusinessApplication?.name || "Not Added"}
                        </td>
                        <td className="px-4 py-3 capitalize">
                          {user?.BusinessApplication?.asset_hostname ||
                            user?.InfraStructureAsset?.asset_hostname ||
                            "-"}
                        </td>
                        <td className="px-4 py-3">{user.Title || "-"}</td>
                        <td className="px-4 py-3">{user.SLA || "-"}</td>
                        <td className="px-4 py-3">
                          {calculateVRS(
                            user.EPSS,
                            user.exploit_complexity,
                            user.Exploit_Availale,
                            user.threat_type
                          ) || "-"}
                        </td>
                        <td className="px-4 py-3">
                          {user?.BusinessApplication
                            ? calculateACS(user?.BusinessApplication)
                            : calculateACS(user?.InfraStructureAsset) || "0"}
                        </td>
                        <td className="px-4 py-3">
                          {calculateARS(user) || "0"}
                        </td>
                        <td className="px-4 py-3">
                          $ {calculateALE(user) || "0"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Footer */}
          <Pagination
            page={page}
            setPage={setPage}
            hasNextPage={riskQuantificationData?.length === 10}
            total={riskQuantificationData?.length}
          />
        </div>
      </div>
    </div>
  );
};

export default RiskOperation;
