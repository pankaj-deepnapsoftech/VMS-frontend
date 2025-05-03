import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "/public/Font/LexendDeca.ttf";
import { FaApple, FaCommentDots, FaCube, FaMousePointer } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FaMessage } from "react-icons/fa6";
import { Pagination, Autoplay } from "swiper/modules";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaArrowPointer } from "react-icons/fa6";
import { GiPerspectiveDiceSixFacesFour } from "react-icons/gi";

const plans = [
  {
    name: "Basic",
    price: "$14",
    features: [
      "32 GB Cloud Storage",
      "eCommerce Integration",
      { label: "Regular Updates", available: false },
      { label: "24/7 Support", available: false },
      { label: "Regular Updates", available: false },
    ],
    highlightColor: "bg-cyan-400",
  },
  {
    name: "Standard",
    price: "$30",
    popular: true,
    features: [
      "32 GB Cloud Storage",
      "eCommerce Integration",
      "Regular Updates",
      "24/7 Support",
      { label: "Regular Updates", available: false },
    ],
    highlightColor: "bg-orange-400",
  },
  {
    name: "Premium",
    price: "$50",
    features: [
      "32 GB Cloud Storage",
      "eCommerce Integration",
      "Regular Updates",
      "24/7 Support",
      "Regular Updates",
    ],
    highlightColor: "bg-green-400",
  },
];

