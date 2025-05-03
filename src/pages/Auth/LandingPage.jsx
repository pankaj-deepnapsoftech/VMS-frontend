import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "/public/Font/LexendDeca.ttf";
import { FaApple, FaCommentDots, FaCube, FaMousePointer, } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FaArrowPointer, FaMessage } from "react-icons/fa6";
import { Pagination, Autoplay } from "swiper/modules";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { GiPerspectiveDiceSixFacesFour } from "react-icons/gi";
import { FiArrowRight, FiChevronUp } from 'react-icons/fi';
import { FiMenu, FiX } from "react-icons/fi";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const swiperRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          } text-white py-4 px-6 md:px-12 fixed w-full top-0 z-50 transition-colors duration-300`}
      >
        <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="/logos.png"
              alt="Logo"
              style={{ width: "100px", height: "auto" }}
            />
          </div>

          {/* Desktop Menu */}
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

            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Get App
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)}>
              <FiMenu size={28} />
            </button>
          </div>
        </div>

        {/* Sliding Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#1e1f22] text-white z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
            <img src="/logos.png" alt="Logo" style={{ width: "80px" }} />
            <button onClick={() => setIsMenuOpen(false)}>
              <FiX size={26} />
            </button>
          </div>
          <div className="flex flex-col p-6 space-y-6 text-gray-400 text-lg">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#8defff]">Home</Link>
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="hover:text-[#8defff]">Pricing</Link>
            <Link to="/features" onClick={() => setIsMenuOpen(false)} className="hover:text-[#8defff]">Features</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#8defff]">Contact</Link>
            <Link to="/pages" onClick={() => setIsMenuOpen(false)} className="hover:text-[#8defff]">Pages</Link>
            <button className="mt-4 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Get App
              </span>
            </button>
          </div>
        </div>
      </nav>

      <section
        id="navbar"
        className="bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] text-[#d7e1ec] py-10"
      >
        <div
          className="max-w-screen-xl mx-auto px-4"
          onMouseEnter={() => swiperRef.current?.autoplay.start()}
          onMouseLeave={() => swiperRef.current?.autoplay.stop()}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20 py-10">

                  <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-gray-400 mb-6 text-base md:text-xl">
                      {slide.text}
                    </p>

                    <button className="relative text-xl h-14 w-52 rounded-lg overflow-hidden bg-gradient-to-tr from-[#383b40] to-[#1f2224] text-gray-300 shadow-2xl transition-all before:absolute before:top-1/2 before:left-1/2 before:h-0 before:w-64 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-[#1b1d1f] before:transition-all hover:text-white hover:before:h-64">
                      <span className="relative z-10">{slide.buttonText}</span>
                    </button>
                  </div>

                  <div className="md:w-1/2 flex justify-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className={`drop-shadow-lg w-[250px] md:w-[350px] lg:w-[400px] ${index === 2 ? "max-w-sm" : "max-w-md"
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
                <div className="bg-[#26272b] w-12 h-12 flex items-center justify-center rounded-xl mb-4 shadow-inner shadow-slate-950 ">
                  <FaMousePointer className="text-[#ff6d6d] " size={25} />
                </div>
                <h4 className="text-lg font-semibold mb-2">Easy Customize</h4>
                <p className="text-[#d7e1ec] text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do.
                </p>
              </div>

              <div className="bg-gradient-to-bl from-[#343537] to-[#26282a] rounded-xl p-6 shadow-slate-100 hover:shadow-2xl transition">
                <div className="bg-[#26272b] w-12 h-12 flex items-center justify-center rounded-xl mb-4 shadow-inner shadow-slate-950 ">
                  <FaCube className="text-[#8defff]" size={25} />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  Different Layouts
                </h4>
                <p className="text-[#d7e1ec] text-sm">
                  Lorem ipsum dolor sit amet,
                </p>
              </div>

              <div className="bg-gradient-to-t from-[#343537] to-[#26282a] rounded-xl p-6 shadow-slate-100 hover:shadow-2xl transition">
                <div className="bg-[#26272b] w-12 h-12 flex items-center justify-center rounded-xl shadow-inner shadow-slate-950  mb-4">
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

              <button className=" bg-gradient-to-tr from-[#383b40] text-xl  rounded-lg before:ease relative h-16 w-60 overflow-hidden  text-gray-300 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 hover:text-white  hover:before:h-64 hover:before:-translate-y-32">
                <span className="relative z-10">Select plan</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="h-full w-full pt-12 bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f]">
          <h1 className="text-white text-center text-[40px] font-bold pt-4">Welcome to Neon</h1>

          <div className="flex flex-col lg:flex-row flex-wrap gap-6 justify-between items-center h-auto w-full px-6 lg:px-16 py-10">
            <div className="w-full lg:w-[30%] flex flex-col justify-between h-full space-y-10">
              <div className="h-auto">
                <div className="flex justify-end items-center gap-5">
                  <h2 className="text-[#D7E1E0] text-xl font-bold">Friendly Support</h2>
                  <div className="shadow-2xl -mt-5 h-[60px] w-[60px] flex justify-center items-center rounded-full bg-gradient-to-r from-black to-gray-400">
                    <FaMessage className="text-3xl text-[#a1a4ab]" />
                  </div>
                </div>
                <p className="text-[#A0A1AC] text-end mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate.</p>
              </div>

              <div className="w-full h-[2.5px] rounded-md shadow-2xl bg-[#2f2f2f] ml-auto mt-1"></div>
              <div className="h-auto pt-6">
                <div className="flex justify-end items-center gap-5">
                  <h2 className="text-[#D7E1E0] text-xl font-bold">User-friendly UI</h2>
                  <div className="shadow-2xl -mt-5 h-[60px] w-[60px] flex justify-center items-center rounded-full bg-gradient-to-r from-black to-gray-400">
                    <FaArrowPointer className="text-3xl text-[#a1a4ab]" />
                  </div>
                </div>
                <p className="text-[#A0A1AC] text-end mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate.</p>
              </div>
            </div>
            <div className="w-full lg:w-[30%] flex items-center justify-center">
   
                <div className="shadow-inner shadow-slate-950 flex justify-center items-center rounded-full w-[300px] sm:w-[350px] h-[300px] sm:h-[350px] relative overflow-hidden group">
                  <img
                    className="h-[90%] w-[90%] object-cover rounded-full absolute opacity-100 group-hover:opacity-0 transition-opacity duration-1000"
                    src="https://images.unsplash.com/photo-1745541643943-8908ceee4dc4?w=400&auto=format&fit=crop&q=60"
                    alt="Person"
                  />
                  <img
                    className="h-[90%] w-[90%] object-cover rounded-full absolute opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                    src="https://images.unsplash.com/photo-1586805372042-327a923a697a?w=400&auto=format&fit=crop&q=60"
                    alt="Traffic"
                  />
                </div>
           
            </div>


            <div className="w-full lg:w-[30%] flex flex-col justify-between h-full space-y-10 pt-6 lg:pt-0">
              <div className="h-auto">
                <div className="flex items-center gap-5">
                  <div className="shadow-2xl -mt-2 h-[60px] w-[60px] flex justify-center items-center rounded-full bg-gradient-to-r from-black to-gray-400">
                    <GiPerspectiveDiceSixFacesFour className="text-5xl text-[#a1a4ab]" />
                  </div>
                  <h2 className="text-[#D7E1E0] text-xl font-bold">Easy <br /> Customization</h2>
                </div>
                <p className="text-[#A0A1AC] mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate.</p>
              </div>

              <div className="w-full h-[2.5px] rounded-md shadow-2xl bg-[#2f2f2f] mt-1"></div>

              <div className="h-auto pt-6">
                <div className="flex items-center gap-5">
                  <div className="shadow-2xl -mt-2 h-[60px] w-[60px] flex justify-center items-center rounded-full bg-gradient-to-r from-black to-gray-400">
                    <FaMessage className="text-3xl text-[#a1a4ab]" />
                  </div>
                  <h2 className="text-[#D7E1E0] text-xl font-bold">Simple Setup</h2>
                </div>
                <p className="text-[#A0A1AC] mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate.</p>
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
                rows="10"
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
                <button className="bg-gradient-to-tr mr-8  from-[#383b40] text-xl rounded-lg before:ease relative h-20 w-48 overflow-hidden text-gray-300 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 hover:text-white hover:before:h-64 hover:before:-translate-y-32">
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

        <div className="mt-12 flex flex-col items-center justify-center text-sm text-gray-500">
          <div className="flex space-x-4 mb-4">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
          <p>
            © 2025. Neon.{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        </div>


      </section>
      <section>
        <div className="bg-[#27292B] text-white p-8">
          <div className="max-w-7xl mx-auto">

            <h2 className="text-4xl font-bold mb-4">What's new?</h2>
            <p className="text-lg text-gray-300 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>


            <div className="flex gap-8 mb-4 text-gray-400">
              <button className="border-b-2 border-cyan-400 text-white">See All</button>
              <button>Popular</button>
              <button>Newest</button>
            </div>

            <div className="flex  gap-6">

              <div className="relative group hover:scale-105 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1646295404846-658322e343e4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="post1"
                  className="w-full h-80 object-cover rounded-md "
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 rounded-md">
                  <p className="text-sm">Jan 10, 2023</p>
                  <h3 className="text-xl font-semibold mt-1">We Have a Lot of Useful Solutions for You</h3>
                </div>
              </div>


              <div className="relative group hover:scale-105 transition-all duration-500">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661778574633-27016b1a61b1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="post2"
                  className="w-full h-80 object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 rounded-md">
                  <p className="text-sm">Jan 10, 2023</p>
                  <h3 className="text-xl font-semibold mt-1">We Have a Lot of Useful Solutions for You</h3>
                </div>
              </div>


              <div className="relative group hover:scale-105 transition-all duration-500">
                <img
                  src="https://plus.unsplash.com/premium_photo-1725408065653-9b45d2e902b1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="post3"
                  className="w-full h-80 object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 rounded-md">
                  <p className="text-sm">Jan 10, 2023</p>
                  <h3 className="text-xl font-semibold mt-1">We Have a Lot of Useful Solutions for You</h3>
                </div>
              </div>
            </div>


            <div className="flex justify-between mt-8">
              <button className="bg-gray-800 w-[50px] h-[50px]  rounded-full">
                <span className="text-2xl">&larr;</span>
              </button>
              <button className="bg-cyan-500 w-[50px] h-[50px] rounded-[50%]">
                <span className="text-2xl text-white">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 pt-8 text-white">
          <div className="text-center">
            <div className="flex flex-1">
              <h2 className="text-6xl font-bold mb-12">How it works</h2>
              <div className="w-2 h-4  text-white"></div>
              <p className="text-gray-400 text-xl mt-5 ml-24">Quick and Intuitive Profile Configuration</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4   max-w-screen-xl mx-auto">
              <div className=" relative group bg-gradient-to-br from-[#393d40] to-[#25282a] ml-10 rounded-xl p-6  min-h-[300px]  duration-300 transform hover:-translate-y-3 shadow-lg hover:shadow-2xl transition duration-600">
                <div className="bg-[#282a2d] w-12 h-12 flex items-center justify-center shadow-inner shadow-slate-950 rounded-xl mb-4">
                  <span className=" text-cyan-400 text-2xl ">01</span>
                </div>

                <h4 className="text-2xl mb-3 pt-3 text-left">Easy Customize</h4>
                <p className="text-gray-400 text-md leading-relaxed text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do.
                </p>
                <div className="absolute left-6 right-6 bottom-0 h-[2px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left  duration-300"></div>
              </div>

              <div className=" relative group bg-gradient-to-br from-[#393d40] to-[#25282a] ml-10 rounded-xl p-6  min-h-[300px]  duration-300 transform hover:-translate-y-3 shadow-lg hover:shadow-2xl transition duration-600">
                <div className="bg-[#282a2d] w-12 h-12 flex items-center justify-center shadow-inner shadow-slate-950 rounded-xl mb-4 ">
                  <span className=" text-cyan-400 text-2xl ">02</span>
                </div>

                <h4 className="text-2xl mb-3 pt-3 text-left">Easy Customize</h4>
                <p className="text-gray-400 text-md leading-relaxed text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do.
                </p>
                <div className="absolute left-6 right-6 bottom-0 h-[2px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left  duration-300"></div>
              </div>

              <div className=" relative group bg-gradient-to-br from-[#393d40] to-[#25282a] ml-10 rounded-xl p-6  min-h-[300px]  duration-300 transform hover:-translate-y-3 shadow-lg hover:shadow-2xl transition duration-600">
                <div className="bg-[#282a2d] w-12 h-12 flex items-center justify-center shadow-inner shadow-slate-950 rounded-xl mb-4">
                  <span className=" text-cyan-400 text-2xl ">03</span>
                </div>

                <h4 className="text-2xl mb-3 pt-3 text-left">Easy Customize</h4>
                <p className="text-gray-400 text-md leading-relaxed text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do.
                </p>
                <div className="absolute left-6 right-6 bottom-0 h-[2px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
              </div>

              <div className=" relative group bg-gradient-to-br from-[#393d40] to-[#25282a] ml-10 rounded-xl p-6  min-h-[300px]  duration-300 transform hover:-translate-y-3 shadow-lg hover:shadow-2xl transition duration-600">
                <div className="bg-[#282a2d] w-12 h-12 flex items-center justify-center shadow-inner shadow-slate-950 rounded-xl mb-4">
                  <span className=" text-cyan-400 text-2xl ">04</span>
                </div>

                <h4 className="text-2xl mb-3 pt-3 text-left">Easy Customize</h4>
                <p className="text-gray-400 text-md leading-relaxed text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do.
                </p>
                <div className="absolute left-6 right-6 bottom-0 h-[2px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-[#2E3032] text-white   py-36 px-12 h-full ">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Your Career <br /> <span className="text-gray-300">Starts Here!</span>
              </h2>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">●</span> Creative Space
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">●</span> Growing Career
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">●</span> Cookies
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">●</span> Benefits
                </li>
              </ul>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <p className="text-teal-400 text-sm">+1 800 603 6035</p>
            </div>


            <div>
              <img
                src="https://plus.unsplash.com/premium_photo-1661540917329-d73859798902?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Office"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>


            <div className="space-y-4">
              <div className="flex justify-between items-center  border-b border-t border-gray-700 hover:rounded-xl hover:shadow-2xl py-6 px-3 hover:bg-[#ffffff1e] hover:backdrop-blur-3xl w-full transition-all duration-700">
                <p className="text-cyan-400">Junior Developer</p>
                <p>Seattle</p>
                <p>Full Time</p>
                <FiArrowRight className="text-gray-400" />
              </div>
              <div className="flex justify-between items-center border-b  border-gray-700 hover:rounded-xl hover:shadow-2xl py-6 px-3 hover:bg-[#ffffff1e] hover:backdrop-blur-3xl w-full transition-all duration-700">
                <p className="text-cyan-400">Junior Developer</p>
                <p>Seattle</p>
                <p>Full Time</p>
                <FiArrowRight className="text-gray-400" />
              </div>
              <div className="flex justify-between items-center border-b  border-gray-700 hover:rounded-xl hover:shadow-2xl py-6 px-3 hover:bg-[#ffffff1e] hover:backdrop-blur-3xl w-full transition-all duration-700">
                <p className="text-cyan-400">Junior Developer</p>
                <p>Seattle</p>
                <p>Full Time</p>
                <FiArrowRight className="text-gray-400" />
              </div>
              <div className="flex justify-between items-center border-b  border-gray-700 hover:rounded-xl hover:shadow-2xl py-6 px-3 hover:bg-[#ffffff1e] hover:backdrop-blur-3xl w-full transition-all duration-700">
                <p className="text-cyan-400">Junior Developer</p>
                <p>Seattle</p>
                <p>Full Time</p>
                <FiArrowRight className="text-gray-400" />
              </div>
            </div>
          </div>


          <div className="mt-10 text-gray-400 text-sm">
            <span>Welcome to Our Office: </span>
            <span className="text-white font-medium">
              9870 St Vincent Place, Glasgow, DC 45 Fr 45
            </span>
          </div>

          <a href="#navbar">
            <button className="fixed bottom-6 right-6 bg-cyan-500 p-3 rounded-lg shadow-lg text-white hover:bg-cyan-600 transition-all">
              <FiChevronUp size={24} />
            </button>
          </a>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
