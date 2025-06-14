"use client";

import { useState } from "react";
import { FaCheckCircle, FaClock, FaPlug } from "react-icons/fa";
import { MdError } from "react-icons/md";
import {  FaTimesCircle } from 'react-icons/fa';
import { PiLightningFill } from 'react-icons/pi';
const ThirdPartyIntegrations = () => {
  const [activeTab, setActiveTab] = useState("Platform");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("ALL");


  const integrations = [
    {
      name: 'Jira',
      version: 'v8.20.0',
      status: 'Connected',
      synced: '2 minutes ago',
      tags: ['Project Management', 'Issue Tracking', 'Workflow Automation'],
      icon: '🟦',
      category: 'Project Management',
    },
    {
      name: 'Defendly',
      version: 'v2.1.4',
      status: 'Connected',
      synced: '5 minutes ago',
      tags: ['Security', 'Threat Detection', 'Real-time Monitoring', 'Incident Response'],
      icon: '🟥',
      category: 'Security',
    },
    {
      name: 'Splunk',
      version: 'v9.0.2',
      status: 'Pending',
      synced: '',
      tags: ['Monitoring', 'Log Analysis', 'SIEM', 'Machine Learning'],
      icon: '🟩',
      category: 'Monitoring',
    },
    {
      name: 'AWS Security Hub',
      version: 'Latest',
      status: 'Disconnected',
      synced: '',
      tags: ['Cloud', 'Security Findings', 'Compliance', 'Multi-Account'],
      icon: '🟧',
      category: 'Cloud',
    },
    {
      name: 'CrowdStrike',
      version: 'v6.4.50',
      status: 'Connected',
      synced: '1 hour ago',
      tags: ['Security', 'Endpoint Protection', 'Threat Intelligence', 'Incident Response'],
      icon: '🟪',
      category: 'Security',
    },
    {
      name: 'ServiceNow',
      version: 'v2023.1',
      status: 'Error',
      synced: '',
      tags: ['Project Management', 'ITSM', 'Security Operations', 'Workflow'],
      icon: '🟦',
      category: 'Project Management',
    },
    {
      name: 'Qualys',
      version: 'v4.22.0',
      status: 'Disconnected',
      synced: '',
      tags: ['Security', 'Vulnerability Scanning', 'Compliance', 'Asset Discovery'],
      icon: '🟩',
      category: 'Security',
    },
    {
      name: 'Elastic Security',
      version: 'v8.11.0',
      status: 'Connected',
      synced: '30 minutes ago',
      tags: ['Monitoring', 'SIEM', 'Endpoint Security', 'Threat Hunting'],
      icon: '🟨',
      category: 'Monitoring',
    },
  ];

  const statusColors = {
    Connected: 'text-green-400',
    Pending: 'text-yellow-400',
    Disconnected: 'text-gray-400',
    Error: 'text-red-500',
  };

  const statusIcons = {
    Connected: <FaCheckCircle />,
    Pending: <FaClock />,
    Disconnected: <FaPlug />,
    Error: <MdError />,
  };

  return (
    <div className=" h-full w-full bg-transparent text-white">
      <div className="flex w-full">
        <main className="flex-1 p-4 sm:p-6 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-[500]">Third Party Integrations</h1>
              <p className="text-gray-400 text-sm pt-2">
                Connect and manage your security tools and platforms
              </p>
            </div>
            <div className="flex items-center">
              <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition-colors flex items-center">
                <span className="mr-2">+</span> Add Integration
              </button>
            </div>
          </div>

         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
   
            <div className="border border-[#6B72804D] rounded-md flex justify-between px-4 py-3 bg-[#6B728033]">
              <div>
                <p className="text-sky-400 text-sm">Disconnected</p>
                <p className="text-xl">2</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-[#ffffff17] flex justify-center items-center">
                <img src="/Icons/Component 7.png" alt="Disconnected icon" />
              </div>
            </div>

       
            <div className="border border-[#1665344D] rounded-md flex justify-between px-4 py-3 bg-gradient-to-t from-[#14532D4D] to-[#16653433]">
              <div>
                <p className="text-green-400 text-sm">Connected</p>
                <p className="text-xl">4</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-[#ffffff17] flex justify-center items-center">
                <img src="/Icons/closed.png" alt="Connected icon" />
              </div>
            </div>

            <div className="border border-[#854D0E4D] rounded-md flex justify-between px-4 py-3 bg-gradient-to-t from-[#713F124D] to-[#854D0E33]">
              <div>
                <p className="text-yellow-400 text-sm">Pending</p>
                <p className="text-xl">1</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-[#ffffff17] flex justify-center items-center">
                <img src="/Icons/Component 8.png" alt="Pending icon" />
              </div>
            </div>

 
            <div className="border border-[#991B1B4D] rounded-md flex justify-between px-4 py-3 bg-gradient-to-t from-[#7F1D1D4D] to-[#991B1B33]">
              <div>
                <p className="text-red-400 text-sm">Error</p>
                <p className="text-xl">1</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-[#ffffff17] flex justify-center items-center">
                <img src="/Icons/Component 9.png" alt="Error icon" />
              </div>
            </div>
          </div>
         
          <div className="w-full px-4 h-16 border-[#6B728033] flex items-center gap-4 rounded-md backdrop-blur-md bg-[#6B728033]">
            <input type="text" className="bg-[#23252750] backdrop-blur-md py-2 w-1/3 px-4 rounded-md "
              placeholder="Search integrations..."
            />
            <div className="relative w-full sm:w-64">
              <select
                id="All Categories"
                name="All Categories"
                className="bg-[#1f2937] text-white px-4 py-2 pr-10 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none w-full"
              >
                <option value="" disabled>All Categories</option>
                <option value="threat-intelligence">Threat Intelligence</option>
                <option value="sandbox">Sandbox Environments</option>
                <option value="network-monitoring">Network Monitoring</option>
                <option value="endpoint-security">Endpoint Security</option>
                <option value="cloud-security">Cloud Security</option>
                <option value="vulnerability-management">Vulnerability Management</option>
                <option value="siem">SIEM & Log Management</option>
                <option value="access-control">Access Control</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
         </div>

          <div className=" border flex flex-wrap gap-4 p-6   text-white">
            {integrations.map((integration, idx) => (
              <div key={idx} className="bg-[#10162e] p-4 w-[23%]  rounded-xl border border-[#1f2a44] shadow-md flex flex-col justify-between">                                     
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-2 items-center">
                    <span className="text-xl">{integration.icon}</span>
                    <div>
                      <p className="font-semibold">{integration.name}</p>
                      <p className="text-xs text-gray-400">{integration.version}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${statusColors[integration.status]}`}>
                    {statusIcons[integration.status]} {integration.status}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">
                  {integration.synced ? `Synced ${integration.synced}` : ''}
                </p>
                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  {integration.tags.map((tag, i) => (
                    <span key={i} className="bg-[#1f2a44] px-2 py-1 rounded-md text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <button className="bg-[#3c4aff] hover:bg-[#5b61ff] px-4 py-2 text-sm rounded-md">Configure</button>
                  <div className="flex gap-2 text-gray-400">
                    <button>
                      <i className="fas fa-copy" />
                    </button>
                    {/* <PiLightningFill className="text-lg" /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>

  );
}
export default ThirdPartyIntegrations;