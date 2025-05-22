/* eslint-disable react/prop-types */
import { useAuthContext } from "@/context";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./animation.css";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { products } from "@/constants/static.data";
import { getInitials } from "@/utils/profile";

// Card component with gradient border
const Card = ({ children, gradient, HandleClick }) => {
  return (
    <div

      className={`p-[1px]`}
    >
      <div onClick={HandleClick} className={`rounded-xl bg-gradient-to-br ${gradient}/40 transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer max-w-sm w-full flex item-center justify-center h-16`}>
        {children}
      </div>
    </div>
  );
};


// Function to get initials from full name 


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

      <div className="flex gap-2 h-[90%] items-center -translate-y-16 ">
        {/* right div */}
        <div className="md:w-[30%] h- items-center  justify-center   text-5xl font-semibold  text-white ">
          <span className="text-blue-400" >
            Secure& 
          </span>
<br/> AI-Powered <br/> VROC
        </div>

        {/* left div */}
        <div className="flex flex-col items-center gap-8 pt-10">



          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl">

            {products.map((item, index) => {
              if (index <= 4) {
                return <Card key={index}
                  HandleClick={() => HandleClick(item?.title)}
                  gradient={item?.gradient}
                >
                  <h3 className="text-sm font-semibold text-gray-200 group-hover:text-blue-300 flex h-full w-full items-center justify-center">
                    {item?.title}
                  </h3>
                </Card>
              }
            })}

          </div>

          {/* Middle Section with Arrows */}
          <div className="rounded-md bg-[#191925] p-4 text-white text-center w-full max-w-5xl h-24 flex items-center justify-center text-2xl">
            Virtual  Risk Operations Centre (VROC)
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl">
            {products.map((item, index) => {
              if (index > 4) {
                return <Card key={index}
                  HandleClick={() => HandleClick(item?.title)}
                  gradient={item?.gradient}
                >
                  <h3 className="text-sm font-semibold text-gray-200 group-hover:text-blue-300 flex h-full w-full items-center justify-center">
                    {item?.title}
                  </h3>
                </Card>
              }
            })}
          </div>


        </div>
      </div>


    </div>
  );
};

export default Dashboard;

