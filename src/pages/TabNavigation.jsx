import React, { useState } from "react";

const  TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("For You");

  const tabs = [
    "Devices",
    "Software & Applications",
    "Data",
    "Risk Rating",
    "Risk Rating Guide",
  ];

  return (
    <div className="w-full border-b">
      <div className="flex space-x-8 px-4 py-2 bg-background">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-2 font-medium transition-all duration-200 ${
              activeTab === tab
                ? "text-white"
                : "text-white hover:text-gray-400"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
