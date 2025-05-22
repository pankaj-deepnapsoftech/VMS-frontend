/* eslint-disable react/prop-types */
import { useAuthContext } from "@/context";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./animation.css";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { products } from "@/constants/static.data";

// Card component with gradient border
const Card = ({ children, gradient, HandleClick }) => {
  return (
    <div
      onClick={HandleClick}
      className={`p-[1px] rounded-xl bg-gradient-to-br ${gradient} transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer max-w-sm w-full`}
    >
      <div className="rounded-xl text-center bg-[#1c1c1e] p-6 min-h-[80px] backdrop-blur-md bg-opacity-80 transition-colors duration-300">
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

const Dashboard = () => {
  const { authenticate, Logout, setGetDataFromSession } = useAuthContext();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const HandleClick = (item) => {
    sessionStorage.setItem("VROC", item);
    setGetDataFromSession(item);
  };

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

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gradient-image h-screen">
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
            <div className="absolute right-0 mt-2 w-60 bg-[#1c1c1e] shadow-lg rounded-md py-2 z-30 border text-white border-gray-800">
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


      <div className="flex flex-col items-center gap-8 pt-10">
        {/* Header */}
        <div className="rounded-md bg-[#191925] p-4 text-white text-center  h-24 flex items-center justify-center">
          Secure& Vulnerability & Risk Operations Centre (VROC)
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
          <Card
            HandleClick={() => HandleClick(products[0].title)}
            gradient={products[0].gradient}
          >
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-blue-300">
              {products[0].title}
            </h3>
          </Card>

          <Card
            HandleClick={() => HandleClick(products[1].title)}
            gradient={products[1].gradient}
          >
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-blue-300">
              {products[1].title}
            </h3>
          </Card>

          <Card
            HandleClick={() => HandleClick(products[2].title)}
            gradient={products[2].gradient}
          >
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-blue-300">
              {products[2].title}
            </h3>
          </Card>

          <Card
            gradient={products[3].gradient}
            HandleClick={() => HandleClick(products[3].title)}
          >
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-blue-300">
              {products[3].title}
            </h3>
          </Card>
        </div>

        {/* Middle Section with Arrows */}
        <div className="relative w-full max-w-5xl flex justify-center">
          <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-16 border-b-2 border-l-2 border-r-2 border-blue-700"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl z-10">
            <div className="md:col-start-1 md:col-end-2 flex justify-center">
              <div
                className={`p-[1px] rounded-md bg-gradient-to-br ${products[3].gradient} w-full max-w-xs transition-transform transform hover:scale-105`}
              >
                <div className="rounded-md bg-[#1c1c1e] p-4 text-white text-center h-24 flex items-center justify-center">
                  AI-VA
                </div>
              </div>
            </div>
            <div className="md:col-start-2 md:col-end-3 flex justify-center">
              <div
                className={`p-[1px] rounded-md bg-gradient-to-br ${products[2].gradient} w-full max-w-xs transition-transform transform hover:scale-105`}
              >
                <div className="rounded-md bg-[#1c1c1e] p-4 text-white text-center h-24 flex items-center justify-center">
                  Vulnerability Intelligence
                </div>
              </div>
            </div>
          </div>

          {/* Arrows for mobile */}
          <div className="flex md:hidden flex-col items-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ArrowUp className="text-blue-700" />
            <ArrowDown className="text-blue-700" />
          </div>

          {/* Arrows for desktop */}
          <div className="hidden md:block absolute top-0 left-[25%] -translate-x-1/2 mt-16">
            <ArrowRight className="text-blue-700" />
          </div>
          <div className="hidden md:block absolute top-0 right-[25%] translate-x-1/2 mt-16">
            <ArrowLeft className="text-blue-700" />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
          <Card
            gradient={products[4].gradient}
            HandleClick={() => HandleClick(products[4].title)}
          >
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-blue-300">
              {products[4].title}
            </h3>
          </Card>

          <Card
            gradient={products[5].gradient}
            HandleClick={() => HandleClick(products[5].title)}
          >
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-blue-300">
              {products[5].title}
            </h3>
          </Card>

          <Card
            gradient={products[6].gradient}
            HandleClick={() => HandleClick(products[6].title)}
          >
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-blue-300">
              {products[6].title}
            </h3>
          </Card>

          <Card
            gradient={products[7].gradient}
            HandleClick={() => HandleClick(products[7].title)}
          >
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-blue-300">
              {products[7].title}
            </h3>
          </Card>
        </div>

        {/* Footer */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-5xl justify-end">
          <div className="sm:col-start-2 sm:col-end-3">
            <div className="bg-emerald-500 text-white p-4 flex items-center justify-center text-center rounded-md h-12 mb-4">
              In House
            </div>
            <div className="bg-blue-700 text-white p-4 flex items-center justify-center text-center rounded-md h-12">
              Integrations
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;

