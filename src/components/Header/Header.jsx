import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { products } from "@/constants/static.data";
import { useAuthContext } from "@/context";

// eslint-disable-next-line react/prop-types
function Header({ setShowMenu, showSidebar }) {
  const { Logout } = useAuthContext();

  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);


  const handleSidebard = (data) => {
    !(data?.childRoutes && data?.childRoutes.length) &&
      setShowMenu();
    setOpenDropdown(
      data?.childRoutes && data?.childRoutes.length && !openDropdown
    );
  }


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
          <div key={index} className="py-4">
            {/* here is show title only */}
            <p className="font-extrabold text-md" title={item.ShownTitle} >{item.title}</p>

            {item?.allowedPath.map((data, ind) => (
              <div key={ind}>
                <NavLink to={data?.route}
                  onClick={() => handleSidebard(data)}
                  className={({ isActive }) =>
                    `flex items-center px-2 py-2 space-x-2 rounded-lg transition duration-200 ${isActive && !(data?.childRoutes && data?.childRoutes.length)
                      ? "bg-[#3533cc]"
                      : ""
                    }`
                  }
                >
                  <data.icon className="text-white w-5 h-5" />
                  {
                    <p
                      className={`text-sm font-semibold text-white flex items-center justify-center gap-2 ${showSidebar ? "" : "block lg:hidden"
                        }`}
                    >
                      {data.title}{" "}
                      {data?.childRoutes && data?.childRoutes.length > 0 && (
                        <IoIosArrowDown
                          className={` transition-all duration-500 ${openDropdown ? "rotate-0" : "rotate-180"
                            } `}
                        />
                      )}{" "}
                    </p>
                  }
                </NavLink>

                {openDropdown &&
                  data?.childRoutes &&
                  data?.childRoutes.length > 0 &&
                  data?.childRoutes.map((item) => (
                    <NavLink
                      key={item.route}
                      to={item.route}
                      onClick={setShowMenu}
                      className={({ isActive }) =>
                        `flex items-center px-2 py-2 h-fit ${showSidebar && "mx-3"} space-x-2  rounded-lg transition duration-200 ${isActive ? "bg-[#3533cc]" : ""
                        }`
                      }
                    >
                      <item.icon className="text-white w-5 h-5" />
                      {
                        <p
                          className={`text-sm font-semibold text-white ${showSidebar ? "" : "block lg:hidden"
                            }`}
                        >
                          {item.title}
                        </p>
                      }
                    </NavLink>))}
                
              </div>
            ))}


          </div>
        ))}
      </nav>
      <hr className="border-gray-100 mx-8 " />
      <div className={`h-20 fixed -bottom-16 p-2 flex w-full  justify-start items-end bg-[#1f2937] ${showSidebar ? "" : "block lg:hidden"}`}>
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