const slides = [
  {
    title: "Do More Tasks with Neon",
    text: "Our app was designed to let you manage your time more effectively. Also, it is a great personal companion for every smartphone user.",
    buttonText: "Start Using for Free",
    image: "/image-02.png",
  },
  {
    title: "#1 Everyday Application",
    text: "Welcome to Neon, an award-winning & easy-to-use mobile application that revolutionizes your daily work tasks.",
    buttonText: "Start using for free",
    image: "/image-01.png",
  },
  {
    title: "Awesome  Performance",
    text: "Neon delivers high performance and a variety of features that you’ll surely appreciate even if you use a budget-class device.",
    buttonText: "Start Using for Free",
    image: "/image-03.png",
  },
];

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const swiperRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`${scrolled ? "bg-[#1e1f22]" : "bg-transparent"
          } text-white py-4 px-6 md:px-12 fixed w-full top-0 z-50 transition-colors duration-100`}
      >
        <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="/logos.png"
              alt="Logo"
              style={{ width: "100px", height: "auto" }}
            />
          </div>

          <div className="hidden md:flex items-center space-x-12 text-gray-400 text-lg">
            <Link
              to="/"
              className="relative text-[#8defff] after:block after:h-[2px] after:bg-[#8defff] after:scale-x-100 after:mt-1"
            >
              Home
            </Link>
            <Link to="/pricing" className="hover:text-[#8defff] transition">
              Pricing
            </Link>
            <Link to="/features" className="hover:text-[#8defff] transition">
              Features
            </Link>
            <Link to="/contact" className="hover:text-[#8defff] transition">
              Contact
            </Link>
            <Link to="/pages" className="hover:text-[#8defff] transition">
              Pages
            </Link>

            {/* <button className="bg-[#2c2e33] box-shadow: inset 8rem 0 0 0 var(--color), inset -8rem 0 0 0 var(--color)  w-[180px] h-[60px] font-semibold py-2 px-3 rounded-lg hover:bg-[#3b3d42] transition shadow-lg">
            Get App
          </button> */}

            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Get App
              </span>
            </button>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] text-[#d7e1ec] py-10">
        <div
          className="max-w-screen-xl mx-auto px-4"
          onMouseEnter={() => swiperRef.current?.autoplay.start()}
          onMouseLeave={() => swiperRef.current?.autoplay.stop()}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col pt-[100px] md:flex-row items-center justify-between gap-12">
                  <div className="  md:w-1/2">
                    <h2 className="text-[500px] md:text-5xl font-bold mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-gray-400 mb-6 text-[22px]">
                      {slide.text}
                    </p>

                    <button className=" bg-gradient-to-tr from-[#383b40] text-xl h-20 w-60 rounded-lg before:ease relative overflow-hidden  text-gray-300 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 mt-8 hover:text-white  hover:before:h-64 hover:before:-translate-y-32">
                      <span className="relative z-10"> {slide.buttonText}</span>
                    </button>
                  </div>

                  <div className="md:w-1/2 flex justify-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className={`drop-shadow-lg ${index === 2 ? "max-w-sm" : "max-w-md"
                        }`}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#343537] to-[#26282a] text-white py-16 px-4 md:px-20">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <img src="/image-04.png" alt="Illustration" className="max-w-sm" />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-2">Features</h2>
            <p className="text-gray-400 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore...
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-bl from-[#343537] to-[#26282a] rounded-xl p-6 shadow-slate-100 hover:shadow-2xl transition">
                <div className="bg-[#26272b] w-12 h-12 flex items-center justify-center rounded-md mb-4">
                  <FaMousePointer className="text-[#ff6d6d]" size={20} />
                </div>
                <h4 className="text-lg font-semibold mb-2">Easy Customize</h4>
                <p className="text-[#d7e1ec] text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do.
                </p>
              </div>

              <div className="bg-gradient-to-bl from-[#343537] to-[#26282a] rounded-xl p-6 shadow-slate-100 hover:shadow-2xl transition">
                <div className="bg-[#26272b] w-12 h-12 flex items-center justify-center rounded-md mb-4">
                  <FaCube className="text-[#8defff]" size={20} />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  Different Layouts
                </h4>
                <p className="text-[#d7e1ec] text-sm">
                  Lorem ipsum dolor sit amet,
                </p>
              </div>

              <div className="bg-gradient-to-t from-[#343537] to-[#26282a] rounded-xl p-6 shadow-slate-100 hover:shadow-2xl transition">
                <div className="bg-[#26272b] w-12 h-12 flex items-center justify-center rounded-md mb-4">
                  <FaCommentDots className="text-[#00ffa3]" size={20} />
                </div>
                <h4 className="text-lg font-semibold mb-2">Friendly Support</h4>
                <p className="text-gray-400 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] text-[#d7e1ec] py-10">
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl py-[30px] px-[160px] font-bold mb-[70px]">
            Pricing Plans
          </h2>
        </div>
        <div className=" pb-12 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 bg-gradient-to-bl from-[#343537] to-[#26282a] shadow-lg hover:shadow-2xl transition duration-400 `}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#ff8c68] text-white text-sm w-[365px] h-9 text-center px-4 py-2 rounded-t-lg shadow-slate-100 font-semibold">
                  Popular
                </div>
              )}
              <h3 className="text-2xl  text-[#9b9ca7] font-semibold text-center mb-4">
                {plan.name}
              </h3>
              <div className="flex items-center justify-center mb-6">
                <div
                  className={`h-6 w-1.5 ${plan.highlightColor} rounded-full mr-2`}
                />
                <p className="text-5xl font-bold">{plan.price}</p>
                <span className="ml-2 text-gray-400">Per Month</span>
              </div>
              <hr className="border-gray-700 mb-6" />
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => {
                  const label =
                    typeof feature === "string" ? feature : feature.label;
                  const available =
                    typeof feature === "string" ? true : feature.available;

                  return (
                    <li
                      key={i}
                      className={`flex items-center space-x-2 ${available ? "text-white" : "text-gray-500"
                        }`}
                    >
                      <span>✔</span>
                      <span>{label}</span>
                    </li>
                  );
                })}
              </ul>
              <button className="w-full py-2 my-5 bg-[#3b3d42] rounded-lg font-semibold hover:bg-[#4b4d52] transition">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="h-full w-full pt-12 bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f]">
          <h1 className="text-white text-center text-[40px] font-bold pt-4">Welcome to Neon</h1>
          <div className="flex flex-wrap gap-3 justify-between h-[60vh] w-full">
         
            <div className="pl-14 pt-10 w-full sm:w-[30%] h-full">
              <div className="h-[22vh]">
                <div className="flex justify-end gap-5">
                  <h2 className="text-[#D7E1E0] text-xl font-bold">Friendly Support</h2>
                  <div className="shadow-2xl relative -top-5 h-[60px] w-[60px] flex justify-center items-center rounded-[50%] bg-gradient-to-r from-black to-gray-400">
                    <FaMessage className="text-3xl text-[#a1a4ab]" />
                  </div>
                </div>
                <p className="text-[#A0A1AC] text-end">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate.</p>
              </div>
              <div class="flex justify-end  items-start">
                <div class="w-64 h-[2.5px] rounded-md shadow-2xl bg-[#2f2f2f]  ml-1 mt-1"></div>
              </div>
              <div className="h-[30vh] pt-10">
                <div className="flex justify-end gap-5">
                  <h2 className="text-[#D7E1E0] text-xl font-bold">User-friendly UI</h2>
                  <div className="shadow-2xl relative -top-5 h-[60px] w-[60px] flex justify-center items-center rounded-[50%] bg-gradient-to-r from-black to-gray-400">
                    <FaArrowPointer className="text-3xl text-[#a1a4ab]" />
                  </div>
                </div>
                <p className="text-[#A0A1AC] text-end">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate.</p>
              </div>
            </div>

            <div className="w-full sm:w-[30%] h-full flex items-center justify-center mt-10 sm:mt-0">
              <div className="border border-[#918f8f86] shadow-2xl flex justify-center items-center rounded-[50%] w-[300px] sm:w-[400px] h-[300px] sm:h-[380px] relative overflow-hidden group">
                <img
                  className="h-[90%] w-[90%] object-cover rounded-[50%] absolute opacity-100 group-hover:opacity-0 transition-opacity duration-1000"
                  src="https://images.unsplash.com/photo-1745541643943-8908ceee4dc4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOTB8fHxlbnwwfHx8fHw%3D"
                  alt=""
                />
                <img
                  className="h-[90%] w-[90%] object-cover rounded-[50%] absolute opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                  src="https://images.unsplash.com/photo-1586805372042-327a923a697a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHRyYWZmaWN8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
              </div>
            </div>
            
            <div className="w-full sm:w-[30%] h-full pt-10">
              <div className="h-[22vh]">
                <div className="flex gap-5">
                  <div className="shadow-2xl relative -top-2 h-[60px] w-[60px] flex justify-center items-center rounded-[50%] bg-gradient-to-r from-black to-gray-400">
                    <GiPerspectiveDiceSixFacesFour className="text-5xl text-[#a1a4ab]" />
                  </div>
                  <h2 className="text-[#D7E1E0] text-xl font-bold">Easy <br /> Customization</h2>
                </div>
                <p className="text-[#A0A1AC]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate.</p>
              </div>
              <div class="flex items-start">
                <div class="w-64 h-[2.5px] rounded-md shadow-2xl bg-[#2f2f2f]  ml-1 mt-1"></div>
              </div>
              <div className="h-[22vh] pt-10">
                <div className="flex gap-5">
                  <div className="shadow-2xl relative -top-2 h-[60px] w-[60px] flex justify-center items-center rounded-[50%] bg-gradient-to-r from-black to-gray-400">
                    <FaMessage className="text-3xl text-[#a1a4ab]" />
                  </div>
                  <h2 className="text-[#D7E1E0] text-xl font-bold pb-2">Simple Setup</h2>
                </div>
                <p className="text-[#A0A1AC]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate.</p>
              </div>
            </div>
          </div>
        </div>

      </section>
      <section className="bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] text-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl text-gray-200 font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-400 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor
              sit amet, consectetur adipiscing.
            </p>
            <form className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your name*"
                  className="w-full bg-[#2e2f31] border border-gray-600 shadow-inner shadow-black rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your e-mail address *"
                  className="w-full bg-[#2e2f31] border border-gray-600 shadow-inner shadow-black rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                rows="5"
                placeholder="Your question"
                className="w-full bg-[#2e2f31] border border-gray-600 shadow-inner shadow-black rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button className=" bg-gradient-to-tr from-[#383b40] text-xl  rounded-lg before:ease relative h-20 w-40 overflow-hidden  text-gray-300 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 hover:text-white  hover:before:h-64 hover:before:-translate-y-32">
                <span className="relative z-10">Subscribe</span>
              </button>
            </form>
          </div>

          <div className="bg-gradient-to-br from-[#393d40] to-[#26282a] rounded-xl p-8 space-y-6 shadow-white">
            <div>
              <h3 className="text-3xl font-semibold text-[#d7dee1] mb-4">
                Get The App:
              </h3>
              <div className=" space-y-4">
                <button className="bg-gradient-to-tr mr-8 from-[#383b40] text-xl rounded-lg before:ease relative h-20 w-48 overflow-hidden text-gray-300 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 hover:text-white hover:before:h-64 hover:before:-translate-y-32">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaApple className="text-2xl" />
                    Apple Store
                  </span>
                </button>

                <button className=" bg-gradient-to-tr from-[#383b40] text-xl  rounded-lg before:ease relative h-20 w-48 overflow-hidden  text-gray-300 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 hover:text-white  hover:before:h-64 hover:before:-translate-y-32">
                  <span className="relative z-10 flex item-center justify-center gap-2">
                    <IoLogoGooglePlaystore className="text-2xl" />
                    Google store
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-5">
              <h3 className="text-3xl font-semibold mt-4 mb-4">Contacts:</h3>
              <ul className="text-gray-300 space-y-3">
                <li>
                  <span className="text-gray-400 ">Ph.</span> 1-800-901-234
                </li>
                <li>
                  <span className="text-gray-400">Mail.</span> info@demolink.org
                </li>
                <li>
                  <span className="text-gray-400">Office.</span> Lorem ipsum
                  dolor sit amet,
                  <br /> consectetur adipiscing elit.
                </li>
              </ul>
            </div>
          </div>
        </div>


      </section>
      <section>
        <div className="bg-[#1E1F24] h-[80vh] text-white px-6 py-12">
          <div className="max-w-6xl mx-auto">

            <h2 className="text-3xl md:text-4xl font-bold">
              What's <span className="text-white">new?</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>


            <div className="flex space-x-6 mt-8 border-b border-gray-700 pb-2">
              <button className="text-white font-semibold border-b-2 border-cyan-400 pb-1">
                See All
              </button>
              <button className="text-gray-400 hover:text-white">Popular</button>
              <button className="text-gray-400 hover:text-white">Newest</button>
            </div>


            <div className="flex gap-6 mt-8">
              <div className="relative group overflow-hidden rounded-md shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1613324996029-f6190a17838f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Card 1"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-end">
                  <p className="text-sm text-white">Jan 10, 2023</p>
                  <h3 className="text-lg font-semibold text-white mt-1">
                    We Have a Lot of Useful Solutions for You
                  </h3>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-md shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Card 2"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-end">
                  <p className="text-sm text-white">Jan 10, 2023</p>
                  <h3 className="text-lg font-semibold text-white mt-1">
                    We Have a Lot of Useful Solutions for You
                  </h3>
                </div>
              </div>


              <div className="relative group overflow-hidden rounded-md shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1622151834677-70f982c9adef?q=80&w=1386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Card 3"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-end">
                  <p className="text-sm text-white">Jan 10, 2023</p>
                  <h3 className="text-lg font-semibold text-white mt-1">
                    We Have a Lot of Useful Solutions for You
                  </h3>
                </div>
              </div>
            </div>

     
            <div className="flex justify-between items-center mt-8 px-4">
              <button className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center">
                ←
              </button>
              <button className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center">
                →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
