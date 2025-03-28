import { NavLink } from "react-router-dom";

// export default function GettingStarted() {
// 	return (
// 		<div className="min-h-screen flex items-center justify-center bg-[#015289] ">
{
  /* <div className="bg-white rounded-xl shadow-2xl p-10 max-w-md w-full text-center">
	<h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Secure& !</h1>
	<p className="text-gray-600 mb-8">Get started with your account.</p>

	<div className="space-y-4 flex flex-col">
		<NavLink to={"/sign-in"}
			className="w-full bg-[#015289]  text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition">
			Sign In
		</NavLink>
		<NavLink to={"/sign-up"}
			className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl text-lg font-medium hover:bg-gray-200 transition">
			Sign Up
		</NavLink>
	</div>
</div> */
}

// 		</div>
// 	);
// }

import React, { useState } from "react";
import { GiSpiderWeb } from "react-icons/gi";
import {
  FaBook,
  FaBug,
  FaChartBar,
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaCode,
  FaCrosshairs,
  FaDragon,
  FaFileAlt,
  FaHeartbeat,
  FaKey,
  FaNetworkWired,
  FaSearch,
  FaShieldAlt,
  FaSpider,
  FaSyncAlt,
  FaTools,
} from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import Footer from "@/components/Footer/Footer";

