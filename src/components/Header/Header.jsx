import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { products } from "@/constants/static.data";
import { useAuthContext } from "@/context";

// eslint-disable-next-line react/prop-types
function Header({ setShowMenu, showSidebar }) {
  const { Logout } = useAuthContext();

  // track open main dropdown
  const [openMainDropdown, setOpenMainDropdown] = useState("");
  // track open sub dropdowns
  const [openSubDropdown, setOpenSubDropdown] = useState({});

  const toggleMainDropdown = (title) => {
    setOpenMainDropdown((prev) => (prev === title ? "" : title));
  };

  const toggleSubDropdown = (route) => {
    setOpenSubDropdown((prev) => ({
      ...prev,
      [route]: !prev[route],
    }));
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      Logout();
    }
  };

  return (
    <div className="flex flex-col text-white h-[100%] hide-scrollbar bg-[#1f2937] overflow-y-auto transition-all duration-500 ease-in-out relative">
      <hr className="border-gray-100 mx-10" />

      <nav className="flex-1 mx-2 py-5 space-y-1 hide-scrollbar overflow-scroll pb-72">
        {products.map((item, index) => (
          <div key={index} className="py-1">
            {/* Section Title */}
            <button
              onClick={() => toggleMainDropdown(item.title)}
              className="font-extrabold text-sm text-gray-300 pb-1 flex items-center justify-between w-full"
              title={item.ShownTitle}
            >
              {item.title}
              <IoIosArrowDown
                className={`ml-2 transition-transform duration-300 ${
                  openMainDropdown === item.title ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>

            {/* Main dropdown content */}
            {openMainDropdown === item.title &&
              item?.allowedPath.map((data, ind) => {
                const isSubOpen = openSubDropdown[data.route];

                return (
                  <div key={ind}>
                    <div
                      onClick={() =>
                        data?.childRoutes?.length
                          ? toggleSubDropdown(data.route)
                          : setShowMenu()
                      }
                      className={`flex items-center px-2 py-2 space-x-2 rounded-lg transition duration-200 cursor-pointer ${
                        !data?.childRoutes?.length
                          ? "hover:bg-[#3533cc]"
                          : ""
                      }`}
                    >
                      <data.icon className="text-white w-5 h-5" />
                      <p
                        className={`text-sm font-semibold text-white flex items-center justify-between w-full ${
                          showSidebar ? "" : "block lg:hidden"
                        }`}
                      >
                        {data.title}
                        {data?.childRoutes?.length > 0 && (
                          <IoIosArrowDown
                            className={`ml-2 transition-transform duration-300 ${
                              isSubOpen ? "rotate-0" : "-rotate-90"
                            }`}
                          />
                        )}
                      </p>
                    </div>

                    {/* Sub dropdown */}
                    {isSubOpen &&
                      data?.childRoutes?.map((child) => (
                        <NavLink
                          key={child.route}
                          to={child.route}
                          onClick={setShowMenu}
                          className={({ isActive }) =>
                            `flex items-center px-2 py-2 h-fit ${
                              showSidebar && "ml-8"
                            } space-x-2 rounded-lg transition duration-200 ${
                              isActive ? "bg-[#3533cc]" : ""
                            }`
                          }
                        >
                          <child.icon className="text-white w-5 h-5" />
                          <p
                            className={`text-sm font-semibold text-white ${
                              showSidebar ? "" : "block lg:hidden"
                            }`}
                          >
                            {child.title}
                          </p>
                        </NavLink>
                      ))}
                  </div>
                );
              })}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <hr className="border-gray-100 mx-8 " />
      <div
        className={`h-20 fixed -bottom-16 p-2 flex w-full justify-start items-end bg-[#1f2937] ${
          showSidebar ? "" : "block lg:hidden"
        }`}
      >
        <div className="p-5 flex bg-[#1f2937]">
          <button
            onClick={handleLogout}
            className="flex w-full px-10 mb-52 md:mb-24 items-center text-indigo-600 hover:scale-95 transition bg-[#3533cc] rounded-lg justify-center"
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
