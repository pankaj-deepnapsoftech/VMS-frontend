import React, { useState } from 'react'
import { BiBarChartAlt2, BiSolidDashboard } from 'react-icons/bi';
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { GrVulnerability } from "react-icons/gr";
import { AiOutlineException } from "react-icons/ai";
import { SiWikimediafoundation } from "react-icons/si";
import { Link, NavLink } from 'react-router-dom';
import { list } from '@/constants/constants.data';
import { useAuthContext } from '@/context';
import { FaUser } from 'react-icons/fa';



function Header({setShowMenu}) {
    
      const {Logout,loading} = useAuthContext()

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    return (
        <div className="flex fixed  md:w-[2%] lg:w-[25%] xl:w-[25%] 2xl:w-[20%]  ">
        <div className=" flex flex-col text-white pt-8 ">
          <Link
            onClick={setShowMenu}
            to=""
            className="flex items-center p-5 space-x-2 "
          >
            <BiBarChartAlt2 className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Eventus</h1>
          </Link>
          <hr className="border-gray-100 mx-8" />
  
          <nav className="flex-1 p-5 space-y-2">
            {list.map((data) => (
              <NavLink
                key={data.route}
                to={data.route}
                onClick={setShowMenu}
                className="flex items-center px-4 py-2 space-x-4 rounded-lg   [&.active]:bg-indigo-600 transition duration-200"
                
              >
                <data.icon className="text-white w-5 h-5" />
                <p className="text-sm font-medium">{data.title}</p>
              </NavLink>
            ))}
          </nav>
          <hr className="border-gray-100 mx-8" />
  
          <div className="relative p-5">
            <button
              id="dropdown-trigger"
              type="button"
              className="flex items-center gap-x-2 w-full px-3 py-2  rounded-2xl bg-indigo-600 text-gray-800 shadow-sm hover:bg-gray-500 "
              onClick={toggleDropdown}
              aria-haspopup="menu"
              aria-expanded={isOpen}
            >
               <FaUser className="text-black w-8 h-8 rounded-2xl bg-white p-2" />
              <span className="truncate max-w-[7.5rem] text-sm font-medium text-white">
                User
              </span>
              <svg
                className={`transition-transform ${
                  isOpen ? "rotate-180" : ""
                } w-4 h-4 text-white`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
  
            {isOpen && (
              <div
                className="absolute top-100 left-6 mt-1 w-5/6 bg-white shadow-lg rounded-lg"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="dropdown-trigger"
              >
                <button
                  className="flex w-full items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg"
                >
                  Profile
                </button>
                <button
                  onClick={Logout}
                  className="flex w-full items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
}

export default Header;