function GettingStarted() {
  const features = [
    {
      icon: <FaSearch />,
      title: "Resource discovery",
      description:
        "First, the scanner attempts to discover various endpoints, sensitive files, and hidden paths on the target website.",
    },
    {
      icon: <FaSpider />,
      title: "Spidering",
      description:
        "Based on the target URL and endpoints it discovered in the previous phase, the Website Scanner starts to map the structure of the web application.",
    },
    {
      icon: <FaBug />,
      title: "Active scanning",
      description:
        "While the Spider is running, another component of the Website Scanner takes each previously discovered endpoint and tests for vulnerabilities.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Passive scanning",
      description:
        "To detect interesting information and leaked sensitive data, the Website Vulnerability Scanner also analyzes web traffic passively.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Version-based CVE detection",
      description:
        "Besides specific application vulnerability detection, the Website Vulnerability Scanner also discovers vulnerabilities based on software versions.",
    },
    {
      icon: <FaClipboardList />,
      title: "Full list of security tests performed",
      description:
        "The deep version of the Website Vulnerability Scanner performs a complete security assessment of your web application.",
    },
  ];

  const links = [
    {
      href: "#use-cases",
      label: "How it works",
    },

    {
      href: "#use-cases",
      label: "About",
      target: "_blank",
    },
  ];

  const list = [
    {
      icon: <FaDragon size={40} className="text-blue-400" />,
      title: "Get more from every scan.",
      description:
        "Simulate real-world attacks and uncover vulnerabilities efficiently.",
    },
    {
      icon: <FaCheckCircle size={40} className="text-blue-400" />,
      title: "Trust your results.",
      description:
        "Minimize false positives with proof-based validation for accurate results.",
    },
    {
      icon: <FaCrosshairs size={40} className="text-blue-400" />,
      title: "Get deeper findings.",
      description:
        "Detect vulnerabilities even in JavaScript-heavy applications using advanced scanning techniques.",
    },
    {
      icon: <FaKey size={40} className="text-blue-400" />,
      title: "Customize any scan. Advanced features for in-depth detection",
      description:
        "The Ultimate Vulnerability Scanner enhances the complexity of the scanning project by applying powerful in-depth audit mechanisms.",
    },
    {
      icon: <FiTarget size={40} className="text-blue-400" />,
      title: "Enjoy benchmark-proven performance. See for yourself!",
      description:
        "With extensive scanning, it covers critical risk factors and provides actionable insights, ensuring maximum security compliance.",
    },
    {
      icon: <FaChartBar size={40} className="text-blue-400" />,
      title: "Generate proof-backed reports. Make sure remediation happens",
      description:
        "Export in-depth reports with accurate findings for audits and compliance, ensuring vulnerabilities are addressed effectively.",
    },
  ];

  const newFeatures = [
    {
      icon: <FaClock className="text-4xl text-blue-400" />,
      title: "Start scanning in seconds - no setup required",
      description:
        "A cloud-based scanner, the Website Vulnerability Scanner on Pentest-Tools.com does not require installation, configuration, or maintenance. Just launch a scan, enter your target URL, and enhance results with advanced scan setup.",
    },
    {
      icon: <FaSyncAlt className="text-4xl text-blue-400" />,
      title: "Automate website security scans with flexible scheduling",
      description:
        "New vulnerabilities show up on the web all the time. Friday nights, Mondays, anytime. Stay ahead with scheduled scans: daily, weekly, or monthly. The moment our scanner learns of a new vulnerability, it starts looking for it automatically.",
    },
    {
      icon: <FaCode className="text-4xl text-blue-400" />,
      title: "Integrate, automate, and streamline with our API",
      description:
        "Many security leaders use a few pentesting tools, not just our scanner. That’s why we integrate with CI/CD pipelines, security orchestration platforms, and development frameworks, making security testing an integral part of your development process.",
    },
    {
      icon: <FaNetworkWired className="text-4xl text-blue-400" />,
      title: "Scan internal web apps without making assets public",
      description:
        "Need to scan assets behind firewalls, on private clouds, or internal networks? Our VPN feature enables this securely so you can detect risks without exposing your assets to the internet.",
    },
    {
      icon: <FaChartBar className="text-4xl text-blue-400" />,
      title: "Integrate scan results into the tools you already use",
      description:
        "Vulnerabilities can slip through the cracks when they’re hard to monitor. Sync security alerts with Jira, GitHub, Slack, and other platforms so your team gets results instantly.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d2647] py-4 px-8 flex justify-center flex-col items-center">
      <nav className="w-full flex justify-between items-center p-4">
        <div className="flex items-center justify-center gap-9">
          <h1 className="text-3xl font-bold text-gray-50">
            Secure<span className="text-rose-500">&</span>
          </h1>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 md:mx-auto md:w-fit">
            {links.map(({ href, icon, label, target }, index) => (
              <li key={index}>
                <a
                  href={href}
                  target={target}
                  className="flex items-center gap-2 py-3 font-normal text-white transition-colors hover:text-rose-500 hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className=" flex items-center justify-center gap-5">
          <button className="text-gray-700 bg-white px-6  py-2 rounded-lg hover:bg-transparent transition-all ease hover:border hover:text-white border-white">
            Sign In
          </button>
        </div>
      </nav>

      <div className="container  h-screen  flex flex-col lg:flex-row justify-center items-start mt-20">
        {/* Left Section */}
        <div className="max-w-2xl ">
          <h1 className="text-5xl  font-normal text-white leading-tight mb-6">
            Proactively Secure, <br />
            Effortlessly Comply, <br />
            Stay Ahead of Cyber Risks.
          </h1>

          <p className="text-slate-200 text-lg max-w-xl mb-6">
            Vulnerability Management System (VMS)—a cutting-edge solution that
            helps organizations identify, analyze, prioritize, and eliminate
            vulnerabilities with ease.
          </p>

          <NavLink
            to="/sign-up"
            className="bg-white text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-transparent hover:border border-white hover:text-white transition-all ease"
          >
            Create Free Account
          </NavLink>
        </div>

        {/* Scanner Interface */}
        <div className="bg-white backdrop-blur-lg rounded-2xl shadow-2xl p-12 max-w-md w-full text-center transform transition-all duration-300 hover:scale-105 lg:ml-32 mb-20 lg:mt-20 mt-20">
          <div className="text-center mb-5">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to <span className="text-blue-600">SECURE&</span>
            </h1>
            <p className="text-xs text-gray-600 font-semibold">
              Beyond security, a Strategy
            </p>
          </div>
          <p className="text-gray-600 mb-6">Get started with your account.</p>
          <div className="space-y-4">
            <NavLink
              to="/sign-in"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 hover:scale-105 transform transition-all duration-300"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/sign-up"
              className="block w-full bg-gray-200 text-gray-800 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-gray-300 hover:scale-105 transform transition-all duration-300"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>

      <hr className="bg-gray-300 w-full" />

      <div className="  text-white min-h-screen py-10 px-6 md:px-20">
        <header className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            Find exploitable web app vulnerabilities with documented evidence
          </h1>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
            Discover and fix security vulnerabilities in your web applications
            with our automated scanning and validation tools.
          </p>
        </header>
        <div className="relative flex flex-col items-center  px-5 bg-[#015289]   shadow-xl min-h-screen text-white">
          {/* Red Ripple Image at the Start */}
          <div className="mb-16 ">
            <img
              src="https://pentest-tools.com/images/illustrations/red-ripple.svg"
              alt="Red Ripple"
              className="w-32 md:w-48 animate-pulse opacity-50   "
            />
          </div>

          {/* Stepper Line */}
          <div className="absolute my-20 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-200 to-transparent animate-pulse"></div>

          {list.map((feature, index) => (
            <div
              key={index}
              className={`relative flex items-center w-full max-w-4xl mb-16 ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Stepper Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-500 rounded-full border-4 border-gray-800 shadow-lg animate-bounce"></div>

              {/* Feature Card Alternative */}
              <div className="w-5/6 md:w-1/2 bg-gray-100 shadow-xl border border-gray-100 rounded-2xl p-6 transition-transform hover:scale-105">
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-gray-300 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Red Ripple Image at the End */}
          <div className="mt-16">
            <img
              src="https://pentest-tools.com/images/illustrations/red-ripple.svg"
              alt="Red Ripple"
              className="w-32 md:w-48 animate-pulse opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-[#015289]   shadow-xl  m-10 text-white p-10 flex flex-col items-center rounded-lg">
        <div className="max-w-3xl text-left">
          <h2 className="text-3xl font-bold mb-4">
            How does the{" "}
            <span className="text-blue-500">Website Vulnerability Scanner</span>{" "}
            work?
          </h2>
          <p className="text-gray-100 text-lg">
            The Website Vulnerability Scanner is a DAST (Dynamic Application
            Security Testing) tool designed to discover vulnerabilities like
            XSS, SQL injection, and more. It interacts with the target
            application by sending HTTP requests with specific payloads to
            determine if a vulnerability exists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50  p-6 rounded-lg shadow-lg backdrop-blur-md border border-gray-700"
            >
              <div className="text-3xl text-blue-400 mb-3">{feature.icon}</div>
              <h3 className="text-xl text-black font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-screenb bg-[#015289]   shadow-xl text-white flex flex-col md:flex-row items-center p-14 m-10 rounded-lg">
        <div className="md:w-1/3 pr-10">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Easy enough for quick scans. <br /> Advanced enough for deep
            testing.
          </h1>
        </div>
        <div className="md:w-2/3 space-y-6">
          {newFeatures.map((newFeatures, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="mr-6 text-blue-800">{newFeatures.icon}</div>
              <div>
                <h2 className="text-xl font-semibold text-black">
                  {newFeatures.title}
                </h2>
                <p className="text-gray-800 mt-2">{newFeatures.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 w-full flex justify-center">
        <img
          src="https://pentest-tools.com/hero-grid-top.svg"
          alt="Web Security Scan"
          className="  w-full h-auto"
        />
      </div>

      <Footer />
    </div>
  );
}

export default GettingStarted;
