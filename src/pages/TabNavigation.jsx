import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("Devices");
  const location = useLocation();

  const tabs = [
    {
      title: "Devices",
      path: "/"
    },
    {
      title: "Software & Applications",
      path: "/"
    },
    {
      title: "Data",
      path: "/"
    },
    {
      title: "Risk Rating",
      path: "/"
    },
    {
      title: "Risk Rating Guide",
      path: "/"
    },
  ];

  useEffect(() => {
    setActiveTab(location.pathname)
  }, [location.pathname])

  return (
    <div className="w-full bg-background dark:bg-gray-900 px-4 py-4 border-b  dark:border-gray-700">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab,index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab.path)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all text-white duration-200
              ${activeTab === tab.path
                ? "bg-blue-600 text-white shadow-md"
                : "bg-table dark:bg-gray-800 text-gray-700 dark:text-gray-300  dark:hover:bg-gray-700"
              }
            `}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
