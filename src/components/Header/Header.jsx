import React from 'react'
import { BiBarChartAlt2,BiSolidDashboard } from 'react-icons/bi';
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { GrVulnerability } from "react-icons/gr";
import { AiOutlineException } from "react-icons/ai";
import { SiWikimediafoundation } from "react-icons/si";
import { Link, NavLink } from 'react-router-dom';
import { list } from '@/constants/constants.data';



function Header() {
  

  return (
    <div className="flex flex-1 bg-[#015289]     ">
    <div className="hidden md:flex md:w-64 md:flex-col   ">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-[#015289] ">
           <Link to="" className="flex items-center justify-start pl-5 space-x-2">
                     <BiBarChartAlt2 className="h-6 w-6 text-white" />
                     <h1 className="text-xl font-semibold  text-white">Eventus</h1>
                   </Link>


            <div className="px-4 mt-6">
                <hr className="border-gray-200" />
            </div>

            <div className="flex flex-col flex-1 px-3 mt-6">
                <div className="space-y-4">
                    <nav className="flex-1 space-y-2">
                        {list.map((data)=>{
                           return <NavLink to={data.route}  className={`flex items-center  px-4 py-2.5 transition-all duration-200 [&.active]:bg-indigo-600  rounded-lg group`}>
                        <data.icon  className='size-6 text-white' />
                        <p className='text-sm font-medium text-white  pl-4'>
                        {data.title}
                        </p>
                            
                        </NavLink>
                        })}
                        
{/* 
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-300 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <MdOutlineMiscellaneousServices className='size-6 text-white ' />
                        <p className='text-sm font-medium text-white pl-4'>
                        Services
                        </p> 
                        </a>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-300 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <GrVulnerability  className='size-6 text-white ' />
                        <p className='text-sm font-medium text-white pl-4'>
                        Vulnerable cls
                        </p> 
                           
                        </a>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-300 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <AiOutlineException className='size-6 text-white ' />
                        <p className='text-sm font-medium text-white pl-4'>
                        Exceptions
                        </p> 
                            
                           
                        </a>
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-300 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <SiWikimediafoundation className='size-6 text-white ' />
                        <p className='text-sm font-medium text-white pl-4'>
                        Remedition
                        </p> 
                            
                        </a> */}
                    </nav>
                </div>
            </div>
        </div>
    </div>

   
</div>

  )
}

export default Header;