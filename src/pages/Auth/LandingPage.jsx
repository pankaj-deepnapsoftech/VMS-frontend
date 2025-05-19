import { Suspense, useEffect, useState } from "react";
import "/public/Font/LexendDeca.ttf";
import {
  FaBullseye,
  FaClone,
  FaEye,
  FaProjectDiagram,
  FaSearch,
  FaTools,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import { FaArrowPointer, FaMessage } from "react-icons/fa6";

import { GiPerspectiveDiceSixFacesFour } from "react-icons/gi";
import Header from "./component/Header";
import Footer from "./component/Footer";
// import BookDemo from "../BookDemo";
import useBookDemo from "@/hooks/BookDemo";
import BookDemo from "@/modals/BookDemo";
import Loader from "@/components/Loader/Loader";
import RiskOperations from "./RiskOperations";

const slides = [
  {
    title: "AI Powered Risk Prioritization and Remediation Platform",
    text: "Enhance security with our intelligent AI-driven platform that identifies, prioritizes, and remediates risks efficiently. Streamline threat management, reduce vulnerabilities, and safeguard your business with actionable insights and automated solutions.",
    image: "/logo.png",
  },
];

const features = [
  {
    icon: FaSearch,
    title: "Intelligent API Discovery",
    description: `Automatically detects and classifies APIs and high-value endpoints to identify security risks.
Continuously monitors exposed APIs for misconfigurations, unauthorized access, and potential threats.`,
  },
  {
    icon: FaEye,
    title: "Observability",
    description:
      "Continuously monitors and detects deviations in security posture for proactive risk management.",
  },
  {
    icon: FaProjectDiagram,
    title: "Workflow Management",
    description: `Offers customizable dashboards, exception workflows, and ageing tracking for efficient vulnerability lifecycle management.
Automates risk-based prioritization, escalations, and team collaboration to accelerate remediation efforts.`,
  },
  {
    icon: FaTools,
    title: "Workflow-Driven Vulnerability Remediation",
    description:
      "Automates and streamlines remediation processes, ensuring efficient and structured vulnerability resolution.",
  },
  {
    icon: FaClone,
    title: "Duplicate Detection",
    description:
      "Identifies and eliminates redundant vulnerabilities, reducing noise and improving remediation efficiency.",
  },
  {
    icon: FaBullseye,
    title: "Campaign Management",
    description: `Organizes and prioritizes security fixes into structured campaigns for systematic risk mitigation.
Applies mass vulnerability fixes based on predefined categories, accelerating threat resolution.`,
  },
];

const LandingPage = () => {
  const [onload, setOnload] = useState(false);

  const { isOpen, openModal, closeModal } = useBookDemo();

  useEffect(() => {
    setOnload(true);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Header openModal={openModal} />
      <section className="bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] text-[#d7e1ec] py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between gap-12 py-12 px-10 2xl:px-0"
            >
              <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start">
                {/* Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 mt-16">
                  {slide.title}
                </h2>

                <div className="md:hidden mb-4">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`drop-shadow-lg mx-auto ${
                      index === 2 ? "max-w-xs" : "max-w-sm"
                    } w-full h-auto`}
                  />
                </div>

                {/* Text */}
                <p className="text-gray-400 mb-6 text-lg sm:text-xl">
                  {slide.text}
                </p>

                {/* Button */}
                {/* <div className="flex justify-center md:justify-start">
                  <button className="bg-gradient-to-tr from-[#383b40] text-md md:text-lg h-16 w-48 rounded-lg relative overflow-hidden text-gray-300 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 mt-4 hover:text-white hover:before:h-64 hover:before:-translate-y-32">
                    <span className="relative z-10">{slide.buttonText}</span>
                  </button>
                </div> */}
              </div>

              {/* Image only visible on desktop */}
              <div
                className={`hidden md:flex w-full md:w-1/2 items-center h-full justify-end ${
                  onload ? "scale-100" : "scale-0"
                } transition-all duration-1000`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`drop-shadow-lg bg-gradient-to-t from-gray-100 to-blue-500 ${
                    index === 2
                      ? "max-w-xs sm:max-w-sm"
                      : "max-w-sm sm:max-w-md"
                  } w-[70%] h-auto`}
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
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#343537] to-[#26282a] text-white py-16 px-4 md:px-20">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <img src="/image-04.png" alt="Illustration" className="max-w-sm" />
          </div>

          <div className="w-full md:w-2/3 ">
            <h2 className="text-4xl font-bold mb-2">Features</h2>
            <p className="text-gray-400 mb-8">
              SECURE& tools will offer key features that set them apart from
              competitors, providing unique solutions to address real-time
              challenges faced by enterprises of all sizes, from small
              businesses to large corporations.
            </p>

            <div className="flex gap-4 w-full overflow-x-scroll custom-scrollbar ">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-bl from-[#414244] to-[#36393b] rounded-xl p-6 shadow-slate-100 hover:shadow-2xl transition min-w-72 "
                >
                  <div className="bg-[#26272b] w-12 h-12 flex items-center justify-center rounded-xl mb-4 shadow-inner shadow-slate-950 ">
                    {item.icon && (
                      <item.icon className="text-[#ff6d6d] " size={25} />
                    )}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-[#d7e1ec] text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] text-[#d7e1ec] py-10">
        <div className="w-full text-center md:text-left px-6 md:px-40">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Pricing Plans
          </h2>
        </div>

        <div className="pb-12 max-w-6xl mx-auto flex overflow-x-auto md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory md:overflow-visible px-4 md:px-0">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="snap-center shrink-0 w-[90%] sm:w-[300px] md:w-full bg-gradient-to-bl from-[#343537] to-[#26282a] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-400 relative mx-auto"
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#ff8c68] text-white text-sm w-[355px] md:w-[365px]  md:h-10 text-center px-4 py-2 rounded-t-lg shadow-slate-100 font-semibold">
                  Popular
                </div>
              )}

              <h3 className="text-2xl text-[#9b9ca7] font-semibold text-center mb-4">
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

              <ul className="space-y-3 mb-6 text-sm">
                {plan.features.map((feature, i) => {
                  const label =
                    typeof feature === "string" ? feature : feature.label;
                  const available =
                    typeof feature === "string" ? true : feature.available;

                  return (
                    <li
                      key={i}
                      className={`flex items-center space-x-2 ${
                        available ? "text-white" : "text-gray-500 line-through"
                      }`}
                    >
                      <span>✔</span>
                      <span>{label}</span>
                    </li>
                  );
                })}
              </ul>

              <button className="mt-auto bg-gradient-to-tr from-[#383b40] text-xl rounded-lg relative h-14 w-full overflow-hidden text-gray-300 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 hover:text-white hover:before:h-64 hover:before:-translate-y-32">
                <span className="relative z-10">Select Plan</span>
              </button>
            </div>
          ))}
        </div>
      </section> */}

      <section>
        <div className="h-full w-full pt-12 bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f]">
          <h1 className="text-white text-center text-[40px] font-bold pt-4">
            Business aligned & AI Powered risk management
          </h1>
          <RiskOperations/>
          {/* <div className="flex flex-col sm:flex-row sm:flex-wrap gap-8 justify-between items-center h-auto w-full px-4 sm:px-8 py-10">
            <div className=" w-full sm:w-[30%]">
              <div className="mb-10 mt-10">
                <div className="flex justify-end max-[800px]:justify-start gap-4">
                  <h2 className="text-[#D7E1E0] text-xl font-bold">
                    Stakeholder Driven Dashboard
                  </h2>
                  <div className="shadow-2xl relative -top-5 h-[60px] w-[60px] flex justify-center items-center rounded-[50%] bg-gradient-to-r from-black to-gray-400">
                    <FaMessage className="text-3xl text-[#a1a4ab]" />
                  </div>
                </div>
                <p className="text-[#A0A1AC]">
                  Comprehensive visibility and reporting for all stakeholders
                </p>
              </div>
              <div className="flex justify-end max-[800px]:justify-start  items-start">
                <div className="w-64 h-[2.5px] rounded-md shadow-2xl bg-[#2f2f2f]  ml-1 mt-1"></div>
              </div>
              <div className="h-[30vh] pt-24 md:pt-16">
                <div className="flex justify-end max-[800px]:justify-start gap-4">
                  <h2 className="text-[#D7E1E0] text-xl font-bold">
                    AI Penetration Test Platform
                  </h2>
                  <div className="shadow-2xl relative -top-5 h-[60px] w-[60px] flex justify-center items-center rounded-[50%] bg-gradient-to-r from-black to-gray-400">
                    <FaArrowPointer className="text-3xl text-[#a1a4ab]" />
                  </div>
                </div>
                <p className="text-[#A0A1AC]">
                  Advanced AI-powered security testing with high accuracy
                </p>
              </div>
            </div>

            <div className="w-full sm:w-[30%] h-full flex items-center justify-center mt-10 sm:mt-0">
              <div className="border border-[#918f8f86] shadow-2xl flex justify-center items-center rounded-[50%] w-[300px] sm:w-[400px] h-[300px] sm:h-[380px] relative overflow-hidden group">
                <img
                  className="h-full w-[90%] object-contain rounded-[50%] absolute opacity-100 group-hover:opacity-0 transition-opacity duration-1000"
                  src="./logo.png"
                  alt=""
                />
                <img
                  className="h-full w-full object-cover rounded-[50%] absolute opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                  src="./landing-2.png"
                  alt=""
                />
              </div>
            </div>

            <div className="w-full sm:w-[30%] h-full ">
              <div className="h-[22vh] pt-12 md:pb-44">
                <div className="flex gap-5">
                  <div className="shadow-2xl relative -top-2 h-[60px] w-[60px] flex justify-center items-center rounded-[50%] bg-gradient-to-r from-black to-gray-400">
                    <GiPerspectiveDiceSixFacesFour className="text-5xl text-[#a1a4ab]" />
                  </div>
                  <h2 className="text-[#D7E1E0] text-xl font-bold">
                    Asset/API Discovery & Inventory
                  </h2>
                </div>
                <p className="text-[#A0A1AC]">
                  Complete mapping of all assets and APIs across your
                  infrastructure
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-64 h-[2.5px] rounded-md shadow-2xl bg-[#2f2f2f]  ml-1 mt-1"></div>
              </div>
              <div className="h-[22vh] pt-10">
                <div className="flex gap-5">
                  <div className="shadow-2xl relative -top-2 h-[60px] w-[60px] flex justify-center items-center rounded-[50%] bg-gradient-to-r from-black to-gray-400">
                    <FaMessage className="text-3xl text-[#a1a4ab]" />
                  </div>
                  <h2 className="text-[#D7E1E0] text-xl font-bold pb-2">
                    AI Powered Remediation Factory
                  </h2>
                </div>
                <p className="text-[#A0A1AC]">
                  Automated remediation suggestions and implementation guidance
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      <section
        id="book-demo"
        className="w-full bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] flex items-center justify-center text-white py-20 px-6 md:px-20"
      >
        <div className="gap-12 items-center">
          {/* Left Column - Contact Form */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-400">
              We&apos;d love to hear from you. Fill out the form and we’ll be in
              touch.
            </p>

            <form className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your name*"
                  className="w-full bg-[#2e2f31] border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your e-mail address *"
                  className="w-full bg-[#2e2f31] border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                rows="6"
                placeholder="Your message"
                className="w-full bg-[#2e2f31] border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <button className="relative h-16 w-40 overflow-hidden text-lg rounded-lg bg-gradient-to-tr from-[#383b40] text-gray-300 shadow-xl transition-all duration-300 before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 hover:text-white hover:before:h-64 hover:before:-translate-y-32">
                <span className="relative z-10">Submit</span>
              </button>
            </form>
          </div>

          {/* Right Column - Contact Info */}
        </div>
      </section>

      {/* <section className="bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 pt-8 text-white">
      
          <div className="text-center mb-12 ">
            <div className="flex flex-col md:flex-row items-center justify-center  md:gap-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-0">
                How it works
              </h2>
              <div className="w-2 h-4  text-white"></div>
              <p className="text-gray-400 text-lg sm:text-xl mt-2 md:mt-5 md:ml-6 text-center md:text-left">
                Quick and Intuitive Profile Configuration
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-8 md:pt-16 gap-6">
              <div className=" relative group bg-gradient-to-br from-[#393d40] to-[#25282a] rounded-xl p-6 min-h-[300px] transition-transform duration-300 transform hover:-translate-y-3 shadow-lg hover:shadow-2xl">
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

              <div className=" relative group bg-gradient-to-br from-[#393d40] to-[#25282a] rounded-xl p-6 min-h-[300px] transition-transform duration-300 transform hover:-translate-y-3 shadow-lg hover:shadow-2xl">
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

              <div className=" relative group bg-gradient-to-br from-[#393d40] to-[#25282a] rounded-xl p-6 min-h-[300px] transition-transform duration-300 transform hover:-translate-y-3 shadow-lg hover:shadow-2xl">
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

              <div className="  relative group bg-gradient-to-br from-[#393d40] to-[#25282a] rounded-xl p-6 min-h-[300px] transition-transform duration-300 transform hover:-translate-y-3 shadow-lg hover:shadow-2xl">
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
      </section> */}
      <Footer />
      <BookDemo closeModal={closeModal} isOpen={isOpen} />
    </Suspense>
  );
};

export default LandingPage;
