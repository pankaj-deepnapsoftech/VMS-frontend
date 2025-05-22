import { useAuthContext } from '@/context';
import React from 'react'
import { IoClose } from "react-icons/io5";

const Sidebar = () => {

    const {setOpenSideBar,showUserMenu,setShowUserMenu,setGetDataFromSession} = useAuthContext()

    return (
        <div className="fixed top-0 right-0 h-screen w-64 z-50 bg-gray-900 text-white shadow-lg flex flex-col items-start p-6 space-y-4" onClick={()=>setOpenSideBar(false)}>
            <h2 className="text-lg font-semibold flex w-full items-center justify-between">Menu <button><IoClose/></button></h2>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 transition" onClick={()=>setShowUserMenu(!showUserMenu)}>
                View Profile
            </button>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 transition" onClick={()=>{setGetDataFromSession(null),sessionStorage.clear()}}>
                Back to Module
            </button>
            {/* <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 transition">
                Logout
            </button> */}
        </div>

    )
}

export default Sidebar