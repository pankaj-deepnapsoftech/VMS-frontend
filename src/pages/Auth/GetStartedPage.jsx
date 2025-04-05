import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Accordion from "./component/Accordion";
import Header from "./component/Header";
import Footer from "./component/Footer";

import { Award, Trophy, ArrowUpRight } from "lucide-react";

const GettingStarted = () => {
  const testimonials = [
    {
      company: "Curai Health",
      logo: "https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b4e5d3f70a5951c37504bc_curai.svg",
      quote: "Great service for Pymes",
      content:
        "Secure& offers an affordable, high-quality technical security review service for SMEs.",
      author: "Melody Pereira",
      role: "CISO at Curai Health",
      image:
        "https://cdn.prod.website-files.com/6554cc6279901fa…b87317/66b4e55df7ca29779eafaf01_melody-p-500.avif",
    },
    {
      company: "Profesional Cosmetics",
      logo: "https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b4e79877bc409c489a3af0_cosmetics.svg",
      quote: "Fast and quality service",
      content:
        "Working with Secure& was easy and fast. They gave us peace of mind when analyzing the systems and equipment.",
      author: "Óscar Trias",
      role: "CEO at Profesional Cosmetics",
      image:
        "https://cdn.prod.website-files.com/6554cc6279901fa…7/66b4e7627cfb8f840b0e0731_oscar-trias-p-500.avif",
    },
  ];

  // for second section
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Header />
      {/* Premium Security */}
      <div className="bg-gradient-to-r from-[#0D1421] to-[#0D3A78] text-white py-12 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute top-0 left-[700px]">
          <img src="/home.png" className="" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-20 relative z-10 flex flex-col h-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              {/* Main content */}
              <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl  text-white leading-tight mb-6">
                AI powered Risk Prioritization and Remediation platform
              </h1>

              <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10">
                Enhance security with our intelligent AI-driven platform that
                identifies, prioritizes, and remediates risks efficiently.
                Streamline threat management, reduce vulnerabilities, and
                safeguard your business with actionable insights and automated
                solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/sign-in"
                  className="bg-white text-black hover:bg-gray-200 rounded-md px-8 py-2 text-base font-medium"
                >
                  TRY SECURE&
                </a>
                <button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-md px-8 py-2 text-base font-medium"
                >
                  TALK TO US
                </button>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-auto pt-16 md:pt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                  +32,000
                </h2>
                <p className="text-gray-400">Vulnerabilities found</p>
              </div>
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                  +150
                </h2>
                <p className="text-gray-400">Hackers onboard</p>
              </div>
              <div className="text-center md:text-right">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                  1,200
                </h2>
                <p className="text-gray-400">Tests per year</p>
              </div>
            </div>
          </div>
        </div>

        {/* <h2 className="text-2xl font-semibold text-center">
          Our ethical hackers belong to the Hall of Fame of companies like
        </h2>

        <div className="mt-8">
          <Slider {...settings}>
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b36090f7435929c39b2d51_salesforce.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b36090f7435929c39b2d30_yahoo.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b36090f7435929c39b2d04_yazoo.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ff7435929c39b2cea_vm.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ff7435929c39b2cd8_twitter.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ff7435929c39b2ca4_wasp.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ff7435929c39b2c73_sun.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ff7435929c39b2c18_redhat.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ef7435929c39b2b2b_videowidget.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ef7435929c39b2b1b_paypal.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ef7435929c39b2b14_microsoft.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ef7435929c39b2b10_sony.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ef7435929c39b2b01_markt.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ef7435929c39b2afd_oracle.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ef7435929c39b2ad7_meta.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ef7435929c39b2ad2_firefox.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ef7435929c39b2ace_goldmansachs.svg"
              width="300"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608ef7435929c39b2aca_facebook.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608df7435929c39b2ac2_github.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608df7435929c39b2abe_google.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608df7435929c39b2aba_Adobe.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608df7435929c39b2ab2_cobalt.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608df7435929c39b2a9c_Dell.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608df7435929c39b2a98_amazon.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608df7435929c39b2a86_epic.svg"
              className="h-12 mx-auto"
            />
            <img
              src="https://cdn.prod.website-files.com/6554cc6279901fa455b87317/66b3608cf7435929c39b2a53_apple.svg"
              className="h-12 mx-auto"
            />
          </Slider>
        </div> */}
      </div>

      {/* third section */}
      <div className="p-10 mt-16 flex flex-col md:flex-row items-center md:items-start gap-10 justify-center">
        {/* Left Section */}
        <div className="flex-1 max-w-lg">
          <img
            src="/main.png"
            alt="Scalable Image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 max-w-lg">
          <h3 className="text-4xl md:text-5xl leading-tight px-4">
            Pentesting Made Simple with Secure&
          </h3>

          <p className="mt-2 text-gray-400">
            Secure& offers you comprehensive penetration testing and regulatory
            compliance, simplifying year-round security management. Scale your
            team and remediate smarter with our PtaaS solution, ensuring fast
            and proactive security across all attack surfaces.
          </p>
        </div>
      </div>

      {/* Talent at your fingertips */}
      <div className="min-h-screen bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white p-8">
              <div className="text-[120px] font-bold text-gray-900 leading-none">
                01
              </div>
              <h3 className="mt-6 text-3xl font-semibold leading-tight text-gray-900">
                Expert Talent, On-Demand
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Instant access to a global network of vetted pentesters
                specializing in your tech stack.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8">
              <div className="text-[120px] font-bold text-gray-900 leading-none">
                02
              </div>
              <h3 className="mt-6 text-3xl font-semibold leading-tight text-gray-900">
                Always Secure, Always in Control
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Our 24/7 guidance helps you remediate vulnerabilities quickly,
                ensuring continuous security without disrupting operations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8">
              <div className="text-[120px] font-bold text-gray-900 leading-none">
                03
              </div>
              <h3 className="mt-6 text-3xl font-semibold leading-tight text-gray-900">
                Proactive Risk Reduction
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                We detect and report security breaches in real-time, stopping
                threats before they impact your business. <br />
                Upgrade your cybersecurity strategy with Secure&'s intelligent,
                scalable PtaaS solution—because security should be seamless,
                smart, and stress-free.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continuous and Scalable */}
      <div className="bg-black text-white py-16 px-6">
        <div className="text-center container">
          <h1 className="text-4xl md:text-6xl leading-tight px-4">
          Secure& – Continuous & Scalable Security Testing
          </h1>
          <p className="text-md md:text-md px-24 mt-4 text-gray-400">
            Secure&'s platform enables you to enlist top-tier ethical hackers,
            providing assistance in pinpointing, managing, and resolving the
            most critical vulnerabilities within your enterprise.Strengthen your cybersecurity with Secure&'s next-gen Pentest as a Service (PtaaS). Our platform connects you with top-tier ethical hackers to identify, manage, and remediate critical vulnerabilities efficiently—ensuring continuous, scalable security for your enterprise.
          </p>
        </div>
        <div className="p-10 flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left Section */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-xl font-semibold uppercase">
            Revolutionizing Pentesting
            </h2>
            <p className="mt-4 mb-10 text-gray-400">
              Say farewell to the tedious back-and-forth of traditional
              pentesting. With Secure&, the flow of information is streamlined.
            </p>
            <img
              sizes="(max-width: 621px) 100vw, 621px"
             src="/main.png"
              alt="Scalable Image"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>

          {/* Right Section */}
          <div className="flex-1 max-w-lg">
            <h3 className="text-lg font-semibold">
            No More Tedious Back-and-Forth – 
            </h3>
            <p className="mt-2 text-gray-400">
            Streamlined communication for faster security testing.
            </p>
            <h3 className="mt-6 text-lg font-semibold">
            Seamless, Efficient & Secure 
            </h3>
            <p className="mt-2 text-gray-400">
            – Define your scope, choose an expert, and get optimized results.
            </p>
          </div>
        </div>
        <div className="p-10 flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left Section */}
          <div className="flex-1 max-w-lg">
            <h3 className="text-lg font-semibold">
            Real-Time Compliance Reports 
            </h3>
            <p className="mt-2 text-gray-400">
            Gain clear insights with enriched data analysis.
            </p>
            <h3 className="mt-6 text-lg font-semibold">
            Effortless Vulnerability Management 
            </h3>
            <p className="mt-2 text-gray-400">
            – A dedicated space to track, manage, and resolve threats effectively.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-xl font-semibold uppercase">
              Discover and Resolve with Secure&
            </h2>
            <p className="mt-4 text-gray-400">
              Benefit from streamlined management with a user-friendly
              dashboard, simplified reports, and an efficient space for managing
              vulnerabilities.
            </p>
            <img
              sizes="(max-width: 621px) 100vw, 621px"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      {/* Complete Offensive Security */}
      <div className="px-16 py-16 container mx-auto flex flex-wrap justify-center gap-10">
        <h1 className="text-4xl md:text-4xl font-bold leading-tight">
          Complete Offensive Security
        </h1>
        <p className="text-center">
        Secure& delivers expert-driven penetration testing across your entire digital infrastructure. From dynamic testing to social engineering, our advanced methodologies provide real-time risk insights and rapid remediation—helping you secure today and prepare for tomorrow.
        </p>
        <Accordion />
      </div>

      {/* Elevate Security with Ethical Hackers */}
      <div className="px-16 py-16 container mx-auto flex flex-wrap justify-center gap-10">
        <h1 className="text-4xl md:text-4xl font-bold leading-tight">
          Elevate Security with Ethical Hackers
        </h1>
        <p className="text-center">
          Trust in Secure&'s ethical hackers experts whose identities are
          safeguarded through a rigorous verification process. These
          professionals offer a unique blend of skills, certificactions and
          mentorship.
        </p>
        <div className="container">
          <Slider {...settings2}>
            <div className="max-w-md pl-4 overflow-hidden rounded-lg shadow-lg">
              {/* Header Section */}
              <div className="p-6 bg-[#111827] text-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">ENGLISH</span>
                  <span className="px-4 py-1 text-sm bg-white text-gray-700 rounded-full">
                    GMT +2
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-3">Groot Cipher</h1>
                <p className="text-sm">
                  Listed at more than 100 companies hacker&apos;s hall of fame.
                </p>
                <p className="text-sm">
                  Ranked as one of top 50th hackers (All time) at hackerone.
                </p>
              </div>

              {/* Content Section */}
              <div className="p-6 bg-white">
                <h2 className="text-xl font-semibold mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    HTML
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    CSS
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    JavaScript
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    Node.js
                  </span>
                </div>
                <p className="text-gray-600 mb-6">And more...</p>
                <div className="flex gap-4 mb-8">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CERTIFICATIONS</p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2">
                      <Award className="text-indigo-900" />
                      <span className="text-xl font-semibold">0</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">HALL OF FAME</p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2">
                      <Trophy className="text-indigo-900" />
                      <span className="text-xl font-semibold">41</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="flex items-center gap-1 font-medium">
                    FULL PROFILE <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-md pl-4 overflow-hidden rounded-lg shadow-lg">
              {/* Header Section */}
              <div className="p-6 bg-[#111827] text-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">ENGLISH</span>
                  <span className="px-4 py-1 text-sm bg-white text-gray-700 rounded-full">
                    GMT +2
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-3">Groot Cipher</h1>
                <p className="text-sm">
                  Listed at more than 100 companies hacker&apos;s hall of fame.
                </p>
                <p className="text-sm">
                  Ranked as one of top 50th hackers (All time) at hackerone.
                </p>
              </div>

              {/* Content Section */}
              <div className="p-6 bg-white">
                <h2 className="text-xl font-semibold mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    HTML
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    CSS
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    JavaScript
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    Node.js
                  </span>
                </div>
                <p className="text-gray-600 mb-6">And more...</p>
                <div className="flex gap-4 mb-8">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CERTIFICATIONS</p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2">
                      <Award className="text-indigo-900" />
                      <span className="text-xl font-semibold">0</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">HALL OF FAME</p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2">
                      <Trophy className="text-indigo-900" />
                      <span className="text-xl font-semibold">41</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="flex items-center gap-1 font-medium">
                    FULL PROFILE <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-md pl-4 overflow-hidden rounded-lg shadow-lg">
              {/* Header Section */}
              <div className="p-6 bg-[#111827] text-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">ENGLISH</span>
                  <span className="px-4 py-1 text-sm bg-white text-gray-700 rounded-full">
                    GMT +2
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-3">Groot Cipher</h1>
                <p className="text-sm">
                  Listed at more than 100 companies hacker&apos;s hall of fame.
                </p>
                <p className="text-sm">
                  Ranked as one of top 50th hackers (All time) at hackerone.
                </p>
              </div>

              {/* Content Section */}
              <div className="p-6 bg-white">
                <h2 className="text-xl font-semibold mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    HTML
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    CSS
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    JavaScript
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    Node.js
                  </span>
                </div>
                <p className="text-gray-600 mb-6">And more...</p>
                <div className="flex gap-4 mb-8">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CERTIFICATIONS</p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2">
                      <Award className="text-indigo-900" />
                      <span className="text-xl font-semibold">0</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">HALL OF FAME</p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2">
                      <Trophy className="text-indigo-900" />
                      <span className="text-xl font-semibold">41</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="flex items-center gap-1 font-medium">
                    FULL PROFILE <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-md pl-4 overflow-hidden rounded-lg shadow-lg">
              {/* Header Section */}
              <div className="p-6 bg-[#111827] text-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">ENGLISH</span>
                  <span className="px-4 py-1 text-sm bg-white text-gray-700 rounded-full">
                    GMT +2
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-3">Groot Cipher</h1>
                <p className="text-sm">
                  Listed at more than 100 companies hacker&apos;s hall of fame.
                </p>
                <p className="text-sm">
                  Ranked as one of top 50th hackers (All time) at hackerone.
                </p>
              </div>

              {/* Content Section */}
              <div className="p-6 bg-white">
                <h2 className="text-xl font-semibold mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    HTML
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    CSS
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    JavaScript
                  </span>
                  <span className="px-4 py-1 border border-gray-300 rounded-full text-gray-700">
                    Node.js
                  </span>
                </div>
                <p className="text-gray-600 mb-6">And more...</p>
                <div className="flex gap-4 mb-8">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CERTIFICATIONS</p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2">
                      <Award className="text-indigo-900" />
                      <span className="text-xl font-semibold">0</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">HALL OF FAME</p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2">
                      <Trophy className="text-indigo-900" />
                      <span className="text-xl font-semibold">41</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="flex items-center gap-1 font-medium">
                    FULL PROFILE <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      {/* Meet those who trust in us */}
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold text-center mb-6">
            Meet those who trust in us
          </h1>
          <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto">
            Explore the stories of the individuals we work for and how they've
            transformed their digital security. Authentic testimonials that
            inspire trust and reflect the dedication we put into our work.
          </p>
        </div>

        {/* Testimonials Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-blue-500 transition-all"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.logo}
                    alt={testimonial.company}
                    className="w-24 h-10"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">{testimonial.quote}</h3>
                <p className="text-gray-400 mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-normal mb-10">Compliance</h1>

        <div className="border-t border-gray-200 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-normal">Legal</h2>
            </div>

            <div className="md:col-span-3">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Secure&.io's comprehensive legal framework ensures transparency
                and accountability, with clear terms and conditions prioritizing
                the protection of both clients and ethical hackers. Data
                Confidentiality, Integrity, and Availability. Stringent data
                protection protocols at Secure&.io guarantee the utmost care and
                respect for client information, maintaining its confidentiality,
                integrity, and availability.
              </p>

              <a
                href="#"
                className="inline-flex items-center text-black font-medium tracking-wide hover:underline"
              >
                KNOW MORE <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-normal">Legal</h2>
            </div>

            <div className="md:col-span-3">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Secure&.io's comprehensive legal framework ensures transparency
                and accountability, with clear terms and conditions prioritizing
                the protection of both clients and ethical hackers. Data
                Confidentiality, Integrity, and Availability. Stringent data
                protection protocols at Secure&.io guarantee the utmost care and
                respect for client information, maintaining its confidentiality,
                integrity, and availability.
              </p>

              <a
                href="#"
                className="inline-flex items-center text-black font-medium tracking-wide hover:underline"
              >
                KNOW MORE <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-normal">Legal</h2>
            </div>

            <div className="md:col-span-3">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Secure&.io's comprehensive legal framework ensures transparency
                and accountability, with clear terms and conditions prioritizing
                the protection of both clients and ethical hackers. Data
                Confidentiality, Integrity, and Availability. Stringent data
                protection protocols at Secure&.io guarantee the utmost care and
                respect for client information, maintaining its confidentiality,
                integrity, and availability.
              </p>

              <a
                href="#"
                className="inline-flex items-center text-black font-medium tracking-wide hover:underline"
              >
                KNOW MORE <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-normal">Legal</h2>
            </div>

            <div className="md:col-span-3">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Secure&.io's comprehensive legal framework ensures transparency
                and accountability, with clear terms and conditions prioritizing
                the protection of both clients and ethical hackers. Data
                Confidentiality, Integrity, and Availability. Stringent data
                protection protocols at Secure&.io guarantee the utmost care and
                respect for client information, maintaining its confidentiality,
                integrity, and availability.
              </p>

              <a
                href="#"
                className="inline-flex items-center text-black font-medium tracking-wide hover:underline"
              >
                KNOW MORE <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-normal">Legal</h2>
            </div>

            <div className="md:col-span-3">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Secure&.io's comprehensive legal framework ensures transparency
                and accountability, with clear terms and conditions prioritizing
                the protection of both clients and ethical hackers. Data
                Confidentiality, Integrity, and Availability. Stringent data
                protection protocols at Secure&.io guarantee the utmost care and
                respect for client information, maintaining its confidentiality,
                integrity, and availability.
              </p>

              <a
                href="#"
                className="inline-flex items-center text-black font-medium tracking-wide hover:underline"
              >
                KNOW MORE <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Secure& Blog */}

      <div className="max-w-6xl mx-auto grid grid-cols-1 py-24 md:grid-cols-2 gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-2xl lg:text-5xl mb-2">
            Ready to get started?
          </h2>
          <p className="text-gray-400 pt-4">
            Elevate your security with Secure&'s expert pentesting platform
            today
          </p>
        </div>
        <div className="text-center md:text-right">
          <a
            href="/sign-in"
            className="bg-black text-white hover:bg-black hover:text-white rounded-md px-6 py-2 text-base font-medium"
          >
            TRY SECURE&
          </a>
          <button
            variant="outline"
            className="border-black text-black hover:bg-black/10 hover:text-white rounded-md ml-4 px-6 py-2 text-base font-medium"
          >
            TALK TO US
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GettingStarted;
