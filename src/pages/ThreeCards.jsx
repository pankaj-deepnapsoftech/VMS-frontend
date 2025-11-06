import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useAuthContext } from "@/context";
import { getEighteenthChartData, getElaventhChartData, getFifteenthChartData, getFourteenthChartData, getNineteenthChartData, getSixteenChartData, getTharteenthChartData } from "@/services/TVMDashboard.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AssackExposureSkeletonLoading } from "@/Skeletons/ExecutiveDashbord/thirdSection";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { token, tenant, selectedYear } = useAuthContext();

  const { data: topFiveinfraAssetCount, isLoading: isTopFiveinfraAssetCountLoading } = useQuery({
    queryKey: ["TVMDashboard-eleventh-chart", [selectedYear, tenant]],
    queryFn: () => getElaventhChartData({ tenant, selectedYear }),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });

  const { data: topOpenVulnerabilities, isLoading: isTopOpenVulnerabilitiesLoading } = useQuery({
    queryKey: ["TVMDashboard-tharteenth-chart", [selectedYear, tenant]],
    queryFn: () => getTharteenthChartData({ tenant, selectedYear }),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });

  const { data: topClosedVulnerabilities, isLoading: isTopClosedVulnerabilitiesLoading } = useQuery({
    queryKey: ["TVMDashboard-fourteenth-chart", [selectedYear, tenant]],
    queryFn: () => getFourteenthChartData({ tenant, selectedYear }),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });


  const { data: topUniqueVulnerabilities, isLoading: isTopUniqueVulnerabilitiesLoading } = useQuery({
    queryKey: ["TVMDashboard-fifteenth-chart", [selectedYear, tenant]],
    queryFn: () => getFifteenthChartData({ tenant, selectedYear }),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });

   const { data: breachVulnerableList, isLoading: isBreachVulnerableListLoading } = useQuery({
    queryKey: ["TVMDashboard-eighteenth-chart", [selectedYear, tenant]],
    queryFn: () => getEighteenthChartData({ tenant, selectedYear }),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });


    const { data: exceptionVulnerabilities, isLoading: isExceptionVulnerabilitiesLoading } = useQuery({
    queryKey: ["TVMDashboard-nineteenth-chart", [selectedYear, tenant]],
    queryFn: () => getNineteenthChartData({ tenant, selectedYear }),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });



  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top 5 Vulnerable Assets */}
        {isTopFiveinfraAssetCountLoading ? <AssackExposureSkeletonLoading /> : <div className="bg-[#161e3e] border hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                Top 5 Vulnerable Infrastructure Assets
              </h2>
              <div className="text-xs text-gray-400">
                by Vulnerability Count
              </div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Asset Name</div>
              <div className="col-span-3">Count</div>
            </div>

            {/* Data Rows */}
            {topFiveinfraAssetCount && topFiveinfraAssetCount?.map((asset, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                {/* Asset Name */}
                <div className="col-span-6 truncate">{asset.name}</div>

                {/* Count */}
                <div className="col-span-3 font-semibold text-gray-200">
                  {asset.count}
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Top 5 Open Vulnerabilities */}
        {isTopOpenVulnerabilitiesLoading ? <AssackExposureSkeletonLoading /> : <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                Top 5 Open Vulnerabilities
              </h2>
              <div className="text-xs text-gray-400">by VRS</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Vulnerability ID</div>
              <div className="col-span-3 text-right">Severity</div>
            </div>

            {/* Data Rows */}
            {topOpenVulnerabilities && topOpenVulnerabilities.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                {/* Vulnerability ID */}
                <div className="col-span-6 truncate">{vuln.name}</div>

                {/* Severity */}
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {vuln.count}
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Top 5 Closed Vulnerabilities */}
        {isTopClosedVulnerabilitiesLoading ? <AssackExposureSkeletonLoading /> : <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                Top 5 Closed Vulnerabilities
              </h2>
              <div className="text-xs text-gray-400">by VRS</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Vulnerability ID</div>
              <div className="col-span-3 text-right">Severity</div>
            </div>

            {/* Data Rows */}
            {topClosedVulnerabilities && topClosedVulnerabilities.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln?.name}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {vuln?.count}
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Top 5 Unique Vulnerabilities */}
       {isTopUniqueVulnerabilitiesLoading ? <AssackExposureSkeletonLoading />  : <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                Top 5 Unique Vulnerabilities
              </h2>
              <div className="text-xs text-gray-400">by Occurrences</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Vulnerability ID</div>
              <div className="col-span-3 text-right">Occurrences</div>
            </div>

            {/* Data Rows */}
            {topUniqueVulnerabilities && topUniqueVulnerabilities.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln.name}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {vuln.count}
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Breach Vulnerabilities List */}
       {isBreachVulnerableListLoading ? <AssackExposureSkeletonLoading />  : <div className="bg-[#161e3e] border hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out border-gray-800 text-white p-6 rounded-xl h-auto w-full
         lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-semibold mb-1">SLA Breach List</h2>
              <div className="text-xs text-gray-400">by VRS</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            <div className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Vulnerability ID</div>
              <div className="col-span-3 text-right">Severity</div>
            </div>

            {breachVulnerableList && breachVulnerableList?.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln?.name}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {vuln?.VRS}
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Exception Vulnerabilities List */}
       {isExceptionVulnerabilitiesLoading ? <AssackExposureSkeletonLoading />   :  <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white p-6 rounded-xl h-auto w-full
         lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">
                Exception Vulnerabilities List
              </div>
              <div className="text-xs text-gray-400">by Severity</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            <div className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Vulnerability ID</div>
              <div className="col-span-3 text-right">Severity</div>
            </div>

            {exceptionVulnerabilities  && exceptionVulnerabilities?.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln.name}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {vuln.severity}
                </div>
              </div>
            ))}
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Dashboard;
