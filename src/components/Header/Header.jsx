import React, { useState } from 'react'
import { BiBarChartAlt2, BiSolidDashboard } from 'react-icons/bi';
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { GrVulnerability } from "react-icons/gr";
import { AiOutlineException } from "react-icons/ai";
import { SiWikimediafoundation } from "react-icons/si";
import { Link, NavLink } from 'react-router-dom';
import { ClientCisoList, ClientSmeList, EmployeeList, list } from '@/constants/constants.data';
import { useAuthContext } from '@/context';
import { FaShieldAlt, FaUser } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import toast from 'react-hot-toast';



function Header({ setShowMenu }) {

  const { Logout, loading, authenticate } = useAuthContext()

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = (id) => {
    if (window.confirm("Are you sure you want to log out?")) {
      Logout()
    }
  };


  let navList = [];

  switch (authenticate?.role) {
    case "ClientCISO":
      navList = ClientCisoList; // Define if ClientCTO has a specific list
      break;
    case "Assessor":
      navList = EmployeeList;
      break;
    case "Admin":
      navList = list;
      break;
    case "ClientSME":
      navList = ClientSmeList; // Define if ClientSME has a specific list
      break;
    default:
      // console.log("Invalid Role: Access Denied");
      toast.error("Invalid Role: Access Denied");
  }


  return (
    // <div className="flex h-screen fixed  overflow-y-auto
    //  md:w-[28%] lg:w-[25%] xl:w-[25%] 2xl:w-[20%] ">
      <div className=" flex flex-col text-white pt-8 h-[100%] hide-scrollbar  overflow-y-auto ">
        < Link

          onClick={setShowMenu}
          to=""
          className="flex items-center p-5 space-x-2 "
        >
          <div className="flex items-center justify-center mb-4">
                          <FaShieldAlt className="h-6 w-6 text-blue-600" />
                          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 tracking-tight ml-2">
                            SECURE&
                          </h1>
                        </div>
        </Link >
        <hr className="border-gray-100 mx-8" />

        <nav className="flex-1 mx-2 py-5 space-y-1">
          {navList?.map((data) => (
            <NavLink
              key={data.route}
              to={data.route}
              onClick={setShowMenu}
              className="flex items-center px-2 py-2 space-x-2 rounded-lg   [&.active]:bg-gradient-to-tl from-[#3f3b3b] to-[#2b2828]  transition duration-200"

            >
              <data.icon className="text-white w-5 h-5" />
              <p className="text-sm font-semibold text-white">{data.title}</p>
            </NavLink>
          ))}
        </nav>
        <hr className="border-gray-100 mx-8" />
        <div className=" h-full p-2 flex  justify-start items-end ">
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
              <p className='text-base text-white p-2 font-medium'>
                Log Out
              </p>

              <IoIosLogOut className='w-6 h-6 text-white ' />
            </button>
          </div>
        </div>

      </div >
    // </div >
  )
}

export default Header;