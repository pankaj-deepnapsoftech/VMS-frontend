import React from 'react'
const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-custom  text-gray-400 w-full z-10">
      <div className="border-t border-gray-600 p-3  text-center">
        <p>&copy; {new Date().getFullYear()} Securend. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;