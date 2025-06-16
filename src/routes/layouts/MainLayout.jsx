import Footer from "@/components/Footer/Footer";
import { Header } from "@/constants/Components-lazy-loading/components.Lazy";
import { Suspense, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NotificationSidebar } from "@components/modal/NotificationSideBar";

import { useAuthContext, useVulnerabililtyDataContext } from "@/context";
import UserProfile from "@/pages/UserProfile";
import { getInitials } from "@/utils/profile";
import ChangePasswordModal from "@/modals/ChangePasswordModal";
import useChangePassword from "@/hooks/changePassword";
import FirstDashboard from "@/pages/FirstDashboard";
import Loader from "@/components/Loader/Loader";
import Sidebar from "@/components/sidebar/Sidebar";
import { products } from "@/constants/static.data";
import UpdateProfileModal from "@/modals/UpdateProfile";
import { Link } from "react-router-dom";

const MainLayout = () => {
  const { notificationData, NotificationsViewed } = useVulnerabililtyDataContext();
  const { authenticate, updateProfileModal, getDataFromSession, setOpenSideBar, showUserMenu, setShowUserMenu } = useAuthContext();

  const { isOpen, openModal, closeModal } = useChangePassword();

  const [width, setWidth] = useState(window.innerWidth);
  const [temp, setTemp] = useState("");
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showSidebar, setShowSideBar] = useState(false);
  const navigate = useNavigate();



  let notificationcount = notificationData?.filter((notification) => !notification.view).length || 0;

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
  }, [location.pathname]);


  useEffect(() => {
    if (getDataFromSession) {
      for (let item of products) {
        if (item.title === getDataFromSession) {
          navigate(item.allowedPath[0]?.route);
        }
      }
    }
  }, [getDataFromSession, authenticate])

  const AllowedPath = (link) => {
    const paths = ["asset-inventory", "reports"]
    return paths.find((item) => item === link)
  }

  useEffect(() => {
    if (!authenticate?.mustChangePassword) {
      openModal()
    }
  }, [authenticate.mustChangePassword])

  return (
    !getDataFromSession ? <FirstDashboard /> :
      (
        <Suspense fallback={<Loader />}>

          <Sidebar />
          {!AllowedPath(location.pathname.split("/")[1]) && <aside
            onMouseEnter={() => setShowSideBar(true)}
            onMouseLeave={() => setShowSideBar(false)}
            className={` 
    fixed z-10 flex flex-col justify-between h-full 
    bg-gradient-to-t from-[#151515] to-[#212224] 
    transition-all duration-500 ease-in-out 
    ${showSidebar ? "lg:w-[30%] xl:w-[25%] 2xl:w-[15%]" : "lg:w-[5%] xl:w-[4%] 2xl:w-[3%]"} 
    ${showMenu ? `left-0` : "-left-full"} 
    whitespace-nowrap
  `}
          >


            <Header
              setShowMenu={() =>
                width > 1023 ? setShowMenu(true) : setShowMenu(!showMenu)
              }
              showSidebar={showSidebar}
            />
          </aside>}
         <div
  className={`ml-auto mb-6 transition-all duration-500 ease-in-out 
     bg-gradient-custom rounded-lg 
    ${
      AllowedPath(location.pathname.split("/")[1])
        ? "w-full"
        : showSidebar
        ? "w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%]"
        : "w-full lg:w-[95%] xl:w-[96%] 2xl:w-[97%]"
    }`}
>


            <div className="bg-gradient-to-t from-[#1a1c1e] to-[#212325]  border-gray-200">
              <div className="flex items-center justify-between px-2 sm:px-4 py-2 bg-[#1f2937]">
                <div className="w-full flex items-center justify-between pr-5 ">
                  <button
                    className="p-2 text-white hover:bg-gray-600 rounded lg:hidden "
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <AiOutlineMenu className="w-5 h-5" />
                  </button>

                  {!showSidebar ? <Link className="flex items-center ">
                    <div className="flex gap-2 items-center justify-center  h-7  ">
                      <img
                        src="/logo.png"
                        alt="logo"
                        className="h-5 transition-all duration-300 ease-in-out group-hover:scale-105"
                      />

                    </div>
                  </Link> : <div></div>}
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

                    <div className="relative ml-4 flex text-white items-center gap-3 ">
                      <button
                        onClick={() => { setOpenSideBar(true) }}
                        className="bg-blue-400 text-white rounded-full w-10 h-10 flex items-center justify-center"
                      >
                        {authenticate.fname.split("")[0].toUpperCase()}
                      </button>
                      {authenticate?.role}

                      {/* {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#4f4f4f] rounded-lg shadow-lg z-50">
                      <div className="flex items-center gap-2 px-4 py-3 border-b">
                        <div className="bg-blue-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-200">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-200">
                        <li
                          className="px-4 py-2 hover:bg-gray-500 cursor-pointer flex items-center gap-2"
                          onClick={() => {
                          
                            console.log("Logout");
                          }}
                        >
                          ⤴️ Logout
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-500 cursor-pointer flex items-center gap-2"
                          onClick={() => setShowUserMenu(false)}
                        >
                          ❌ Close
                        </li>
                      </ul>
                    </div>
                  )} */}
                    </div>
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
          <UserProfile showUserMenu={showUserMenu} setShowMenu={setShowUserMenu} />

          {updateProfileModal && <UpdateProfileModal />}

          <ChangePasswordModal isOpen={isOpen} onClose={closeModal} />
        </Suspense>)
  );
};

export default MainLayout;
