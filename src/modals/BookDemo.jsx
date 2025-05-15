import { IoClose } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const BookDemo = ({ closeModal, isOpen }) => {
//   if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
      <div className="bg-[#2e2f31] w-full sm:w-10/12 md:w-2/3 lg:w-1/3 p-6 rounded-2xl relative text-white">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700"
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Book a Demo</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-[#1c1c1e] border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full bg-[#1c1c1e] border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-[#1c1c1e] border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            placeholder="Preferred Date"
            className="w-full bg-[#1c1c1e] border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full bg-[#1c1c1e] border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-tr from-[#383b40] text-xl rounded-lg relative h-16 w-40 overflow-hidden text-gray-300 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 hover:text-white hover:before:h-64 hover:before:-translate-y-32"
            >
              <span className="relative z-10">Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookDemo;
