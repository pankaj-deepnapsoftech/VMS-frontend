import React, { useState } from 'react'
import { BiBarChartAlt2, BiSolidDashboard } from 'react-icons/bi';
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { GrVulnerability } from "react-icons/gr";
import { AiOutlineException } from "react-icons/ai";
import { SiWikimediafoundation } from "react-icons/si";
import { Link, NavLink } from 'react-router-dom';
import { list } from '@/constants/constants.data';
import { useAuthContext } from '@/context';



function Header({setShowMenu}) {
    
      const {Logout,loading} = useAuthContext()

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    return (
        <div className="flex flex-1 mt-10  fixed w-full">
            <div className="w-1/2 md:flex md:w-64 md:flex-col ">
                <div className="flex flex-col flex-grow   ">
                    <Link onClick={setShowMenu}  to="" className="flex items-center justify-start pl-5 space-x-2">
                        <BiBarChartAlt2 className="h-6 w-6 text-white" />
                        <h1 className="text-xl font-semibold  text-white">Eventus</h1>
                    </Link>
                    <div className="px-4 mt-6">
                        <hr className="border-gray-200" />
                    </div>
                    <div className="flex flex-col flex-1 px-3 py-5 ">
                        <div className="space-y-4">
                            <nav className="flex-1 space-y-2">
                                {list.map((data) => {
                                    return <NavLink to={data.route} onClick={setShowMenu} className={`flex items-center  px-4 py-2.5 transition-all duration-200 [&.active]:bg-indigo-600  rounded-lg group`}>
                                        <data.icon className='size-6 text-white' />
                                        <p className='text-sm font-medium text-white  pl-4'>
                                            {data.title}
                                        </p>
                                    </NavLink>
                                })}
                            </nav>
                        </div>
                        <div className="px-4 mt-6">
                        <hr className="border-gray-200" />
                    </div>
                        <div className="relative flex justify-start pl-4  mt-14">
                            {/* Dropdown Trigger */}
                            <button
                                id="dropdown-trigger"
                                type="button"
                                className="py-1 ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                aria-haspopup="menu"
                                aria-expanded={isOpen}
                                aria-label="Dropdown"
                                onClick={toggleDropdown}
                            >
                                <img
                                    className="w-8 h-auto rounded-full"
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                    alt="Avatar"
                                />
                                <span className="text-gray-600 font-medium truncate max-w-[7.5rem]">
                                    Maria
                                </span>
                                <svg
                                    className={`transition-transform ${isOpen ? 'rotate-180' : ''
                                        } size-4`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
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

                            {/* Dropdown Menu */}
                            <div
                                className={`absolute right-0 top-9 mt-2 min-w-[10rem] bg-white shadow-md rounded-lg transition-opacity duration-200 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                                    }`}
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="dropdown-trigger"
                            >
                                <div className="p-1 space-y-0.5">
                                   
                                <button
                                        className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    >
                                       Profile
                                    </button>
                                    <button onClick={Logout}
                                        className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                      
                                    >
                                       Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Header;