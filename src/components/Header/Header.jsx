/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ClientSmeList,
  EmployeeList,
} from "@/constants/constants.data";
import { useAuthContext } from "@/context";
import { IoIosLogOut } from "react-icons/io";
import toast from "react-hot-toast";
import { products } from "@/constants/static.data";

function Header({ setShowMenu }) {
  const { Logout, authenticate,getDataFromSession } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      Logout();
    };
  };

  let navList = [];

  switch (authenticate?.role) {
    case "ClientCISO":
      products.map((item)=>{
        if(getDataFromSession === item.title){
         navList = item.allowedCISO.filter((item)=> authenticate.allowed_paths.some((ite)=> ite.value === item.route))
        }
      });
      break;
    case "Assessor":
      navList = EmployeeList;
      break;
    case "Admin":
       products.map((item)=>{
        if(getDataFromSession === item.title){
         navList = item.allowedPath
        }
      });
      break;
    case "ClientSME":
      products.map((item)=>{
        if(getDataFromSession === item.title){
         navList = item.allowedCISO.filter((item)=> authenticate.allowed_paths.some((ite)=> ite.value === item.route))
        };
      });
      break;
    default:
      toast.error("Invalid Role: Access Denied");
  }

  return (
    // <div className="flex h-screen fixed  overflow-y-auto
    //  md:w-[28%] lg:w-[25%] xl:w-[25%] 2xl:w-[20%] ">
    <div className=" flex flex-col text-white  h-[100%] hide-scrollbar bg-[#1d1f22]  overflow-y-auto ">
      <Link to="/" className="flex items-center my-2 ml-3">
        <div className="flex gap-2 pt-2 items-center justify-center ml-14 ">
          <div
            className="w-[100px] h-[100px] bg-blue-500"
            style={{
              WebkitMaskImage: "url('/logo.png')",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              WebkitMaskSize: "contain",
              maskImage: "url('/logo.png')",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              maskSize: "contain",
            }}
          ></div>
        </div>
      </Link>
      <hr className="border-gray-100 mx-8" />

      <nav className="flex-1 mx-2 py-5 space-y-1">
        {navList?.map((data) => (
          <NavLink
            key={data.route}
            to={data.route}
            onClick={setShowMenu}
            className="flex items-center px-2 py-2 space-x-2 rounded-lg   [&.active]:bg-gradient-to-tl from-[#8f5151] to-[#551919]  transition duration-200"
          >
            <data.icon className="text-white w-5 h-5" />
            <p className="text-sm font-semibold text-white">{data.title}</p>
          </NavLink>
        ))}
      </nav>
      <hr className="border-gray-100 mx-8" />
      <div className=" h-full p-2 flex justify-start items-end ">
        <div className="relative p-5 flex ">
          <button
            onClick={handleLogout}
            className="flex 
              w-full
              px-10
              my-10
              items-center  
            text-indigo-600
              hover:scale-95 
             transition
           bg-gradient-to-r 
           
           from-[#d83b3b] to-[#c26d6d] 
             rounded-lg  
             justify-center"
          >
            <p className="text-base text-white p-2 font-medium">Log Out</p>

            <IoIosLogOut className="w-6 h-6 text-white " />
          </button>
        </div>
      </div>
    </div>
    // </div >
  );
}

export default Header;
