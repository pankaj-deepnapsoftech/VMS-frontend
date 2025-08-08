/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "@/context";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { products } from "@/constants/static.data";

function Header({ setShowMenu, showSidebar }) {
  const { Logout, getDataFromSession, authenticate } = useAuthContext();

  const [dropDown, setDropDown] = useState(false);

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
          authenticate?.allowed_path.some(
            (authItem) => authItem.value === pathItem.route
          )
        );
        if (getDataFromSession === "Threat & Vulnerability Management (TVM)") {
          const childRoutes = item.allowedPath[1].childRoutes.filter((child) =>
            authenticate?.allowed_path.some(
              (authItem) => authItem.value === child.route
            )
          );
          if (childRoutes.length > 0) {
            navList = [
              ...navList,
              { ...item.allowedPath[1], childRoutes: childRoutes },
            ];
          }
        }
      }
    }
  });

  useEffect(() => {
    if (dropDown) {
      setDropDown(false);
    }

    const filter = navList
      .filter((item) => item?.childRoutes)[0]
      ?.childRoutes.filter((ite) => ite.route === location.pathname);

    if (filter?.length > 0 && !dropDown) {
      setDropDown(true);
    }
  }, [showSidebar]);

  return (
    <div className=" flex flex-col text-white  h-[100%] hide-scrollbar bg-[#1f2937]   overflow-y-auto transition-all duration-500 ease-in-out ">
      <hr className="border-gray-100 mx-8" />

      <nav className={`flex-1 mx-2 py-5 space-y-1 `}>
        {navList?.map((data) => (
          <React.Fragment key={data.route}>
            <NavLink
              to={data?.route}
              onClick={() => {
                !(data?.childRoutes && data?.childRoutes.length) &&
                  setShowMenu();
                setDropDown(
                  data?.childRoutes && data?.childRoutes.length && !dropDown
                );
              }}
              className={({ isActive }) =>
                `flex items-center px-2 py-2 space-x-2 rounded-lg transition duration-200 ${
                  isActive && !(data?.childRoutes && data?.childRoutes.length)
                    ? "bg-[#3533cc]"
                    : ""
                }`
              }
            >
              <data.icon className="text-white w-5 h-5" />
              {
                <p
                  className={`text-sm font-semibold text-white flex items-center justify-center gap-2 ${
                    showSidebar ? "" : "block lg:hidden"
                  }`}
                >
                  {data.title}{" "}
                  {data?.childRoutes && data?.childRoutes.length > 0 && (
                    <IoIosArrowDown
                      className={` transition-all duration-500 ${
                        dropDown ? "rotate-0" : "rotate-180"
                      } rotate-180`}
                    />
                  )}{" "}
                </p>
              }
            </NavLink>
            {dropDown &&
              data?.childRoutes &&
              data?.childRoutes.length > 0 &&
              data?.childRoutes.map((item) => (
                <NavLink
                  key={item.route}
                  to={item.route}
                  onClick={setShowMenu}
                  className={({ isActive }) =>
                    `flex items-center px-2 py-2 h-fit space-x-2 mx-3 rounded-lg transition duration-200 ${
                      isActive ? "bg-[#3533cc]" : ""
                    }`
                  }
                >
                  <item.icon className="text-white w-5 h-5" />
                  {
                    <p
                      className={`text-sm font-semibold text-white ${
                        showSidebar ? "" : "block lg:hidden"
                      }`}
                    >
                      {item.title}
                    </p>
                  }
                </NavLink>
              ))}
          </React.Fragment>
        ))}
      </nav>
      <hr className="border-gray-100 mx-8" />
      <div
        className={`h-full p-2 flex justify-start items-end  ${
          showSidebar ? "" : "block lg:hidden"
        }`}
      >
        <div className="relative p-5 flex">
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
           bg-[#3533cc] rounded-lg justify-center"
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
