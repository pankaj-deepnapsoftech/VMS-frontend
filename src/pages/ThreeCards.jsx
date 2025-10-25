import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
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
import { useAuthContext, useTVMCardsContext } from "@/context";

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
  const {
    tenthChart,
    elaventhChart,
    topFiveinfraAssetCount,
    twelfthChart,
    TharteenthChart,
    topOpenVulnerabilities,
    fourteenthChart,
    topClosedVulnerabilities,
    fifthteenthChart,
    topUniqueVulnerabilities,
    SixteenthChart,
    ninteenthChart,
    exceptionVulnerabilities,
    seventeenthChart,
    eightteenthChart,
    breachVulnerableList,
    twntythChart,
  } = useTVMCardsContext();

  useEffect(() => {
    if (token) {
      tenthChart(tenant, selectedYear);
      elaventhChart(tenant, selectedYear);
      twelfthChart(tenant, selectedYear);
      TharteenthChart(tenant, selectedYear);
      fourteenthChart(tenant, selectedYear);
      fifthteenthChart(tenant, selectedYear);
      SixteenthChart(tenant, selectedYear);
      ninteenthChart(tenant, selectedYear);
      seventeenthChart(tenant, selectedYear);
      eightteenthChart(tenant, selectedYear);
      twntythChart(tenant, selectedYear);
    }
  }, [token, tenant, selectedYear]);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top 5 Vulnerable Assets */}
        <div className="bg-[#161e3e] border hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
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
            {topFiveinfraAssetCount?.map((asset, idx) => (
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
        </div>

        {/* Top 5 Open Vulnerabilities */}
        <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white p-6 rounded-xl h-auto w-full lg:flex-1">
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
            {topOpenVulnerabilities.map((vuln, idx) => (
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
        </div>

        {/* Top 5 Closed Vulnerabilities */}
        <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white p-6 rounded-xl h-auto w-full lg:flex-1">
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
            {topClosedVulnerabilities.map((vuln, idx) => (
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
        </div>

        {/* Top 5 Unique Vulnerabilities */}
        <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white p-6 rounded-xl h-auto w-full lg:flex-1">
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
            {topUniqueVulnerabilities.map((vuln, idx) => (
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
        </div>

        {/* Breach Vulnerabilities List */}
        <div className="bg-[#161e3e] border hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out border-gray-800 text-white p-6 rounded-xl h-auto w-full mb-20 lg:flex-1">
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

            {breachVulnerableList?.map((vuln, idx) => (
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
        </div>

        {/* Exception Vulnerabilities List */}
        <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white p-6 rounded-xl h-auto w-full mb-20 lg:flex-1">
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

            {exceptionVulnerabilities?.map((vuln, idx) => (
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
