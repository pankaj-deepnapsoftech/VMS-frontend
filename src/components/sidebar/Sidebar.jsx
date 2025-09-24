import { useAuthContext } from "@/context";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { setOpenSideBar, setGetDataFromSession, Logout, OpenSideBar } =
    useAuthContext();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSideBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenSideBar]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 ${
        OpenSideBar ? "right-0" : "-right-[300px]"
      } h-full w-64 z-50 transition-all duration-500 bg-gradient-custom text-white shadow-lg flex flex-col items-start p-6 space-y-4`}
      onClick={() => setOpenSideBar(false)}
    >
      <h2 className="text-lg font-semibold flex w-full items-center justify-between">
        Menu{" "}
        <button>
          <IoClose />
        </button>
      </h2>

      <button
        className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 transition"
        onClick={() => {
          navigate("/user-details");
        }}
      >
        User Details
      </button>
      {/* 
      <button
        className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 transition"
        onClick={() => {
          setGetDataFromSession(null), sessionStorage.clear();
        }}
      >
        Back to Module
      </button> */}
      <button
        className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 transition"
        onClick={() => {
          navigate("/change-password");
        }}
      >
        Change Password
      </button>
      <button
        onClick={Logout}
        className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
