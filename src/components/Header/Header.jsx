import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { products } from "@/constants/static.data";
import { useAuthContext } from "@/context";
import { useAuthStore } from "@/store/AuthStore";

// eslint-disable-next-line react/prop-types
function Header({ setShowMenu, showSidebar }) {
  const { Logout} = useAuthContext();
  const {authenticate} = useAuthStore();
  const naviagte = useNavigate();
  const location = useLocation();

  const [openMainDropdown, setOpenMainDropdown] = useState("");
  const [openSubDropdown, setOpenSubDropdown] = useState({});

  const [navLinks, setnavLinks] = useState([]);

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

  useEffect(() => {
    if (!authenticate?.role) {
      setnavLinks(products);
    } else if (authenticate?.role) {
      const filter = products
        .map((product) => {
          // Filter allowedPath by matching routes
          const filteredPaths = product.allowedPath
            ?.map((path) => {
              // Check direct route match
              const directAllowed = authenticate?.allowed_path?.some(
                (allow) => allow.value === path.route
              );

              // Check childRoutes if available
              const filteredChildRoutes = path.childRoutes?.filter((child) =>
                authenticate?.allowed_path?.some(
                  (allow) => allow.value === child.route
                )
              );

              // Case 1: path has direct route access
              if (directAllowed) {
                return { ...path, childRoutes: filteredChildRoutes ?? [] };
              }

              // Case 2: path has childRoutes access but no direct route
              if (filteredChildRoutes && filteredChildRoutes.length > 0) {
                return { ...path, childRoutes: filteredChildRoutes };
              }

              // Case 3: no access → skip
              return null;
            })
            .filter(Boolean); // remove nulls

          // Only return product if it has at least one allowedPath
          if (filteredPaths && filteredPaths.length > 0) {
            return { ...product, allowedPath: filteredPaths };
          }
          return null;
        })
        .filter(Boolean); // remove nulls

      setnavLinks(filter);
    }
  }, [authenticate]);

  useEffect(() => {
    if (navLinks?.length > 0) {
      // flatten all routes (including childRoutes)
      const allRoutes = navLinks.flatMap((link) =>
        link.allowedPath.flatMap((path) => [
          path.route,
          ...(path.childRoutes?.map((child) => child.route) || []),
        ])
      );

      // if current path not allowed, redirect to first allowed route
      if (!allRoutes.includes(location.pathname)) {
        naviagte(allRoutes[0]);
      }
    }
  }, [navLinks, location.pathname, naviagte]);

  return (
    <div className="flex flex-col text-white h-full hide-scrollbar bg-[#1f2937] overflow-y-auto transition-all duration-500 ease-in-out relative">
      <hr className="border-gray-100 mx-10" />

      <nav className="flex-1 mx-2 py-5 space-y-1 hide-scrollbar overflow-scroll pb-72">
        {navLinks.map((item, index) => (
          <div
            key={index}
            className={`py-1 ${
              openMainDropdown === item.title &&
              "bg-gray-700 rounded-lg py-2 px-1"
            }`}
          >
            {/* Main Section Title */}
            <button
              onClick={() => toggleMainDropdown(item.title)}
              className="font-extrabold text-sm text-gray-300 pb-1 flex items-center justify-between w-full"
              title={item.ShownTitle}
            >
              <div className="flex gap-2">
                <item.icon className="text-white w-5 h-5" />
                <div className={`${showSidebar ? "" : "block lg:hidden"}`}>
                  {item.title}
                </div>
              </div>
              <IoIosArrowDown
                className={`ml-2 transition-transform duration-300 ${
                  openMainDropdown === item.title ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>

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
                        `flex items-center px-2 py-2 space-x-2 rounded-lg transition duration-200 cursor-pointer ${
                          isActive && !hasChildren ? "bg-[#3533cc]" : ""
                        } ${!hasChildren ? "hover:bg-[#3533cc]" : ""}`
                      }
                    >
                      <data.icon className="text-white w-5 h-5" />
                      <p
                        className={`text-sm font-semibold text-white flex items-center justify-between w-full ${
                          showSidebar ? "" : "block lg:hidden"
                        }`}
                      >
                        {data.title}
                        {hasChildren && (
                          <IoIosArrowDown
                            className={`ml-2 transition-transform duration-300 ${
                              isSubOpen ? "rotate-0" : "-rotate-90"
                            }`}
                          />
                        )}
                      </p>
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
