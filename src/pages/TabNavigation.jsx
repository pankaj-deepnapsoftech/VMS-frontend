import React, { useState } from "react";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("Devices");

  const tabs = [
    "Devices",
    "Software & Applications",
    "Data",
    "Risk Rating",
    "Risk Rating Guide",
  ];

  return (
    <div className="w-full bg-background dark:bg-gray-900 px-4 py-4 border-b  dark:border-gray-700">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all text-white duration-200
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-table dark:bg-gray-800 text-x gray-700 dark:text-gray-300  dark:hover:bg-gray-700"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
