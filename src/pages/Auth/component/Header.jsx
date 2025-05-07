import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Link2, Menu, User, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (dropdown) => {
    console.log("dropdown meny");
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    // <nav className="bg-[#111826] text-white py-4 px-6 md:px-12">
    //   <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
    //     {/* Logo */}
    //     <div className="flex items-center justify-between space-x-2">
    //       <Link to="/" className="flex items-center">
    //         <img
    //           src="/logo.png"
    //           alt="Scalable Image"
    //           style={{ width: "60px", height: "auto" }}
    //         />
    //         <span className="text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-50 text-transparent bg-clip-text">
    //           Secure&
    //         </span>
    //       </Link>

    //         {/* Regular links */}
    //         <div className="relative left-96 hidden md:flex items-center justify-between w-full ">
    //         <div className="flex items-center space-x-8 text-gray-400 font-medium">
    //         {/* <div className="flex gap-10 text-[#a0a1ac] font-semibold" > */}
    //         <Link to="/pricing" className="font-semibold hover:text-[#8defff] transition">
    //         PRICING
    //         </Link>
    //         <Link to="/solutions" className="font-semibold hover:text-[#8defff] transition">
    //         SOLUTIONS
    //         </Link>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Mobile menu button */}
    //     <button
    //       className="md:hidden text-white"
    //       onClick={() => setIsMenuOpen(!isMenuOpen)}
    //     >
    //       {isMenuOpen ? <X className=" z-10" size={24} /> : <Menu size={24} />}
    //     </button>

    //     {/* Right side items */}
    //     <div className="hidden md:flex items-center space-x-6">
    //       {/* Language selector */}
    //       <div className="relative">
    //         {activeDropdown === "language" && (
    //           <div className="absolute right-0 mt-2 w-24 bg-[#121225] rounded-md shadow-lg py-2 z-10">
    //             <button className="block w-full text-left px-4 py-2 hover:bg-[#1e1e3a]">
    //               ENG
    //             </button>
    //             <button className="block w-full text-left px-4 py-2 hover:bg-[#1e1e3a]">
    //               ESP
    //             </button>
    //             <button className="block w-full text-left px-4 py-2 hover:bg-[#1e1e3a]">
    //               FRA
    //             </button>
    //           </div>
    //         )}
    //       </div>

    //       {/* CTA Button */}
    //       <Link
    //         to="/sign-in"
    //         className="bg-white text-[#0a0a1a] px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors "
    //       >
    //         Login Secure&
    //       </Link>
    //     </div>
    //   </div>

    //   {/* Mobile menu */}
    //   {isMenuOpen && (
    //     <div className="md:hidden fixed inset-0 bg-[#0a0a1a] z-50 pt-20 px-6 overflow-y-auto">
    //       <div className="flex flex-col space-y-6">
    //         {/* Platform dropdown */}
    //         <div>
    //           <button
    //             className="flex items-center justify-between w-full py-2 border-b border-gray-700"
    //             onClick={() => toggleDropdown("platform-mobile")}
    //           >
    //             <span className="font-medium">PLATFORM</span>
    //             <ChevronDown
    //               size={16}
    //               className={`transition-transform ${activeDropdown === "platform-mobile" ? "rotate-180" : ""
    //                 }`}
    //             />
    //           </button>
    //           {activeDropdown === "platform-mobile" && (
    //             <div className="mt-2 pl-4 space-y-2">
    //               <Link
    //                 to="/platform/feature-1"
    //                 className="block py-2"
    //                 onClick={closeMenu}
    //               >
    //                 Feature 1
    //               </Link>
    //               <Link
    //                 to="/platform/feature-2"
    //                 className="block py-2"
    //                 onClick={closeMenu}
    //               >
    //                 Feature 2
    //               </Link>
    //               <Link
    //                 to="/platform/feature-3"
    //                 className="block py-2"
    //                 onClick={closeMenu}
    //               >
    //                 Feature 3
    //               </Link>
    //             </div>
    //           )}
    //         </div>

    //         {/* Solutions dropdown */}
    //         <div>
    //           <button
    //             className="flex items-center justify-between w-full py-2 border-b border-gray-700"
    //             onClick={() => toggleDropdown("solutions-mobile")}
    //           >
    //             <span className="font-medium">SOLUTIONS</span>
    //             <ChevronDown
    //               size={16}
    //               className={`transition-transform ${activeDropdown === "solutions-mobile" ? "rotate-180" : ""
    //                 }`}
    //             />
    //           </button>
    //           {activeDropdown === "solutions-mobile" && (
    //             <div className="mt-2 pl-4 space-y-2">
    //               <Link
    //                 to="/solutions/solution-1"
    //                 className="block py-2"
    //                 onClick={closeMenu}
    //               >
    //                 Solution 1
    //               </Link>
    //               <Link
    //                 to="/solutions/solution-2"
    //                 className="block py-2"
    //                 onClick={closeMenu}
    //               >
    //                 Solution 2
    //               </Link>
    //               <Link
    //                 to="/solutions/solution-3"
    //                 className="block py-2"
    //                 onClick={closeMenu}
    //               >
    //                 Solution 3
    //               </Link>
    //             </div>
    //           )}
    //         </div>

    //         {/* Regular links */}
    //         <Link
    //           to="/pricing"
    //           className="py-2 border-b border-gray-700 font-medium"
    //           onClick={closeMenu}
    //         >
    //           PRICING
    //         </Link>
    //         <Link
    //           to="/ethical-hackers"
    //           className="py-2 border-b border-gray-700 font-medium"
    //           onClick={closeMenu}
    //         >
    //           ETHICAL HACKERS
    //         </Link>

    //         {/* Company dropdown */}
    //         <div>
    //           <button
    //             className="flex items-center justify-between w-full py-2 border-b border-gray-700"
    //             onClick={() => toggleDropdown("company-mobile")}
    //           >
    //             <span className="font-medium">COMPANY</span>
    //             <ChevronDown
    //               size={16}
    //               className={`transition-transform ${activeDropdown === "company-mobile" ? "rotate-180" : ""
    //                 }`}
    //             />
    //           </button>
    //           {activeDropdown === "company-mobile" && (
    //             <div className="mt-2 pl-4 space-y-2">
    //               <Link
    //                 to="/company/about"
    //                 className="block py-2"
    //                 onClick={closeMenu}
    //               >
    //                 About Us
    //               </Link>
    //               <Link
    //                 to="/company/team"
    //                 className="block py-2"
    //                 onClick={closeMenu}
    //               >
    //                 Our Team
    //               </Link>
    //               <Link
    //                 to="/company/careers"
    //                 className="block py-2"
    //                 onClick={closeMenu}
    //               >
    //                 Careers
    //               </Link>
    //             </div>
    //           )}
    //         </div>

    //         {/* Language selector */}

    //         {/* CTA Button */}
    //         <Link
    //           to="/sign-in"
    //           className="bg-white text-[#0a0a1a] px-6 py-3 rounded-md font-medium text-center hover:bg-gray-100 transition-colors"
    //           onClick={closeMenu}
    //         >
    //           TRY SECURE&
    //         </Link>
    //       </div>
    //     </div>
    //   )}
    // </nav>
    <>
      <nav
        className={`${
          scrolled ? "bg-[#1e1f22]" : "bg-transparent"
        } text-white py-2 px-6 md:px-12 fixed w-full h-24 top-0 z-50 transition-colors duration-100`}
      >
        <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex gap-2 items-center justify-center">
              <div
                className="w-[100px] h-[100px] bg-gradient-to-t from-gray-100 to-blue-500"
                style={{
                  WebkitMaskImage: "url('/logo.png')",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskImage: "url('/logo.png')",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  maskSize: "contain",
                }}
              ></div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-12 text-gray-400 text-lg">
            <Link
              to="/"
              className="relative hover:text-white after:block after:h-[2px] after:bg-[#0371c0] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              Home
            </Link>
           
            <Link  to="/pricing"  className="relative hover:text-white after:block after:h-[2px] after:bg-[#0371c0] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
              Pricing
            </Link>
            <Link className="relative hover:text-white after:block after:h-[2px] after:bg-[#0371c0] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
              Features
            </Link>
            <Link to="#contact"  className="relative hover:text-white after:block after:h-[2px] after:bg-[#0371c0] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
              Contact
            </Link>
            <Link to="/solutions"  className="relative hover:text-white after:block after:h-[2px] after:bg-[#0371c0] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
              Solutions
            </Link>

            <button
              onClick={() => navigate("/sign-in")}
              className="relative inline-flex h-12 w-20 overflow-hidden rounded-full p-[1px]  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 "
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Login
              </span>
            </button>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className=" z-10" size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
