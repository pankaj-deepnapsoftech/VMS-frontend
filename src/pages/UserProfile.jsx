/* eslint-disable react/prop-types */
import React from "react";
import { IoIosClose } from "react-icons/io";
import { useAuthContext } from "@/context";

const UserProfile = ({ showUserMenu, setShowMenu }) => {
  const { authenticate } = useAuthContext();

  return (
    <div
      className={`${
        showUserMenu ? "flex" : "hidden"
      } fixed inset-0 z-50 bg-black/50 p-4 items-center justify-center`}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#333333] to-[#666666] p-5 text-white flex items-center justify-between">
          <h1 className="text-xl font-semibold">User Profile</h1>
          <button
            onClick={() => setShowMenu(false)}
            className="text-white hover:text-gray-300"
          >
            <IoIosClose size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 bg-[#2a2c2f] text-gray-800 text-sm sm:text-base">
          <div>
            <p className="text-gray-400 font-bold">User Name:</p>
            <p className=" text-gray-200 font-semibold">{authenticate?.full_name || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 font-bold">Email</p>
            <p className="text-gray-200 font-semibold">{authenticate?.email || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 font-bold">Phone Number</p>
            <p className="text-gray-200 font-semibold">{authenticate?.phone || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 font-bold">Role</p>
            <p className="text-gray-200 font-semibold capitalize">{authenticate?.role || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
