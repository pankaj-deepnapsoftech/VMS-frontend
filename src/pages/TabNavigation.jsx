import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      title: "Devices",
      path: "devices"
      
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
    
    if (location.pathname === "/assert-inventory") {
      navigate("devices", { replace: true });
    } else {
      setActiveTab(location.pathname);
    }
  }, [location.pathname, navigate]);
  

  return (
    <div className="w-full bg-background dark:bg-gray-900 px-4 py-4 border-b  dark:border-gray-700">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab,index) => (
          <NavLink 
            key={index}
            to={tab.path}  
            className={({ isActive }) =>
              `px-5 py-2 rounded-lg text-sm font-medium transition-all text-white duration-200 ${isActive
                ? "bg-sky-600 text-white shadow-md"
                : "bg-table dark:bg-gray-800 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              }`
            }
          >  
            {tab.title}
          </NavLink> 
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
