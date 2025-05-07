import Footer from "@/components/Footer/Footer";
import { Header } from "@/constants/Components-lazy-loading/components.Lazy";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NotificationSidebar } from "@components/modal/NotificationSideBar";

import {
  useVulnerabililtyDataContext,
} from "@/context";

const MainLayout = () => {
  const { notificationData, NotificationsViewed } =
    useVulnerabililtyDataContext();

  const [width, setWidth] = useState(window.innerWidth);
  const [temp, setTemp] = useState("");
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  let notificationcount =
    notificationData?.filter((notification) => !notification.view).length || 0;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    if (window.innerWidth > 1023) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    const name = location.pathname.split("/");
    setTemp(name[1] ?? "Dashboard");
    console.log(name[1]);
  }, [location.pathname]);
  return (
    <>
      <aside
        className={`${
          showMenu ? "left-0" : "-left-full"
        } fixed z-10 w-[65%] flex flex-col justify-between 
h-screen  bg-gradient-to-t from-[#151515] to-[#212224] 
transition duration-300 sm:w-[40%] md:w-[30%] lg:w-[25%] xl:w-[20%] 2xl:w-[15%] `}
      >
        <Header
          setShowMenu={() =>
            width > 1023 ? setShowMenu(true) : setShowMenu(!showMenu)
          }
        />
      </aside>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="bg-gradient-to-t from-[#1a1c1e] to-[#212325]  border-gray-200">
          <div className="flex items-center justify-between px-2 sm:px-4 py-2">
            <div className="w-full flex items-center justify-between pr-5">
              <button
                className="p-2 hover:bg-gray-100 rounded lg:hidden "
                onClick={() => setShowMenu(!showMenu)}
              >
                <AiOutlineMenu className="w-5 h-5" />
              </button>

              <h1 className="text-base sm:text-xl text-white font-semibold truncate capitalize">
                {location.pathname !== "/"
                  ? temp?.replace("-", " ")
                  : "Dashboard"}
              </h1>
              <div className=" flex items-end justify-end">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="relative flex items-center gap-2 bg-gradient-to-bl from-[#333333] to-[#666666] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  <FaBell className="w-6 h-6" />
                  {notificationcount > 0 ? (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {notificationcount}
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              </div>

              <NotificationSidebar
                notificationsViewed={NotificationsViewed}
                notifications={notificationData}
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
