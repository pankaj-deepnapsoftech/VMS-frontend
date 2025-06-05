import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const navigate = useNavigate();


  const tabs = [
    {
      title: "Devices",
      path: ""

    },
    {
      title: "Software & Applications",
      path: "software-application"
    },
    {
      title: "Data",
      path: "data-table"
    },
    {
      title: "Risk Rating",
      path: "risk-rating-table"
    },
    {
      title: "Risk Rating Guide",
      path: "risk-rating-guide"
    },
  ];

  useEffect(() => {

    let paths = location.pathname.split("/");
    paths = paths[paths.length - 1]

    if (paths === "asset-inventory") {
      paths = ""
    }
    setActiveTab(paths);
  }, [location.pathname, navigate]);


  return (
    <div className="w-full bg-background dark:bg-gray-900 px-4 py-4 border-b  dark:border-gray-700">
      <nav className="bg-gray-900 border-b border-gray-700">
        <div className="flex">
          {tabs.map((tab) => (
            <Link to={tab.path}
              key={tab.path}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.path
                  ? "border-blue-500 text-white bg-gray-800"
                  : "border-transparent text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
            >
              {tab.title}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default TabNavigation;
