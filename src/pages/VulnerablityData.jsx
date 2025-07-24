import { Suspense, useEffect } from "react";
import { useVulnerabililtyDataContext } from "@/context";
import { FaExclamationTriangle } from "react-icons/fa";
import Loader from "@/components/Loader/Loader";

export function VulnerabilityData() {

  const {
    loading,
    topVulnerabliltyData,
    TopVulnerablilty,
  } = useVulnerabililtyDataContext();



  const getRowColor = (rank) => {
    return rank % 2 === 0 ? "bg-[#0c1120]" : "bg-[#101b3d]";
  };


  useEffect(() => {
    TopVulnerablilty();
  }, []);



  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-4 md:p-6 max-w-[100%] mx-auto bg-gradient-custom min-h-screen">
          {/* top 5 Vulnerability */}


          <h2 className="text-white text-3xl font-semibold pb-5" >Top 5 Vulnerabilities</h2>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-700 shadow-md">
              <thead className="h-8">
                <tr className="bg-[#0c1120] text-gray-100 uppercase text-sm ">
                  <th className=" border-b">Top Vulnerabilities </th>
                  <th className=" border-b">Vulnerability Name</th>
                  <th className=" border-b">
                    Total Vulnerability Instances{" "}
                  </th>
                  <th className=" border-b">Exploitability </th>
                </tr>
              </thead>
              <tbody>
                {topVulnerabliltyData?.map((product, index) => (
                  <tr
                    key={index}
                    className={`text-center text-gray-300 border-b  hover:bg-gray-500 ${getRowColor(
                      index
                    )}`}
                  >
                    <td className="  flex items-center justify-center gap-2">
                      <FaExclamationTriangle className="text-red-500" />{" "}
                      {index + 1}
                    </td>
                    <td className=" ">{product.name}</td>
                    <td className=" ">{product.count}</td>
                    <td className=" ">{product.exploitability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Suspense>
  );
}
