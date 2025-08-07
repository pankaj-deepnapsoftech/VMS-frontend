/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {  NavLink } from "react-router-dom";
import { useAuthContext } from "@/context";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { products } from "@/constants/static.data";

function Header({ setShowMenu, showSidebar }) {
  const { Logout, getDataFromSession, authenticate } = useAuthContext();

  const [dropDown,setDropDown] = useState(false)


  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      Logout();
    }
  };

  let navList = [];
  products.map((item) => {
    if (getDataFromSession === item.title) {
      if (!authenticate?.role) {
        navList = item.allowedPath;
      } else if (authenticate.role) {
        navList = item.allowedPath.filter((pathItem) =>
          authenticate?.allowed_path.some((authItem) => authItem.value === pathItem.route)
        );
      }
    }
  });




  return (
    <div className=" flex flex-col text-white  h-[100%] hide-scrollbar bg-[#1f2937]   overflow-y-auto transition-all duration-500 ease-in-out ">
      {/* <Link className={` ${showSidebar ? "" : "block lg:hidden"} flex items-center my-2 ml-3`}>
        <div className="flex gap-2 pt-2 items-center justify-center  h-20  ">
          <img src="/logo.png" alt="" className=" h-7" />
        </div>
      </Link> */}
      <hr className="border-gray-100 mx-8" />

      <nav className={`flex-1 mx-2 py-5 space-y-1`}>
        {navList?.map((data) => (
          <React.Fragment key={data.route}>
            <NavLink
              to={data?.route}
              onClick={()=>{setShowMenu();setDropDown(data?.childRoutes && data?.childRoutes.length && !dropDown)}}
              className={({ isActive }) =>
                `flex items-center px-2 py-2 space-x-2 rounded-lg transition duration-200 ${isActive && !(data?.childRoutes && data?.childRoutes.length)  ? "bg-[#3533cc]" : ""
                }`
              }
            >
              <data.icon className="text-white w-5 h-5" />
              {<p className={`text-sm font-semibold text-white flex items-center justify-center gap-2 ${showSidebar ? "" : "block lg:hidden"}`}>{data.title} {data?.childRoutes && data?.childRoutes.length > 0 && <IoIosArrowDown className={` transition-all duration-500 ${dropDown ? 'rotate-0' : "rotate-180"} rotate-180`} />} </p>}
            </NavLink>
            {dropDown  &&  data?.childRoutes && data?.childRoutes.length > 0 && data?.childRoutes.map((item) =>
              <NavLink
              key={item.route}
                to={item.route}
                onClick={setShowMenu}
                className={({ isActive }) =>
                  `flex items-center px-2 py-2 h-fit space-x-2 mx-3 rounded-lg transition duration-200 ${isActive ? "bg-[#3533cc]" : ""
                  }`
                }
              >
                <item.icon className="text-white w-5 h-5" />
                {<p className={`text-sm font-semibold text-white ${showSidebar ? "" : "block lg:hidden"}`}>{item.title}</p>}
              </NavLink>
            )

            }
          </React.Fragment>
        ))}
      </nav>
      <hr className="border-gray-100 mx-8" />
      <div className={`h-full p-2 flex justify-start items-end  ${showSidebar ? "" : "block lg:hidden"}`}>
        <div className="relative p-5 flex ">
          <button
            onClick={handleLogout}
            className="flex 
              w-full
              px-10
              mb-52
              md:mb-24
              items-center  
            text-indigo-600
              hover:scale-95 
             transition
           bg-gradient-to-r 
           
           from-[#3533cc] to-[#2d2aee] 
             rounded-lg  
             justify-center"
          >
            <p className="text-base text-white p-2 font-medium">Log Out</p>

            <IoIosLogOut className="w-6 h-6 text-white " />
          </button>
        </div>
      </div>
    </div>

  );
}

export default Header;
