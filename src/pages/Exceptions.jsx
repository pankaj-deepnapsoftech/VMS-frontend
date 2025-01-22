import React, { useState } from 'react';
import { FaChartBar, FaCog, FaShieldAlt, FaUsers, FaPaperPlane, FaComments } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';

// Sample data for charts
const vulnerabilityData = [
  { name: 'Jan', riskAccepted: 20, awaitingMaintenance: 15 },
  { name: 'Feb', riskAccepted: 25, awaitingMaintenance: 18 },
  { name: 'Mar', riskAccepted: 30, awaitingMaintenance: 20 },
  { name: 'Apr', riskAccepted: 35, awaitingMaintenance: 22 },
  { name: 'May', riskAccepted: 40, awaitingMaintenance: 25 },
  { name: 'Jun', riskAccepted: 45, awaitingMaintenance: 28 },
];

const deferralData = [
  { name: '14+ Days', requests: 25 },
  { name: '30+ Days', requests: 18 },
  { name: '45+ Days', requests: 10 },
];

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

  return (
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
    </div>
  );
}

export default Exceptions;