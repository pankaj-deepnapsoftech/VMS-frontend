import { Suspense} from "react";
import {  useVulnerabililtyDataContext} from "@/context";
import Loader from "@/components/Loader/Loader";
import TabNavigation from "./TabNavigation";
import { Outlet } from "react-router-dom";

export function AssertInventory() {

  const {loading  } = useVulnerabililtyDataContext();

 

  return (
    <Suspense fallback={<div>Loading...</div>}>
      { (
        <div className="p-4 md:p-6 max-w-[100%] mx-auto min-h-screen bg-gradient-custom ">
            <TabNavigation/>

          {/* top 5 Vulnerability */}

          {/* <div className="py-10 ">
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead className="h-8">
                  <tr className="bg-gradient-to-bl from-[#333333] to-[#666666] text-gray-100 uppercase text-sm ">
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
                      className={`text-center border-b hover:bg-gray-300 ${getRowColor(
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
          </div> */}

          {/* 🔍 Search Bar & Buttons */}
          {/* <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="lg:flex lg:flex-row grid grid-cols-2 gap-4 mt-4   w-full lg:justify-end  lg:items-center py-2 lg:gap-2">
              <button
                onClick={() => openModal()}
                className="px-4 py-2 bg-gradient-to-bl from-[#333333] to-[#666666] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
              >
                <BiPlus className="h-6 w-6 mr-1" />
                Add Vulnerability
              </button>
              <button
                onClick={() => handleBulkAssignTask()}
                className="px-4 py-2 bg-gradient-to-bl from-[#333333] to-[#666666] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
              >
                <BsPersonCheckFill className="h-6 w-6 mr-1" />
                Bulk Task Assign
              </button>
              <button
                onClick={() => handleDownload(filteredData)}
                className="px-4 py-2 bg-gradient-to-bl from-[#333333] to-[#666666] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
              >
                <BiSave className="h-6 w-6 mr-1" />
                Export Data
              </button>

              {authenticate.role !== "ClientCISO" && (
                <button
                  onClick={() => setIsRUModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-bl from-[#333333] to-[#666666] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
                >
                  <BiPlus className="h-6 w-6" />
                  Report Upload
                </button>
              )}

              <Modal
                isOpen={isRUModalOpen}
                onClose={() => setIsRUModalOpen(false)}
                title="Report Upload"
                method={UploadBulkData}
              />
            </div>
          </div> */}

         <Outlet/>
        </div>
      )}
    </Suspense>
  );
}
