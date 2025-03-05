import React, { useEffect, useState } from 'react';
import { FaChartBar, FaCog, FaShieldAlt, FaUsers, FaPaperPlane, FaComments } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line, Cell } from 'recharts';
import { useAuthContext, useExceptionContext, useVulnerabililtyDataContext } from '@/context';
import { BiEditAlt, BiSearch } from 'react-icons/bi';
import { RiDeleteBinFill } from 'react-icons/ri';
import { BsPersonCheckFill } from 'react-icons/bs';
import Loader from '@/components/Loader/Loader';




function Exceptions() {

  const {
    UpdateData,
    DeleteData,
    AssignTask
  } =
    useVulnerabililtyDataContext();

  const {
    expectionData,
    loading,
    ExpectionData,
    ExpectionVerifyData,
    expectionDataFiftyDays,
    page,
    setPage,
    riskRating,
    deferredVulnerableItems,
    datafetchCount,
    setdatafetchCount,
    AdminExcectionDataFiftyDays,
    ClientExcectionDataFiftyDays,
    AdminRiskRating,
    AdminDeferredVulnerableItems,
    ClientDeferredVulnerableItems,
    ClientRiskRating


  } = useExceptionContext()

  const { authenticate, token } = useAuthContext()


  useEffect(() => {
    if (token) {

      authenticate?.role === "ClientCISO" ? ExpectionData() : ExpectionVerifyData();

      authenticate?.role !== "ClientCISO" ? AdminExcectionDataFiftyDays() :
        ClientExcectionDataFiftyDays()

      authenticate?.role !== "ClientCISO" ? AdminRiskRating() :
        ClientRiskRating()

      authenticate?.role !== "ClientCISO" ? AdminDeferredVulnerableItems() :
        ClientDeferredVulnerableItems()
    }
  }, [token, authenticate, UpdateData,
    DeleteData,])

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const rowsPerPage = 10;
  const [index, setIndex] = useState([]);



  const tableHeaders =
    expectionData?.length > 0
      ? Object.keys(expectionData[0])?.filter(
        (key) => key !== "_id" && key !== "__v" && key !== "updatedAt" && key !== "docs"
      )
      : [];

  // Headers for the Add form (show all fields)
  const addFormHeaders = tableHeaders.filter(
    (key) => key !== "createdAt" && key !== "updatedAt"
  );

  // Headers for the Edit form (restrict to specific fields)
  const editFormHeaders = [
    "Vulnerability_Classification",
    "Scan_Type",
    "Severity",
    "Priority",
    "Status",
    "Remediate_Upcoming_Time_Line",
  ];

  const filteredData = expectionData?.filter((item) =>
    Object.values(item).some(
      (value) =>
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vulnerability?")) {
      DeleteData(id);
      authenticate?.role === "ClientCISO" ? ExpectionData() : ExpectionVerifyData();
    }
  };


  const colorMapping = { "15 days": "#FF0000", "30 days": "#FFBF00" }; // Red & Amber  
  const defaultColors = ["#28A745", "#007BFF"]; // Green & Blue  

  const deferralData = Object.entries(expectionDataFiftyDays).map(([key, value], index) => ({
    name: { "15 days": "14 Days", "30 days": "30 Days", "45 days": "45 Days" }[key] || key,
    requests: value,
    color: colorMapping[key] || defaultColors[index % 2], // Alternates Green & Blue  
  }));


  const configItemsData = Object.entries(deferredVulnerableItems)?.map(([key, value]) => ({
    name: key,
    count: value,
  }));

  const vulnerabilityData = Object.entries(riskRating).map(([month, values]) => ({
    name: month,
    riskAccepted: values.RiskAccepted || 0,
    awaitingMaintenance: values.AwaitingApproval || 0
  }));



  return (
    <>
      {loading ? <Loader /> :
        <div className="min-h-screen bg-gray-100 relative">


          {/* Main Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart 1: Deferred Vulnerable Items by Reason */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Deferred Vulnerable Items by Reason</h2>
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
                      <Bar dataKey="riskAccepted" stackId="a" fill="#3B82F6" width={10} name="Risk Accepted" />
                      <Bar dataKey="awaitingMaintenance" stackId="a" fill="#FFBF00" name="Awaiting Approval" />

                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Deferral Requests About to Expire */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Deferral Requests About to Expire</h2>
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
              <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Deferred Vulnerable Items by Configuration Item</h2>
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


          <div className="p-4 mb-20 md:p-6 max-w-[95%] mx-auto bg-white rounded-xl shadow-lg">
            <div className="relative mt-4 py-5 md:mt-0">
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search vulnerabilities..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#015289]">

                  <tr>

                    {tableHeaders?.map((header, index) => (
                      <th
                        key={index}
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        {header === "createdAt" ? "Created Date" : header.replace(/_/g, " ")}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedData?.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">

                      {tableHeaders?.map((field, i) => (

                        <td key={i} className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {
                            field === "createdAt" || field === "Expection_time" ? (
                              new Date(item[field]).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            ) : field === "client_Approve" ? (
                              item.client_Approve ? (
                                <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                                  Approved
                                </span>
                              ) : (
                                <button
                                  onClick={() => {

                                    const updatedItem = { ...item, client_Approve: true };
                                    UpdateData(updatedItem, item?._id);

                                  }}
                                  className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                  Verify
                                </button>
                              )
                            ) : (
                              item[field]
                            )
                          }

                        </td>
                      ))}
                      <td className="px-4 py-4 whitespace-nowrap flex justify-around gap-4">
                        {/* <button onClick={() => openModal(item)} className="text-blue-600">
                          <BiEditAlt className="h-5 w-5" />
                        </button> */}
                        <button onClick={() => handleDelete(item._id)} className="text-red-600">
                          <RiDeleteBinFill className="h-5 w-5" />
                        </button>
                        {/* <button onClick={() => {
                          handleAssignTask(item)
                        }} className="text-red-600">
                          <BsPersonCheckFill className="h-5 w-5" />
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <div className="flex justify-between items-center my-16">
              <button
                className={`px-4 py-2 bg-[#015289] text-white border rounded-md ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span>
                Page {page}

              </span>
              <button
                className={`px-4 py-2 border rounded-md  text-white bg-[#015289]`}
                disabled={expectionData?.length < 10}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>

        </div>}
    </>
  );
}

export default Exceptions;