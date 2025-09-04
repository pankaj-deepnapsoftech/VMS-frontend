import { useAuthContext } from "@/context";
import { useState, useEffect, useRef } from "react";
import { FiDatabase, FiSettings } from "react-icons/fi";
import { products } from "@/constants/static.data";
import "./animation.css";
import { GrShieldSecurity } from "react-icons/gr";

// Card component with gradient border
// eslint-disable-next-line react/prop-types
const Card = ({ children, HandleClick, borderColor, bg, animate }) => {
  return (
    <div
      onClick={HandleClick}
      className={`rounded-xl w-full h-[200px] transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer  ${bg ? "bg-gradient-to-r " + bg : ""
        } ${animate}`}
      style={{
        border: `2px solid ${borderColor}`,
      }}
    >
      <div className="h-full w-full rounded-xl p-6 flex flex-col ">
        {children}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { authenticate, Logout, setGetDataFromSession } = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  console.log(authenticate)

  const HandleClick = (item) => {
    if (
      item !== "Attack Surface Management (ASM)" &&
      item !== "Risk and Compliances"
    ) {
      if (authenticate?.role) {
        const data = products
          .filter((value) => value.title === item)[0]
          .allowedPath.filter((pathItem) =>
            authenticate?.allowed_path.some(
              (authItem) => authItem.value === pathItem.route
            )
          );
        if (data?.length) {
          sessionStorage.setItem("VROC", item);
          setGetDataFromSession(item);
        } else {
          alert("You Dont Have An access This Module");
        }
      } else {
        const data = products.filter((value) => value.title === item)[0]
          .allowedPath.length;
        if (data === 0) {
          alert(`${item} is comming soon`);
        } else {
          sessionStorage.setItem("VROC", item);
          setGetDataFromSession(item);
        }
      }
    }

    if (item === "Attack Surface Management (ASM)") {
      const result = products.filter(
        (item) =>
          item.title.includes("AI-VA") ||
          item.title.includes("Vulnerability Intelligence") ||
          item.title.includes("Attack Surface Management (ASM)")
      );
      setFilteredProducts(result);
      setShowModal((prev) => !prev);
      return;
    }

    if (item === "Risk and Compliances") {
      const result = products.filter(
        (item) =>
          item.title.includes("Risk and Compliances") ||
          item.title.includes("GRC") ||
          item.title.includes("TPRM")
      );
      setFilteredProducts(result);
      setShowModal((prev) => !prev);
      return;
    }
  };



  const ActiveCards = () => {
   const alllowed =  products
      .filter(
        (item) =>
          !(
            item.title.includes("AI-VA") ||
            item.title.includes("Vulnerability Intelligence") ||
            item.title.includes("GRC") ||
            item.title.includes("TPRM") ||
            item.title.includes("ROC")

          )
      )

      if(authenticate?.role){
        return alllowed.filter((item) => item.allowedPath.filter((allow) => authenticate?.allowed_path?.some((check) => check.value === allow.route)).length > 0);
      }else {

        return alllowed
      }


  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-tr from-[#2b2973] via-transparent to-black bg-black text-white">
      <div className="absolute inset-0 z-0 bg-[url('/Svg/background.svg')] bg-no-repeat bg-cover bg-center   " />

      <div className="relative z-10 flex flex-col md:flex-row gap-8 w-full min-h-screen px-4 md:px-8 pt-12 ">
        <div className="absolute top-4 right-6 z-30" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold hover:brightness-110 transition"
              aria-label="User menu"
            >
              {authenticate?.fname?.charAt(0).toUpperCase()}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1c1c1e] border border-gray-800 shadow-lg rounded-md py-2 text-white">
                <button
                  onClick={Logout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-[40%] flex flex-col  gap-10">
          <div className="text-center md:text-left">
            <img
              src="/logo.png"
              alt="Logo"
              className="mx-auto md:mx-0 w-40 md:w-60"
            />
          </div>

          <div className="text-center md:text-left px-2">
            <h2 className="text-4xl md:text-5xl font-bold">
              Hello,{" "}
              <span className="capitalize font-lexendDeca">
                {authenticate?.fname}
              </span>
            </h2>
            <p className="mt-2 text-md md:text-lg text-gray-400">
              Welcome to the Virtual Risk Operation Center
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#403d5783] to-[#242236a2] border border-gray-600 rounded-xl backdrop-blur-md p-10 h-[30%]">
            <div className="flex space-x-1 mb-4">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <div className="w-2 h-2 rounded-full bg-gray-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              Virtual Risk Operations Center (VROC)
            </h1>
            <p className="text-gray-300 text-sm pt-3">
              Welcome to the Virtual Risk Operation Center
            </p>
          </div>
        </div>

        <div className="w-full md:w-[60%] flex flex-col gap-6 pt-10 md:pt-0">
          <div onClick={() => {
            sessionStorage.setItem("VROC", "ROC");
            setGetDataFromSession("ROC");
          }} className="w-full cursor-pointer sm:w-1/2 lg:w-1/3 2xl:w-[23%] aspect-[4/3] rounded-xl bg-gradient-to-r from-[#9b1c4d] to-[#df4156] p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#ffffff3d] flex items-center justify-center">
                <GrShieldSecurity size={24} color="white" />
              </div>
              <div className="pt-4">
                <h2 className="text-white text-lg font-semibold">
                  Risk Operation Center (ROC)
                </h2>
                <p className="text-gray-200 text-sm mt-1">Active Plan.....</p>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {showModal
              ? filteredProducts.map((item, index) => (
                <>
                  <Card
                    key={index}
                    HandleClick={() => HandleClick(item.title)}
                    borderColor={item.borderColor}
                    bg={item.bg}
                    animate="animate-slideInX"
                  >
                    <div className="flex flex-col items-start gap-3">
                      <div className="w-10 h-10 bg-[#ffffff1c] rounded-full flex items-center justify-center text-white text-xl">
                        {typeof item.icon === "string" ? (
                          <img
                            src={item.icon}
                            alt="icon"
                            className="w-5 h-5"
                          />
                        ) : (
                          item.icon
                        )}
                      </div>

                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </Card>
                </>
              ))
              :
                ActiveCards().map((item, index) => (
                <Card
                  key={index}
                  HandleClick={() => HandleClick(item.title)}
                  borderColor={item.borderColor}
                  title={item.title}
                >
                  <div className="flex flex-col items-start  gap-3">
                    <div className="w-10 h-10 bg-[#ffffff1c] rounded-full flex items-center justify-center text-white text-xl">
                      <img src={item.icon} alt="icon" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
