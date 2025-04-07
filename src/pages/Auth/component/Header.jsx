import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, User, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
    <nav className="bg-gradient-to-r from-[#0D1421] to-[#0D3A78] text-white py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex gap-14 ">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Scalable Image"
              style={{ width: "60px", height: "auto" }}
            />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Secure&
            </span>
          </Link>


          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center ">
            {/* Platform dropdown */}
            {/* <div className="relative group">
                            <button className="flex items-center space-x-1 font-medium" onClick={toggleDropdown}>
                                <span>PLATFORM</span>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${activeDropdown === "platform" ? "rotate-180" : ""}`}
                                />
                            </button>
                            {activeDropdown === "platform" && (
                                <div className="absolute left-0 mt-2 w-48 bg-[#121225] rounded-md shadow-lg py-2 z-10">
                                    <Link to="/platform/feature-1" className="block px-4 py-2 hover:bg-[#1e1e3a]">
                                        Feature 1
                                    </Link>
                                    <Link to="/platform/feature-2" className="block px-4 py-2 hover:bg-[#1e1e3a]">
                                        Feature 2
                                    </Link>
                                    <Link to="/platform/feature-3" className="block px-4 py-2 hover:bg-[#1e1e3a]">
                                        Feature 3
                                    </Link>
                                </div>
                            )}
                        </div> */}

            {/* Solutions dropdown */}
            {/* <div className="relative group">
                            <button className="flex items-center space-x-1 font-medium" onClick={() => toggleDropdown("solutions")}>
                                <span>SOLUTIONS</span>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${activeDropdown === "solutions" ? "rotate-180" : ""}`}
                                />
                            </button>
                            {activeDropdown === "solutions" && (
                                <div className="absolute left-0 mt-2 w-48 bg-[#121225] rounded-md shadow-lg py-2 z-10">
                                    <Link to="/solutions/solution-1" className="block px-4 py-2 hover:bg-[#1e1e3a]">
                                        Solution 1
                                    </Link>
                                    <Link to="/solutions/solution-2" className="block px-4 py-2 hover:bg-[#1e1e3a]">
                                        Solution 2
                                    </Link>
                                    <Link to="/solutions/solution-3" className="block px-4 py-2 hover:bg-[#1e1e3a]">
                                        Solution 3
                                    </Link>
                                </div>
                            )}
                        </div> */}

            {/* Regular links */}
            <Link to="/pricing" className="font-medium">
              PRICING
            </Link>
          </div>

          {/* Company dropdown */}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className=" z-10" size={24} /> : <Menu size={24} />}
        </button>

        {/* Right side items */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Language selector */}
          <div className="relative">
            {activeDropdown === "language" && (
              <div className="absolute right-0 mt-2 w-24 bg-[#121225] rounded-md shadow-lg py-2 z-10">
                <button className="block w-full text-left px-4 py-2 hover:bg-[#1e1e3a]">
                  ENG
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-[#1e1e3a]">
                  ESP
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-[#1e1e3a]">
                  FRA
                </button>
              </div>
            )}
          </div>

          {/* User icon */}
          <button className="text-white">
            <User size={20} />
          </button>

          {/* CTA Button */}
          <Link
            to="/sign-in"
            className="bg-white text-[#0a0a1a] px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            TRY SECURE&
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#0a0a1a] z-50 pt-20 px-6 overflow-y-auto">
          <div className="flex flex-col space-y-6">
            {/* Platform dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full py-2 border-b border-gray-700"
                onClick={() => toggleDropdown("platform-mobile")}
              >
                <span className="font-medium">PLATFORM</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${activeDropdown === "platform-mobile" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {activeDropdown === "platform-mobile" && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link
                    to="/platform/feature-1"
                    className="block py-2"
                    onClick={closeMenu}
                  >
                    Feature 1
                  </Link>
                  <Link
                    to="/platform/feature-2"
                    className="block py-2"
                    onClick={closeMenu}
                  >
                    Feature 2
                  </Link>
                  <Link
                    to="/platform/feature-3"
                    className="block py-2"
                    onClick={closeMenu}
                  >
                    Feature 3
                  </Link>
                </div>
              )}
            </div>

            {/* Solutions dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full py-2 border-b border-gray-700"
                onClick={() => toggleDropdown("solutions-mobile")}
              >
                <span className="font-medium">SOLUTIONS</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${activeDropdown === "solutions-mobile" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {activeDropdown === "solutions-mobile" && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link
                    to="/solutions/solution-1"
                    className="block py-2"
                    onClick={closeMenu}
                  >
                    Solution 1
                  </Link>
                  <Link
                    to="/solutions/solution-2"
                    className="block py-2"
                    onClick={closeMenu}
                  >
                    Solution 2
                  </Link>
                  <Link
                    to="/solutions/solution-3"
                    className="block py-2"
                    onClick={closeMenu}
                  >
                    Solution 3
                  </Link>
                </div>
              )}
            </div>

            {/* Regular links */}
            <Link
              to="/pricing"
              className="py-2 border-b border-gray-700 font-medium"
              onClick={closeMenu}
            >
              PRICING
            </Link>
            <Link
              to="/ethical-hackers"
              className="py-2 border-b border-gray-700 font-medium"
              onClick={closeMenu}
            >
              ETHICAL HACKERS
            </Link>

            {/* Company dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full py-2 border-b border-gray-700"
                onClick={() => toggleDropdown("company-mobile")}
              >
                <span className="font-medium">COMPANY</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${activeDropdown === "company-mobile" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {activeDropdown === "company-mobile" && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link
                    to="/company/about"
                    className="block py-2"
                    onClick={closeMenu}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/company/team"
                    className="block py-2"
                    onClick={closeMenu}
                  >
                    Our Team
                  </Link>
                  <Link
                    to="/company/careers"
                    className="block py-2"
                    onClick={closeMenu}
                  >
                    Careers
                  </Link>
                </div>
              )}
            </div>

            {/* Language selector */}

            {/* CTA Button */}
            <Link
              to="/sign-in"
              className="bg-white text-[#0a0a1a] px-6 py-3 rounded-md font-medium text-center hover:bg-gray-100 transition-colors"
              onClick={closeMenu}
            >
              TRY SECURE&
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
