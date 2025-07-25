import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import NoDataFound from "@/components/NoDataFound";
import { IoSearch } from "react-icons/io5";
import { useAuthContext, useReportContext } from "@/context";
import Loader from "@/components/Loader/Loader";
import { calculateARS, calculateVRS } from "@/utils/vulnerableOperations";

const RiskOperation = () => {

  const { token } = useAuthContext();
  const { riskQuantification, riskQuantificationData, loading } = useReportContext()
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState("");



  const filteredData = riskQuantificationData.filter((item) =>
    item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.BusinessApplication?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) || 
    item?.BusinessApplication?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) || 
    item?.BusinessApplication?.asset_hostname?.toLowerCase()?.includes(searchTerm.toLowerCase()) || 
    item?.InfraStructureAsset?.asset_hostname?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  console.log(filteredData)


  useEffect(() => {
    if (token) {
      riskQuantification()
    }
  }, [token])

  return (
    loading ? <Loader /> : <div>
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
                      "Business Application",
                      "Infrastructure Asset",
                      "Vulnerability Title",
                      "VRS",
                      "ACS",
                      "ALE"
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
                      <td className="px-4 py-3 capitalize">{user?.BusinessApplication?.name || "Not Added"}</td>
                      <td className="px-4 py-3 capitalize">{user?.BusinessApplication?.asset_hostname || user?.InfraStructureAsset?.asset_hostname || "-"}</td>
                      <td className="px-4 py-3">{user.Title || "-"}</td>
                      <td className="px-4 py-3">{calculateVRS(user.EPSS, user.exploit_complexity, user.Exploit_Availale, user.threat_type) || "-"}</td>
                      <td className="px-4 py-3">{user?.BusinessApplication ? calculateARS(user?.BusinessApplication) : calculateARS(user?.InfraStructureAsset) || "0"}</td>
                      <td className="px-4 py-3">{user.role?.role || "—"}</td>



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
            hasNextPage={filteredData.length === 10}
            total={filteredData.length}
          />
        </div>
      </div>
    </div>
  );
};

export default RiskOperation;
