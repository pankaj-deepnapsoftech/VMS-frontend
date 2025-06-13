"use client";

import { useState } from "react";

  const ThirdPartyIntegrations = () => {
  const [activeTab, setActiveTab] = useState("Platform");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("ALL");

  const integrations = [
    {
      id: 1,
      name: "Jira",
      icon: "🛡️",
      installedOn: "24-Jan-2024",
      category: "Open Source Jira",
    },
  ];

  return (
    <div className="min-h-[90%] bg-transparent text-white">
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-[500]">Third Party Integrations</h1>

              {/* <div className="relative">
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="bg-cards text-white px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
                >
                  <option value="ALL">ALL</option>
                  <option value="Open Source Threat Intel">
                    Open Source Threat Intel
                  </option>
                  <option value="Sandbox">Sandbox</option>
                  <option value="Essentials">Essentials</option>
                  <option value="IP Intel">IP Intel</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div> */}
            </div>

            <div className="flex items-center space-x-4">
              {/* <div className="flex items-center bg-cards rounded-md">
                <div className="pl-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Type to search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 px-3 py-2 focus:outline-none w-64"
                />
                <button className="bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded-r-md transition-colors">
                  Go
                </button>
              </div> */}

              {/* New Integration Button */}
              <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition-colors flex items-center">
                <span className="mr-2">+</span>
                Add Integration
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations
              .filter(
                (integration) =>
                  filterValue === "ALL" || integration.category === filterValue
              )
              .filter((integration) =>
                integration.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((integration) => (
                <div
                  key={integration.id}
                  className="bg-cards rounded-lg p-6 relative"
                >
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>

                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 text-2xl">
                      {integration.icon}
                    </div>
                    <h3 className="text-lg font-semibold">
                      {integration.name}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-400 text-sm">Installed On</p>
                      <p className="text-white">{integration.installedOn}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Category</p>
                      <p className="text-white">{integration.category}</p>
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
export default ThirdPartyIntegrations ;