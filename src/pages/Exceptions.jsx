import { useEffect, useState } from "react";
import { FaChartBar } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Cell,
} from "recharts";
import {
  useAuthContext,
  useExceptionContext,
  useVulnerabililtyDataContext,
} from "@/context";
import { BiSearch } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import Loader from "@/components/Loader/Loader";
import NoDataFound from "@/components/NoDataFound";
import { excelDateToJSDate } from "@/utils/utils";

function Exceptions() {
  const { UpdateData, DeleteData } = useVulnerabililtyDataContext();

  const {
    expectionData,
    loading,
    page,
    setPage,
    ExpectionData,
    ExpectionPendingData,
    expectionDataFiftyDays,
    riskRating,
    deferredVulnerableItems,
    ClientExcectionDataFiftyDays,
    ClientDeferredVulnerableItems,
    ClientRiskRating,
  } = useExceptionContext();

  const { authenticate, token } = useAuthContext();

  useEffect(() => {
    if (token) {
      authenticate?.role === "ClientCISO"
        ? ExpectionData()
        : ExpectionPendingData();
      ClientExcectionDataFiftyDays();
      ClientRiskRating();
      ClientDeferredVulnerableItems();
    }
  }, [token, authenticate, UpdateData, DeleteData, page]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const tableHeaders =
    []?.length > 0
      ? Object.keys(expectionData[0])?.filter(
        (key) =>
          key !== "_id" &&
          key !== "__v" &&
          key !== "updatedAt" &&
          key !== "docs"
      )
      : [];

  const filteredData = expectionData?.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vulnerability?")) {
      DeleteData(id);
      authenticate?.role === "ClientCISO"
        ? ExpectionData()
        : ExpectionPendingData();
    }
  };

  const colorMapping = { "15 days": "#FF0000", "30 days": "#FFBF00" }; // Red & Amber
  const defaultColors = ["#28A745", "#007BFF"]; // Green & Blue

  const deferralData = Object.entries(expectionDataFiftyDays).map(
    ([key, value], index) => ({
      name:
        { "15 days": "14 Days", "30 days": "30 Days", "45 days": "45 Days" }[
        key
        ] || key,
      requests: value,
      color: colorMapping[key] || defaultColors[index % 2], // Alternates Green & Blue
    })
  );

  const configItemsData = Object.entries(deferredVulnerableItems)?.map(
    ([key, value]) => ({
      name: key,
      count: value,
    })
  );

  const vulnerabilityData = Object.entries(riskRating).map(
    ([month, values]) => ({
      name: month,
      riskAccepted: values.RiskAccepted || 0,
      awaitingMaintenance: values.AwaitingApproval || 0,
    })
  );

  console.log(vulnerabilityData);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-background relative">
          {/* Main Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Chart 1: Deferred Vulnerable Items by Reason */}
              <div className="bg-[#2d333b] p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Deferred Vulnerable Items by Reason
                  </h2>
                  <FaChartBar className="h-5 w-5 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={vulnerabilityData} barSize={40}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="riskAccepted"
                        stackId="a"
                        fill="#3B82F6"
                        width={10}
                        name="Risk Accepted"
                      />
                      <Bar
                        dataKey="awaitingMaintenance"
                        stackId="a"
                        fill="#FFBF00"
                        name="Awaiting Approval"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Deferral Requests About to Expire */}
              <div className="bg-[#2d333b] p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Deferral Requests About to Expire
                  </h2>
                  <FaChartBar className="h-5 w-5 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deferralData} barSize={40}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="requests" name="Requests">
                        {deferralData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 3: Configuration Items */}
              <div className="bg-[#2d333b] p-6 rounded-lg shadow text-white lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Deferred Vulnerable Items by Configuration Item
                  </h2>
                  <FaChartBar className="h-5 w-5 text-gray-400" />
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={configItemsData} barSize={40}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#2DD4BF" name="Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>


        </div>
      )}
    </>
  );
}

export default Exceptions;
