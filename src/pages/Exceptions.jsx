import React, { useState } from 'react';
import { FaChartBar, FaCog, FaShieldAlt, FaUsers, FaPaperPlane, FaComments } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { useAuthContext, useExceptionContext, useVulnerabililtyDataContext } from '@/context';
import { BiEditAlt, BiSearch } from 'react-icons/bi';
import { RiDeleteBinFill } from 'react-icons/ri';
import { BsPersonCheckFill } from 'react-icons/bs';
import Loader from '@/components/Loader/Loader';

// Sample data for charts
const vulnerabilityData = [
  { name: 'Jan', riskAccepted: 20, awaitingMaintenance: 15 },
  { name: 'Feb', riskAccepted: 25, awaitingMaintenance: 18 },
  { name: 'Mar', riskAccepted: 30, awaitingMaintenance: 20 },
  { name: 'Apr', riskAccepted: 35, awaitingMaintenance: 22 },
  { name: 'May', riskAccepted: 40, awaitingMaintenance: 25 },
  { name: 'Jun', riskAccepted: 45, awaitingMaintenance: 28 },
];

// const deferralData = [
//   { name: '14+ Days', requests: 25 },
//   { name: '30+ Days', requests: 18 },
//   { name: '45+ Days', requests: 10 },
// ];

const configItemsData = [
  { name: 'Server Apps', count: 90 },
  { name: 'Databases', count: 85 },
  { name: 'Linux Config', count: 60 },
  { name: 'Network Config', count: 45 },
  { name: 'Batch Scripts', count: 30 },
  { name: 'Web Services', count: 20 },
];

// Sample chat messages
const initialMessages = [
  { id: 1, text: 'High severity vulnerability detected in Server Apps', sender: 'system', timestamp: '09:00 AM' },
  { id: 2, text: 'Maintenance window scheduled for Database updates', sender: 'user', timestamp: '09:05 AM' },
];

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
    ExpectionVerifyData, expectionDataFiftyDays } = useExceptionContext()

  const { authenticate } = useAuthContext()




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



  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSendMessage = () => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewMessage('');
    }
  };






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


  console.log("chart data ", expectionDataFiftyDays)

  const deferralData = Object.entries(expectionDataFiftyDays)?.map(([key, value]) => ({
    name: { "15 days": "14+ Days", "30 days": "30+ Days", "45 days": "45+ Days" }[key] || key,
    requests: value,
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
                    <ComposedChart data={vulnerabilityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="riskAccepted" stackId="a" fill="#3B82F6" name="Risk Accepted" />
                      <Bar dataKey="awaitingMaintenance" stackId="a" fill="#34D399" name="Awaiting Maintenance" />
                      <Line type="monotone" dataKey="riskAccepted" stroke="#1E40AF" dot={false} />
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
                    <BarChart data={deferralData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="requests" fill="#2DD4BF" name="Requests" />
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
                    <BarChart data={configItemsData}>
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

          {/* Chat Interface */}
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <FaComments className="h-6 w-6" />
            </button>

            {isChatOpen && (
              <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">Notifications & Chat</h3>
                </div>
                <div className="h-96 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'
                          }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                            }`}
                        >
                          {message.text}
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{message.timestamp}</span>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaPaperPlane className="h-5 w-5" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => {
                          setSelectAll(!selectAll);
                          handleSelectAll(e)
                        }} />
                    </th>
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
                      <td className="px-4 py-4 whitespace-nowrap flex justify-around gap-4">
                        <input
                          type="checkbox"
                          value="bubbles"
                          checked={index.filter((i) => i === item._id).length > 0}
                          onChange={() => handleChecked(item._id)} />

                      </td>
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
                                    console.log(item, "item data");
                                    const updatedItem = { ...item, client_Approve: true };
                                    UpdateData(updatedItem, item?._id);
                                    authenticate?.role === "ClientCISO" ? ExpectionData() : ExpectionVerifyData();
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

          </div>

        </div>}
    </>
  );
}

export default Exceptions;