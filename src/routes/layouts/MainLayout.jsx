import Footer from '@/components/Footer/Footer'
import { Header } from '@/constants/Components lazy loading/components.Lazy'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-4 w-full flex flex-col justify-between h-screen border-r bg-[#015289]  transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
    <Header/>
    </aside>
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default MainLayout