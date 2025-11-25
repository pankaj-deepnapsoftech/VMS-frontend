import Footer from "@/components/Footer/Footer";
import { Header } from "@/constants/Components-lazy-loading/components.Lazy";
import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { NotificationSidebar } from "@components/modal/NotificationSideBar";

import {
  useAuthContext,
  useDataContext,
  useVulnerabililtyDataContext,
  useExceptionContext,
} from "@/context";
import UserProfile from "@/pages/UserProfile";
import useChangePassword from "@/hooks/changePassword";
import Sidebar from "@/components/sidebar/Sidebar";
import { products } from "@/constants/static.data";
import UpdateProfileModal from "@/modals/UpdateProfile";
import { Link } from "react-router-dom";
import { MdOutlineNotificationsActive } from "react-icons/md";
import Select from "react-select";
import { customStyles, darkTheme } from "@/constants/constants.data";
import ChangePasswordModal from "@/modals/ChangePasswordModal";
import SecurityQuestions from "@/pages/Auth/Secuirity";
import { ReasonModal } from "@/components/modal/Reason";
import { useAuthStore } from "@/store/AuthStore";

const MainLayout = () => {
  const { notificationData, NotificationsViewed } =
    useVulnerabililtyDataContext();

    const {authenticate,selectedYears,setSelectedYear,setTenant,tenant} = useAuthStore((state) => state);

  const {
    updateProfileModal,
    getDataFromSession,
    setOpenSideBar,
    showUserMenu,
    setShowUserMenu,
  } = useAuthContext();
  const { TenantAllData } = useDataContext();

  const { openModal, isOpen, closeModal } = useChangePassword();
  const { UpdateExpectionData } = useExceptionContext();

  const currentYear = new Date().getFullYear();

  const [width, setWidth] = useState(window.innerWidth);
  const [temp, setTemp] = useState("");
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showSidebar, setShowSideBar] = useState(false);
  const [rejectionReasion, setRejectionReasion] = useState(false);

  const navigate = useNavigate();

  const [tenantId, setTenantId] = useState("");
  const [searchParams] = useSearchParams();

  const [editableNotification, setNotificationData] = useState(null);

  const HandleRejection = (description) => {
    const keys = Object.keys(editableNotification.data);
    UpdateExpectionData(editableNotification.id, {
      [keys[0]]: { ...editableNotification.data[keys[0]], description },
    });
    NotificationsViewed(editableNotification.nid);
  };

  const viewOnlyAllowed = (path) => {
    const alloweds = [
      "/",
      "/infrastructure-dashboard",
      "/application-dashboard",
      "/tvm-dashboard",
    ];
    return alloweds.includes(path);
  };

  let notificationcount =
    notificationData?.filter((notification) => !notification.view).length || 0;

  const handleSelect = ({ value, label }) => {
    setTenantId(value);
    setTenant({ label, value });
  };

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
    const params = new URLSearchParams(searchParams);
    params.set("tenant", tenantId);
    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );
  }, [location.pathname, tenantId]);

  useEffect(() => {
    if (getDataFromSession) {
      const filterData = products.filter(
        (item) => item.title === getDataFromSession
      )[0];

      if (filterData?.allowedPath?.length === 0) {
        alert(`${getDataFromSession} is comming soon`);
        return;
      }

      if (!authenticate?.role && filterData?.allowedPath?.length > 0) {
        const windowCurrectRoute = filterData.allowedPath.filter(
          (pathItem) => window.location.pathname === pathItem.route
        );

        if (
          windowCurrectRoute.length === 0 ||
          window.location.pathname === "/"
        ) {
          navigate(filterData.allowedPath[0]?.route);
        }

        return;
      }

      if (authenticate.role && filterData?.allowedPath?.length > 0) {
        const navList = filterData.allowedPath.filter((pathItem) =>
          authenticate?.allowed_path.some(
            (authItem) => authItem.value === pathItem.route
          )
        );
        if (
          navList.length > 0 &&
          (window.location.pathname === "/" ||
            window.location.pathname !== navList[0]?.route)
        ) {
          const windowCurrectRoute = navList.filter(
            (pathItem) => window.location.pathname === pathItem.route
          );

          if (
            windowCurrectRoute.length === 0 ||
            window.location.pathname === "/"
          ) {
            navigate(navList[0]?.route);
          }
          return;
        }
      }
    }
  }, [getDataFromSession, authenticate]);

  const AllowedPath = (link) => {
    const paths = [];
    return paths.find((item) => item === link);
  };

  useEffect(() => {
    if (!authenticate?.mustChangePassword) {
      openModal();
    }
  }, [authenticate.mustChangePassword]);

  const sidebarRef = useRef(null);

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowMenu(false); // close the sidebar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 

  if (authenticate?.security_questions <= 0) {
    return <SecurityQuestions />;
  }

  return (
    <>
      <Sidebar />

      {/* header */}
      <header className="bg-gradient-to-t from-[#1a1c1e] to-[#212325]  border-gray-200 w-full sticky top-0 z-50">
        <div className="  px-2 sm:px-4 py-2 bg-[#1f2937]">
          <div className="w-full flex items-center justify-between">
            <button
              className="p-2 text-white hover:bg-gray-600 rounded lg:hidden "
              onClick={() => setShowMenu(!showMenu)}
            >
              <AiOutlineMenu className="w-5 h-5" />
            </button>

            <div className="flex gap-0 w-full">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Link className="flex items-center">
                    <img
                      src="/Logo5.png"
                      alt="logo"
                      className="h-9 w-auto object-contain filter brightness-[1.5]"
                    />
                  </Link>

                  <p className="text-white text-2xl font-bold leading-none">
                    SecureEnd.ai
                  </p>
                </div>
              </div>

              <div className="hidden md:block">
                {!authenticate?.role && (
                  <Select
                    className="custom-scrollbar w-[250px] absolute left-4 basic-single"
                    classNamePrefix="select"
                    defaultValue={tenant}
                    onChange={handleSelect}
                    value={tenant}
                    isSearchable={true}
                    options={TenantAllData}
                    theme={darkTheme}
                    styles={customStyles}
                  />
                )}
              </div>
            </div>

            <div className=" flex items-end justify-end">
              {viewOnlyAllowed(window.location.pathname) && (
                <select
                  className="bg-[#0E1430] text-gray-300 text-sm px-2 sm:px-3 py-1 rounded-lg border border-gray-700 focus:outline-none"
                  value={selectedYears}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  <option value={currentYear}>{currentYear} </option>
                  <option value={currentYear - 1}>{currentYear - 1}</option>
                  <option value={currentYear - 2}>{currentYear - 2}</option>
                </select>
              )}

              <button
                onClick={() => setSidebarOpen(true)}
                className="relative flex items-center gap-2  text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <MdOutlineNotificationsActive className="size-7" />
                {notificationcount > 0 ? (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {notificationcount}
                  </span>
                ) : (
                  ""
                )}
              </button>

              <div className="relative ml-4 flex text-white items-center gap-1 md:gap-3">
                <button
                  onClick={() => {
                    setOpenSideBar(true);
                  }}
                  className="bg-blue-400 text-white rounded-full w-10 h-10 flex items-center justify-center border-2 "
                >
                  {authenticate.fname[0].toUpperCase()}
                </button>
              </div>
            </div>

            <NotificationSidebar
              notificationsViewed={NotificationsViewed}
              notifications={notificationData}
              isOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
              setRejectionReasion={setRejectionReasion}
              setNotificationData={setNotificationData}
            />
          </div>

          <ReasonModal
            isOpen={rejectionReasion}
            onClose={() => setRejectionReasion(false)}
            onSubmit={HandleRejection}
          />

          <div className="md:hidden">
            {!authenticate?.role && (
              <Select
                className="custom-scrollbar w-[90%] mx-auto my-5 basic-single"
                classNamePrefix="select"
                defaultValue={tenant}
                onChange={handleSelect}
                isSearchable={true}
                options={TenantAllData}
                theme={darkTheme}
                styles={customStyles}
              />
            )}
          </div>
        </div>
      </header>

      {/* sidebar */}
      {
        <aside
          onMouseEnter={() => setShowSideBar(true)}
          onMouseLeave={() => setShowSideBar(false)}
          ref={sidebarRef}
          className={`fixed top:24 md:top-14 z-10 flex flex-col justify-between h-full bg-gradient-to-t from-[#151515] to-[#212224] transition-all duration-500 ease-in-out 
    ${
      showSidebar
        ? "lg:w-[25%] xl:w-[20%] 2xl:w-[15%]"
        : "lg:w-[5%] xl:w-[4%] 2xl:w-[3%]"
    } 
    ${showMenu ? `left-0 ` : "-left-full lg:left-0"}
    whitespace-nowrap
  `}
        >
          <Header
            setShowMenu={() =>
              width > 1023 ? setShowMenu(true) : setShowMenu(false)
            }
            showSidebar={showSidebar}
          />
        </aside>
      }
      <div
        className={`ml-auto transition-all min-h-screen duration-500 ease-in-out 
     bg-gradient-custom bg-black 
    ${
      AllowedPath(location.pathname.split("/")[1])
        ? "w-full"
        : showSidebar
        ? "w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%]"
        : "w-full lg:w-[95%] xl:w-[96%] 2xl:w-[97%]"
    }`}
      >
        <Outlet />
      </div>

      <Footer />
      <UserProfile showUserMenu={showUserMenu} setShowMenu={setShowUserMenu} />

      {updateProfileModal && <UpdateProfileModal />}

      <ChangePasswordModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default MainLayout;
