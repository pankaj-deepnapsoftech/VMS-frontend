import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { products } from "@/constants/static.data";
import { useAuthContext } from "@/context";

// eslint-disable-next-line react/prop-types
function Header({ setShowMenu, showSidebar }) {
  const { Logout } = useAuthContext();

  const [openMainDropdown, setOpenMainDropdown] = useState("");
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
    <div className="flex flex-col text-white h-full hide-scrollbar bg-[#1f2937] overflow-y-auto transition-all duration-500 ease-in-out relative">
      <hr className="border-gray-100 mx-10" />

      <nav className="flex-1 mx-2 py-5 space-y-1 hide-scrollbar overflow-scroll pb-72">
        {products.map((item, index) => (
          <div key={index} className="py-1">
            {/* Main Section Title */}
            <div
              onClick={() => toggleMainDropdown(item.title)}
              className="flex items-start gap-2 w-full px-3 py-2 rounded-lg hover:bg-[#3533cc] transition"
              title={item.ShownTitle}
            >
              <item.icon className="text-white w-5 h-5 mt-1" />
              <span className="text-sm font-semibold text-white mt-1">
                {item.title}
              </span>
              <IoIosArrowDown
                className={`ml-auto mt-1 transition-transform duration-300 ${
                  openMainDropdown === item.title ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>

            {/* Main dropdown content */}
            {openMainDropdown === item.title &&
              item?.allowedPath?.map((data, ind) => {
                const isSubOpen = openSubDropdown[data.route];
                const hasChildren = data?.childRoutes?.length > 0;

                return (
                  <div key={ind}>
                    <NavLink
                      to={hasChildren ? "#" : data.route}
                      onClick={() =>
                        hasChildren
                          ? toggleSubDropdown(data.route)
                          : setShowMenu()
                      }
                      className={({ isActive }) =>
                        `flex items-start gap-2 w-full px-4 py-2 rounded-lg cursor-pointer transition duration-200 ${
                          isActive && !hasChildren ? "bg-[#3533cc]" : ""
                        } hover:bg-[#3533cc]`
                      }
                    >
                      <data.icon className="text-white w-5 h-5 mt-1" />
                      <span className="text-sm font-semibold text-white mt-1">
                        {data.title}
                      </span>
                      {hasChildren && (
                        <IoIosArrowDown
                          className={`ml-auto mt-1 transition-transform duration-300 ${
                            isSubOpen ? "rotate-0" : "-rotate-90"
                          }`}
                        />
                      )}
                    </NavLink>

                    {/* Child Routes */}
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
      <hr className="border-gray-100 mx-8" />
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
