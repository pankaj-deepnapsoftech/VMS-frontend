/* eslint-disable no-irregular-whitespace */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { ModuleCard } from "./component/ModuleCard";
import { AlertTriangle, Box, Brain, Building, Database, FileBarChart, Link, ShieldIcon, TestTube, Users } from "lucide-react";
import { NumberedSection } from "./component/NumberedSection";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination'



const GettingStarted = () => {

  const features = [
    {
      number: "01",
      title: "Intelligent API Discovery",
      description: `Automatically detects and classifies APIs and high-value endpoints to identify security risks.
Continuously monitors exposed APIs for misconfigurations, unauthorized access, and potential threats`
    },
    {
      number: "02",
      title: "Observability",
      description: "Continuously monitors and detects deviations in security posture for proactive risk management"
    },
    {
      number: "03",
      title: "Workflow Management",
      description: `Offers customizable dashboards, exception workflows, and ageing tracking for efficient vulnerability lifecycle management.
Automates risk-based prioritization, escalations, and team collaboration to accelerate remediation efforts.`

    },
    {
      number: "04",
      title: "Workflow-Driven Vulnerability Remediation ",
      description: "Automates and streamlines remediation processes, ensuring efficient and structured vulnerability resolution"
    },
    {
      number: "05",
      title: "Duplicate Detection",
      description: "Identifies and eliminates redundant vulnerabilities, reducing noise and improving remediation efficiency"
    },
    {
      number: "06",
      title: "Campaign Management",
      description: `Organizes and prioritizes security fixes into structured campaigns for systematic risk mitigation
Applies mass vulnerability fixes based on predefined categories, accelerating threat resolution
`
    },
  ]

  return (
    <>
      <Header />
      {/* Premium Security */}
      <div className="bg-gradient-to-r from-[#0D1421] to-[#0D3A78] text-white py-12 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute top-[35%] -translate-y-[50%] left-[700px] ">
          <div className="flex flex-col items-center justify-center">
            <img
              src="/logo.png"
              alt="Scalable Image"
              style={{ width: "400px", height: "auto" }}
            />
            <span className="text-7xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Secure&
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-20 relative z-10 flex flex-col h-full">



          <div className="flex flex-col lg:flex-row items-start lg:items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              {/* Main content */}
              <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl  text-white leading-tight mb-6">
                AI Powered Risk Prioritization and Remediation Platform
              </h1>

              <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10">
                Enhance security with our intelligent AI-driven platform that
                identifies, prioritizes, and remediates risks efficiently.
                Streamline threat management, reduce vulnerabilities, and
                safeguard your business with actionable insights and automated
                solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 font-semibold">
                <a
                  href="/sign-up"
                  className="bg-white text-black hover:bg-gray-200 rounded-md px-8 py-2 text-base "
                >
                  TRY SECURE&
                </a>
                <button
                  className="border-white text-white hover:bg-white/10 rounded-md px-8 py-2 text-base "
                >
                  TALK TO US
                </button>
              </div>
            </div>
          </div>

          {/* Stats section */}
          {/* <div className="mt-auto pt-16 md:pt-24">
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
          </div> */}
        </div>


      </div>

      {/* third section */}
      <div className="p-10 mt-16 flex flex-col  items-center md:items-start gap-10 justify-center">



        {/* Right Section */}
        <div className="flex-1 text-center">
          <h3 className="text-4xl md:text-5xl leading-tight px-4 uppercase font-semibold ">
            Approach To Ai Powered Risk Prioritization  And Remediation Platform
          </h3>

          <p className="mt-2 text-gray-400">
            SECURE& tools will offer key features that set them apart from competitors, providing unique solutions to address real-time challenges faced by enterprises of all sizes, from small businesses to large corporations.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/main.png"
              alt="Security Dashboard"
              className="w-full  object-contain"
            />
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

        {/* Security Modules Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Modules</h2>
            <p className="text-xl text-gray-600">Comprehensive security solutions for your enterprise</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModuleCard
              icon={Users}
              title="Persona based Dashboarding"
            />
            <ModuleCard
              icon={Link}
              title="Integration with Security Assessment tools"
            />
            <ModuleCard
              icon={Database}
              title="Critical Asset/ API Discovery & Inventory"
            />
            <ModuleCard
              icon={Box}
              title="Blackbox Scans"
            />
            <ModuleCard
              icon={TestTube}
              title="Automated Pen Test Platform"
            />
            <ModuleCard
              icon={Brain}
              title="AI Powered Remediation Factory"
            />
            <ModuleCard
              icon={ShieldIcon}
              title="Application and Infrastructure Vulnerability platform"
            />
            <ModuleCard
              icon={AlertTriangle}
              title="Risk Exceptions"
            />
            <ModuleCard
              icon={FileBarChart}
              title="Risk & Vulnerability Scorecard"
            />
            <ModuleCard
              icon={Building}
              title="Business Group Security Ratings"
            />
          </div>
        </div>

        {/* Platform Overview Image */}

      </div>


      {/* testing */}

      <div className=" bg-gray-50">


        {/* Numbered Sections */}
        <div className="bg-gray-50 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key features ( Differentiators )</h2>
          </div>
          <div className=" mx-auto px-4">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {features.map((item, index) => (
                <SwiperSlide key={index}>
                  <NumberedSection
                    number={item.number}
                    title={item.title}
                    description={item.description}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>




      {/* Continuous and Scalable */}
      <div className="bg-black text-white py-16 px-6">
        <div className="text-center container">
          <h1 className="text-3xl md:text-5xl leading-tight px-4 lowercase ">
            Secure& – APPROACH TO AI POWERED RISK PRIORITIZATION AND REMEDIATION PLATFORM

          </h1>
          <p className="text-md md:text-md px-24 mt-4 text-gray-400">
            Discover, assess, prioritize, and patch critical vulnerabilities and reduce cybersecurity risk in real time across your global hybrid Cloud, IT, OT, and IoT landscape — all from a single platform
            SECURE& platform offers key features that set them apart from competitors, providing unique solutions to address real-time challenges faced by enterprises of all sizes, from small businesses to large corporations.
          </p>
        </div>
        <div className="p-10 flex flex-col md:flex-row items-center md:items-start gap-20">
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
          <div className="flex-1 max-w-lg items-center justify-center">
            <h3 className="text-lg font-semibold md:pt-32">
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
          <div className="flex-1 max-w-lg md:pt-32">
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
        </div>
        <div className="p-10 flex flex-col md:flex-row items-center md:items-start justify-center ">

          {/* Right Section */}
          <div className="flex-1 ">
            <h2 className="text-xl font-semibold uppercase text-center">
              Discover and Resolve with Secure&
            </h2>
            <p className="mt-4 text-gray-400 text-center ">
              Gain complete visibility and control over your security operations with an intuitive dashboard that brings all essential insights to one place.
              Our platform is designed for ease of use—enabling teams to monitor, assess, and address vulnerabilities without any technical roadblocks.
            </p>
            <img
              sizes="(max-width: 621px) 100vw, 621px"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      {/* Complete Offensive Security
      <div className="px-16 py-16 container mx-auto flex flex-wrap justify-center gap-10">
        <h1 className="text-4xl md:text-4xl font-bold leading-tight">
          Complete Offensive Security
        </h1>
        <p className="text-center">
        Secure& delivers expert-driven penetration testing across your entire digital infrastructure. From dynamic testing to social engineering, our advanced methodologies provide real-time risk insights and rapid remediation—helping you secure today and prepare for tomorrow.
        </p>
        <Accordion />
      </div> */}

      {/* Elevate Security with Ethical Hackers */}
      {/* <div className="px-16 py-16 container mx-auto flex flex-wrap justify-center gap-10">
        <h1 className="text-4xl md:text-4xl font-bold leading-tight">
          Elevate Security with Ethical Hackers
        </h1>
        <p className="text-center">
          Trust in Secure&&apos;s ethical hackers experts whose identities are
          safeguarded through a rigorous verification process. These
          professionals offer a unique blend of skills, certificactions and
          mentorship.
        </p>
        <div className="container">
          <Slider {...settings2}>
            <div className="max-w-md pl-4 overflow-hidden rounded-lg shadow-lg">
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
      </div> */}


      {/* <div className="min-h-screen bg-gray-950 text-white">
        
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold text-center mb-6">
            Meet those who trust in us
          </h1>
          <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto">
            Explore the stories of the individuals we work for and how they&apos;ve
            transformed their digital security. Authentic testimonials that
            inspire trust and reflect the dedication we put into our work.
          </p>
        </div>

       
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
      </div> */}


      {/* <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-normal mb-10">Compliance</h1>

        <div className="border-t border-gray-200 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-normal">Legal</h2>
            </div>

            <div className="md:col-span-3">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Secure&.io&apos;s comprehensive legal framework ensures transparency
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
                Secure&.io&apos;s comprehensive legal framework ensures transparency
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
                Secure&.io&apos;s comprehensive legal framework ensures transparency
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
                Secure&.io&apos;s comprehensive legal framework ensures transparency
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
                Secure&.io&apos;s comprehensive legal framework ensures transparency
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
      </div> */}



      <div className="max-w-6xl mx-auto grid grid-cols-1 py-24 md:grid-cols-2 gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-2xl lg:text-5xl mb-2">
            Ready to get started?
          </h2>
          <p className="text-gray-400 pt-4">
            Kickstart your journey with our powerful AI-driven security platform — simple, fast, and effective.
          </p>
        </div>
        <div className="text-center md:text-right font-semibold">
          <a
            href="/sign-up"
            className="bg-black text-white hover:bg-black hover:text-white rounded-md px-6 py-2 text-base "
          >
            TRY SECURE&
          </a>
          <button
            className="border-black text-black hover:bg-black/10 hover:text-white rounded-md ml-4 px-6 py-2 text-base "
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
