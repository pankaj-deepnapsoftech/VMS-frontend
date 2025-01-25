import Footer from '@/components/Footer/Footer'
import { Header } from '@/constants/Components-lazy-loading/components.Lazy'
import React, { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { Outlet, useLocation } from 'react-router-dom'

import { Link } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>

      <aside className={` ${showMenu ? "left-0" : "-left-full"} fixed md:left-0 z-10 top-0 pb-3   w-full flex flex-col justify-between h-screen border-r bg-[#015289] transition duration-300 sm:w-[40%]  md:w-[25%] lg:w-[25%] xl:w-[21%] 2xl:w-[20%]`}>
        <Header setShowMenu={()=>setShowMenu(!showMenu)} />
      </aside>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-2 sm:px-4 py-2">
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded lg:hidden " onClick={()=>setShowMenu(!showMenu)}>
                <AiOutlineMenu className="w-5 h-5" />
              </button>
              <h1 className="text-base sm:text-lg font-semibold truncate capitalize">{location.pathname !== "/" ? location.pathname.replace("/", "") :"Dashboard" }</h1>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default MainLayout