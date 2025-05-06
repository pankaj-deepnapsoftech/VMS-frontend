import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
<footer className="bg-gradient-to-bl from-[#343537] to-[#1d1f22] text-white py-12 px-4 sm:px-6 md:px-8 lg:px-16">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {/* Logo and Description */}
      <div>
        <div className="mb-6">
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Secure&
            </span>
          </Link>
        </div>
        <p className="text-gray-400 mb-6 max-w-sm">
          Beyond Security: A Strategic Approach to turning protection into progress,
          risk into resilience, and defense into opportunity.
        </p>
       
      </div>

      {/* Know More */}
      <div>
        <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">
          Know More
        </h3>
        <ul className="space-y-3">
          <li>
            <Link
              to="/pricing"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Solutions
            </Link>
          </li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">
          Company
        </h3>
        <ul className="space-y-3">
          <li>
            <Link
              to="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Partner with us
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <a
              href="mailto:enquiry@securend.ai"
              className="text-gray-400 hover:text-white transition-colors break-words"
            >
              enquiry@securend.ai
            </a>
          </li>
          <li>
            <a
              href="mailto:contact@securend.ai"
              className="text-gray-400 hover:text-white transition-colors break-words"
            >
              contact@securend.ai
            </a>
          </li>
        </ul>
      </div>
      <div className="flex space-x-4">
          <Link
            to="#"
            className="shadow-2xl h-12 w-12 text-white text-xl flex justify-center items-center rounded-full bg-gradient-to-r from-black to-gray-100 hover:text-gray-200 transition-colors"
          >
            <i className="fab fa-facebook-f"></i>
            <span className="sr-only">Facebook</span>
          </Link>

          <Link
            to="#"
            className="shadow-2xl h-12 w-12 text-white text-xl flex justify-center items-center rounded-full bg-gradient-to-r from-black to-gray-200 hover:text-gray-200 transition-colors"
          >
            <i className="fab fa-instagram"></i>
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
    

    {/* Footer Bottom */}
    <div className="mt-10 pt-6 border-t border-gray-800 text-sm text-gray-400 text-center">
      <p>
        2025 Secure& - All rights reserved. ©
        <Link to="#" className="text-red-500 hover:text-red-400 ml-1">
          Terms & Conditions
        </Link>
        <span className="mx-1">-</span>
        <Link to="#" className="text-red-500 hover:text-red-400">
          Privacy Policy
        </Link>
      </p>
    </div>
    </div>
  </div>
</footer>

    </>
  );
};

export default Footer;
