/* eslint-disable react/prop-types */
import { useAuthContext } from "@/context";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./animation.css";

// Card component with gradient border
const Card = ({ children, gradient }) => {
  return (
    <div
      className={`p-[1px] rounded-xl bg-gradient-to-br ${gradient} transform transition duration-300 hover:scale-105 hover:shadow-xl`}
    >
      <div className="rounded-xl bg-[#1c1c1e] p-6 min-h-[180px] backdrop-blur-md bg-opacity-80 transition-colors duration-300">
        {children}
      </div>
    </div>
  );
};

// Function to get initials from full name
function getInitials(fullName) {
  return (
    fullName
      ?.split(" ")
      .filter(Boolean)
      .map((item) => item[0].toUpperCase())
      .join("") || "A"
  );
}

const Dashboard = ({ setGetDataFromSession }) => {
  const { authenticate, Logout } = useAuthContext();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const products = [
    {
      title: "Asset Inventory",
      desc: "Centralized asset visibility and management",
      gradient: "from-[#ee9ca7] to-[#ffdde1]",
    },
    {
      title: "TVM",
      desc: "Threat and Vulnerability Management",
      gradient: "from-[#ff7e5f] to-[#feb47b]",
    },
    {
      title: "ASM",
      desc: "Attack Surface Monitoring for real-time visibility",
      gradient: "from-[#00c6ff] to-[#0072ff]",
    },
    {
      title: "Remediation Factory",
      desc: "Automated remediation of vulnerabilities or security issues across an organization.",
      gradient: "from-[#6a11cb] to-[#2575fc]",
    },
    {
      title: "GRC",
      desc: "Governance, Risk, and Compliance",
      gradient: "from-[#f7971e] to-[#ffd200]",
    },
    {
      title: "TPRM",
      desc: "Third-Party Risk Management",
      gradient: "from-[#43cea2] to-[#185a9d]",
    },
    {
      title: "Reports",
      desc: "Generate reports & dashboards automatically",
      gradient: "from-[#a1c4fd] to-[#c2e9fb]",
    },
    {
      title: "Administration",
      desc: "Admin control panel for team and roles",
      gradient: "from-[#fceabb] to-[#f8b500]",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-right text-white font-sans bg-gradient-image bg-contain relative">
      {/* Profile Icon and Dropdown */}
      <div className="absolute top-4 right-6 z-20" ref={dropdownRef}>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold hover:brightness-110 transition"
            aria-label="User menu"
          >
            {getInitials(authenticate?.full_name || "")}
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-60 bg-[#1c1c1e] shadow-lg rounded-md py-2 z-30 border border-gray-800">
              <button
                onClick={() => navigate("/profile-update")}
                className="block w-full hover:bg-gray-800 px-4 py-2 text-lg text-left"
              >
                Profile Update
              </button>
              <button
                onClick={Logout}
                className="block w-full hover:bg-gray-800 px-4 py-2 text-lg text-left"
                disabled={loading}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="px-2 pt-6 sm:px-6">
        <h2 className="text-4xl font-bold text-blue-400">
          Hello,{" "}
          <span className="capitalize font-lexendDeca">
            {authenticate?.full_name}
          </span>
        </h2>
        <p className="mt-2 text-gray-400">Welcome to risk operations center</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-x-10 px-2 sm:px-6 mt-6 flex-grow py-10">
        <div className="w-full lg:max-w-md mb-10 lg:mb-0"></div>
        <div className="flex-1 relative gap-10 ml-0 mt-10 lg:ml-20 min-w-[300px] px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <div
                key={i}
                className="animate-fade-in cursor-pointer"
                onClick={() => {
                  sessionStorage.setItem("main-page", product.title);
                  setGetDataFromSession("true");
                }}
              >
                <Card gradient={product.gradient}>
                  <h3 className="text-lg font-semibold group-hover:text-blue-300">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 group-hover:text-gray-300">
                    {product.desc}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
