import React from 'react'
const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#015289] text-white w-full z-10">
      <div className=" border-t border-gray-700 p-3  text-center">
        <p>&copy; {new Date().getFullYear()} Secure& . All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;