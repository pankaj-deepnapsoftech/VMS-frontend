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

const MainLayout = () => {
  const { notificationData, NotificationsViewed } = useVulnerabililtyDataContext();
  const { authenticate, updateProfileModal, getDataFromSession, setOpenSideBar, showUserMenu, setShowUserMenu } = useAuthContext();

  const { isOpen, openModal, closeModal } = useChangePassword();

  const [width, setWidth] = useState(window.innerWidth);
  const [temp, setTemp] = useState("");
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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
    console.log(name[1]);
  }, [location.pathname]);


  useEffect(() => {
    if (getDataFromSession) {
      for (let item of products) {
        if (item.title === getDataFromSession ) {
          navigate(item.allowedPath[0]?.route);
        }
      }
    }
  }, [getDataFromSession, authenticate])

  const AllowedPath = (link) => {
    const paths = ["asset-inventory","reports"]
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
            className={`${showMenu ? "left-0" : "-left-full"
              } fixed z-10 w-[65%] flex flex-col justify-between 
h-screen  bg-gradient-to-t from-[#151515] to-[#212224] 
transition duration-300 sm:w-[40%] md:w-[30%] lg:w-[25%] xl:w-[20%] 2xl:w-[15%] `}
          >
            <Header
              setShowMenu={() =>
                width > 1023 ? setShowMenu(true) : setShowMenu(!showMenu)
              }
            />
          </aside>}
          <div className={`ml-auto mb-6  ${!AllowedPath(location.pathname.split("/")[1]) ? "lg:w-[75%] xl:w-[80%] 2xl:w-[85%]" : "w-full"}   h-screen bg-background`}>
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
                      : "Risk Prioritization Hub"}
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

                    <div className="relative ml-4 flex text-white items-center gap-3 ">
                      <button
                        onClick={() => { setOpenSideBar(true) }}
                        className="bg-blue-400 text-white rounded-full w-10 h-10 flex items-center justify-center"
                      >
                        {getInitials(authenticate?.full_name)}
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
