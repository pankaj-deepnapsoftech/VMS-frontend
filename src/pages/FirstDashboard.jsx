/* eslint-disable react/prop-types */
import { useAuthContext } from "@/context";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./animation.css";
import { products } from "@/constants/static.data";
import { getInitials } from "@/utils/profile";

// Card component with gradient border
const Card = ({ children, gradient, HandleClick }) => {
  return (
    <div className="p-[1px] w-full">
      <div
        onClick={HandleClick}
        className={`rounded-xl bg-gradient-to-br ${gradient}/40 transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-20 border-b flex items-center justify-center`}
      >
        {children}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { authenticate, Logout, setGetDataFromSession } = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const HandleClick = (item) => {
    sessionStorage.setItem("VROC", item);
    setGetDataFromSession(item);
  };

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
    <div className="container mx-auto px-4 md:px-8 bg-gradient-image min-h-screen">
      {/* Top-right profile dropdown */}
      <div className="absolute top-4 right-6 z-20" ref={dropdownRef}>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-base md:text-lg font-semibold hover:brightness-110 transition"
            aria-label="User menu"
          >
            {authenticate?.fname.split("")[0].toUpperCase()}
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-[#1c1c1e] shadow-lg rounded-md py-2 z-30 border text-white border-gray-800">
              <button
                onClick={Logout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="pt-20 md:pt-24 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold text-blue-400">
          Hello,{" "}
          <span className="capitalize font-lexendDeca">
            {authenticate?.fname}
          </span>
        </h2>
        <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-400">
          Welcome to risk operations center
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-center justify-between h-full mt-10">
        {/* Left Side Label */}
        <div className="w-full md:w-[35%] text-center md:text-left text-3xl md:text-5xl font-semibold text-white leading-tight">
          <span className="text-blue-400">Secure&</span>
          <br />
          AI-Powered <br /> VROC
        </div>

        {/* Right Content */}
        <div className="w-full flex flex-col items-center gap-6">
          {/* Top Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl">
            {products.slice(0, 5).map((item, index) => (
              <Card
                key={index}
                HandleClick={() => HandleClick(item?.title)}
                gradient={item?.gradient}
              >
                <h3 className="text-xs sm:text-sm font-semibold text-gray-200 text-center">
                  {item?.title}
                </h3>
              </Card>
            ))}
          </div>

          {/* Middle VROC Box */}
          <div className="rounded-md bg-[#191925] p-4 text-white text-center w-full max-w-5xl h-20 md:h-24 flex items-center justify-center text-base md:text-2xl">
            Virtual Risk Operations Centre (VROC)
          </div>

          {/* Bottom Row */}    
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl">
            {products.slice(5).map((item, index) => (
              <Card
                key={index}
                HandleClick={() => HandleClick(item?.title)}
                gradient={item?.gradient}
              >
                <h3 className="text-xs sm:text-sm font-semibold text-gray-200 text-center">
                  {item?.title}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
