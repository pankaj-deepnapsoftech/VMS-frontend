/* eslint-disable no-irregular-whitespace */
import Header from "@/pages/Auth/component/Header";
import Footer from "@/pages/Auth/component/Footer";
import { DownloadIcon } from "lucide-react";
// import BookDemo from "../BookDemo";
import useBookDemo from "@/hooks/BookDemo";

const Solutions = () => {
  const {isOpen,openModal,closeModal} = useBookDemo()
  return (
    <div className="font-poppins">
      <Header openModal={openModal} />
      {/* Section 1: Header */}
      <section className="bg-gradient-to-b from-[#343537] to-[#17181a] text-white pt-32 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 flex gap-10">
              AI POWERED RISK PRIORITIZATION AND REMEDIATION PLATFORM
              <a
                href="/assets/test.docx"
                title="Download"
                download={true}
                className="flex items-center justify-center gap-3 px-1 pt-1 mt-auto bg-gradient-to-t from-[#383b40] to-gray-500 text-xl rounded-[50%] md:rounded-full relative h-16 w-44 overflow-hidden text-white shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 hover:before:h-64 hover:before:-translate-y-32 before:z-0"
              >
                <span className="relative md:top-[2px] z-10 ">
                  <DownloadIcon size={30} />
                </span>
                <span className="z-10 hidden md:inline">Download</span>
              </a>
            </h1>
            <div className="bg-blue-300 h-1 w-full my-6"></div>
            <p className="text-md">
              Discover, assess, prioritize, and patch critical vulnerabilities
              and reduce cybersecurity risk in real time across your global
              hybrid Cloud, IT, OT, and IoT landscape — all from a single
              platform
            </p>
            <br />
            <p className="text-md">
              <span className="text-[16px] font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
                SECURE&
              </span>{" "}
              platform offers key features that set them apart from competitors,
              providing unique solutions to address real- time challenges faced
              by enterprises of all sizes, from small businesses to large
              corporations.
            </p>
          </div>

          <div className="flex justify-center my-10">
            <img src="/sol1.png" alt="Diagram" className="w-full max-w-xl " />
          </div>
          <p className="text-md my-8">
            Next Generation AI powered solution that helps organizations
            identify, manage, analyse, prioritize, and eliminate vulnerabilities
            with ease :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
            <ul className="list-disc list-inside space-y-2">
              <li className="text-gray-300 ">
                {" "}
                <span className="text-white font-bold  pr-2">Discovery :</span>{" "}
                Identification of assets, systems, and applications / APIs to
                scan and monitor.
              </li>
              <li className="text-gray-300 ">
                <span className="text-white font-bold pr-2"> Assessment :</span>{" "}
                Identification of assets, systems, and applications / APIs to
                scan and monitor.
              </li>
              <li className="text-gray-300">
                <span className="text-white font-bold  pr-2">
                  AI penetration test platform :
                </span>
                work with AI powered penetration test platform to perform
                exploitations with ease and high accuracy.
              </li>
              <li className="text-gray-300">
                <span className="text-white font-bold  pr-2">Prioritization :</span>{" "}
                Risk-based prioritization of vulnerabilities based on
                criticality and business impact.
              </li>
            </ul>

            <ul className="list-disc list-inside space-y-2">
              <li className="text-gray-300">
                <span className="text-white font-bold  pr-2">Remediation :</span>
                Determine AI based remediation insights, identify implementation
                plans for fixes such as patches, updates, or configuration
                changes.
              </li>
              <li className="text-gray-300">
                <span className="text-white font-bold  pr-2">Verification :</span>
                Ensuring that the applied fixes have addressed the
                vulnerabilities.
              </li>
              <li className="text-gray-300">
                <span className="text-white font-bold  pr-2">Monitoring :</span>
                Continuous surveillance of the environment for new
                vulnerabilities or threat
              </li>
              <li className="text-gray-300">
                <span className="text-white font-bold  pr-2">Management Scorecard :</span>
                Determine Risk based scorecard for each application, API or
                infrastructure item with Industry built Business Ratings .
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Analytics */}
      <section className="bg-gradient-to-b from-[#343537] to-[#17181a] text-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-3xl font-semibold mb-4">
                Integration with ITSM and CMDB accelerates risk reduction across
                the enterprise
              </h2>

              <p className="text-md">
                <span className="text-[16px] font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
                  SECURE&
                </span>{" "}
                integrates seamlessly with IT Service Management (ITSM) systems
                and configuration management databases (CMDB), enabling rapid
                discovery, prioritization, and remediation of vulnerabilities at
                scale to mitigate risk. Its close integration with ITSM
                platforms like ServiceNow and Jira streamlines and automates
                vulnerability management, ensuring smooth collaboration between
                IT and Security teams across the enterprise.
              </p>

              <p className="text-md my-6">
                With{" "}
                <span className="text-[16px] text-gray-300 font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
                  SECURE&
                </span>{" "}
                , you get a risk-based vulnerability management solution that
                prioritizes vulnerabilities, misconfigurations, assets, and
                groups of assets based on risk, reduces risk by providing
                technology specific AI based remediations to help fix
                vulnerabilities at scale, and helps organizations measure
                security program effectiveness by tracking risk reduction over
                time.
              </p>
              <h2 className="text-2xl font-bold pt-8">
                Automates workflows to reduce risks at scale
              </h2>

              <p className="text-md my-4">
                <span className="text-[16px] text-gray-300 font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
                  SECURE&
                </span>{" "}
                brings together all the key elements of an effective
                vulnerability management program into a single service unified
                by powerful no-code orchestration workflows out of the box. From
                asset discovery to risk-based assessment to prioritize and
                remediate, Secure& automates the entire process and
                significantly accelerates an organization’s ability to respond
                to threats, thus preventing possible exploitation.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <img src="/sol2.png" alt="Chart 1" className="rounded shadow" />
              <img src="/sol3.png" alt="Chart 2" className="rounded shadow" />
              <img src="/sol4.png" alt="Chart 3" className="rounded shadow" />
              {/* <img src="/sol5.png" alt="Chart 4" className="rounded shadow" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Benefits */}
      <section className="bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto h-auto">
          <h2 className="text-3xl text-gray-200 font-bold text-center mb-5">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              {" "}
              Secure&
            </span>{" "}
            Benefits
          </h2>

          <p className="text-center mb-14 text-md max-w-3xl mx-auto">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Secure&amp;
            </span>{" "}
            tools will offer key features that set them apart from competitors,
            providing unique solutions to address real-time challenges faced by
            enterprises of all sizes, from small businesses to large
            corporations.
          </p>

          {/* Desktop Layout */}
          <div className="relative hidden md:flex justify-center items-center h-[420px] mb-10">
            {/* Center Circle */}
            <div className="absolute  border-4 border-[#3aa3dbbe]  rounded-full h-40 w-40 flex items-center justify-center z-10 mt-5">
              <img src="/logo.png" alt="Central" className="w-32 h-24" />
            </div>

            {/* Feature Boxes - Around the Circle */}
            {[
              {
                className: "left-[20%] top-[3%]",
                number: 1,
                title: "Workflow-Driven Remediation",
                desc: "Automate fixes, streamline operations.",
              },

              {
                className: "right-[20%] top-[3%]",
                number: 2,
                title: "Observability",
                desc: "Detect deviations in security posture.",
              },
              {
                className: "left-[12%] top-[39%]",
                number: 3,
                title: " Intelligent API & Endpoint Discovery",
                desc: "Detects APIs and endpoints, monitors for misconfigurations.",
              },
              {
                className: "right-[12%] top-[39%]",
                number: 4,
                title: "Workflow-Driven Vulnerability Mgmt",
                desc: "Track & manage vulnerabilities efficiently.",
              },

              {
                className: "left-[20%] top-[75%]",
                number: 5,
                title: "Remediation Campaigns",
                desc: "Structured, automated remediation workflows.",
              },
              {
                className: "right-[20%] top-[75%] ",
                number: 6,
                title: "Duplicate Vulnerability Removal",
                desc: "Eliminate redundant vulnerabilities.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`absolute ${item.className} flex flex-col items-center text-center w-48`}
              >
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 shadow-md p-3 rounded-2xl text-sm w-96 h-28">
                  <div className="bg-[#26272b] font-bold w-12 h-12 flex items-center justify-center rounded-xl mb-4 shadow-inner shadow-slate-950 ">
                    {item.number}
                  </div>
                  <div className="pl-10  -mt-12">
                    <strong className="text-[15px] text-bold">
                      {item.title}
                    </strong>
                    <br />
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="block md:hidden px-4 space-y-6 mb-10">
  <div className="flex justify-center mb-6">
    <img src="/logo.png" alt="Central" className="w-36 h-28" />
  </div>
  {[
    {
      number: 1,
      title: "Workflow-Driven Remediation",
      desc: "Automate fixes, streamline operations.",
    },
    {
      number: 2,
      title: "Observability",
      desc: "Detect deviations in security posture.",
    },
    {
      number: 3,
      title: " Intelligent API & Endpoint Discovery",
      desc: "Detects APIs and endpoints, monitors for misconfigurations.",
    },
    {
      number: 4,
      title: "Workflow-Driven Vulnerability Mgmt",
      desc: "Track & manage vulnerabilities efficiently.",
    },
    {
      number: 5,
      title: "Remediation Campaigns",
      desc: "Structured, automated remediation workflows.",
    },
    {
      number: 6,
      title: "Duplicate Vulnerability Removal",
      desc: "Eliminate redundant vulnerabilities.",
    },
  ].map((item, index) => (
    <div
      key={index}
      className="bg-gradient-to-br from-gray-700 to-gray-800 shadow-md p-4 rounded-2xl"
    >
      <div className="flex items-center mb-2">
        <div className="bg-[#26272b] font-bold w-10 h-10 flex items-center justify-center rounded-xl shadow-inner shadow-slate-950 mr-4">
          {item.number}
        </div>
        <strong className="text-[15px]">{item.title}</strong>
      </div>
      <p className="text-sm text-gray-300 pl-14 -mt-2">{item.desc}</p>
    </div>
  ))}
</div>

        </div>
      </section>
      <Footer />
      {/* <BookDemo closeModal={closeModal} isOpen={isOpen} /> */}
    </div>
  );
};

export default Solutions;
