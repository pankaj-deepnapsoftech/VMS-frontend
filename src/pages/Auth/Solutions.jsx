/* eslint-disable no-irregular-whitespace */
import Header from "@/pages/Auth/component/Header";
import Footer from "@/pages/Auth/component/Footer";
import { DownloadIcon } from "lucide-react";

const Solutions = () => {
  return (
    <div className="font-poppins">
      <Header />
      {/* Section 1: Header */}
      <section className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 flex gap-10">
              AI POWERED RISK PRIORITIZATION AND REMEDIATION PLATFORM
              <a href="/assets/test.docx" title="Download " download={true} className=" flex px-2 pt-1 rounded-full" ><DownloadIcon/></a>
            </h1>
            <div className="bg-blue-300 h-1 w-full my-6"></div>
            <p className="text-sm">
              Discover, assess, prioritize, and patch critical vulnerabilities
              and reduce cybersecurity risk in real time across your global
              hybrid Cloud, IT, OT, and IoT landscape — all from a single
              platform
            </p>
            <br />
            <p className="text-sm">
              <span className="text-blue-300 text-md">SECURE&</span> platform
              offers key features that set them apart from competitors,
              providing unique solutions to address real- time challenges faced
              by enterprises of all sizes, from small businesses to large
              corporations.
            </p>
          </div>

          <div className="flex justify-center my-10">
            <img src="/sol1.png" alt="Diagram" className="w-full max-w-xl " />
          </div>
          <p className="text-sm my-8">
            Next Generation AI powered solution that helps organizations
            identify, manage, analyse, prioritize, and eliminate vulnerabilities
            with ease :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
            <ul className="list-disc list-inside space-y-2">
              <li className="text-gray-300 ">
                {" "}
                <span className="text-white pr-2">Discovery :</span>{" "}
                Identification of assets, systems, and applications / APIs to
                scan and monitor.
              </li>
              <li className="text-gray-300">
                <span className="text-white pr-2"> Assessment :</span>{" "}
                Identification of assets, systems, and applications / APIs to
                scan and monitor.
              </li>
              <li className="text-gray-300">
                <span className="text-white pr-2">
                  AI penetration test platform :
                </span>
                work with AI powered penetration test platform to perform
                exploitations with ease and high accuracy.
              </li>
              <li className="text-gray-300">
                <span className="text-white pr-2">Prioritization :</span>{" "}
                Risk-based prioritization of vulnerabilities based on
                criticality and business impact.
              </li>
            </ul>

            <ul className="list-disc list-inside space-y-2">
              <li className="text-gray-300">
                <span className="text-white pr-2">Remediation :</span>
                Determine AI based remediation insights, identify implementation
                plans for fixes such as patches, updates, or configuration
                changes.
              </li>
              <li className="text-gray-300">
                <span className="text-white pr-2">Verification :</span>
                Ensuring that the applied fixes have addressed the
                vulnerabilities.
              </li>
              <li className="text-gray-300">
                <span className="text-white pr-2">Monitoring :</span>
                Continuous surveillance of the environment for new
                vulnerabilities or threat
              </li>
              <li className="text-gray-300">
                <span className="text-white pr-2">Management Scorecard :</span>
                Determine Risk based scorecard for each application, API or
                infrastructure item with Industry built Business Ratings .
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Analytics */}
      <section className="bg-white text-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-3xl font-semibold mb-4">
                Integration with ITSM and CMDB accelerates risk reduction across
                the enterprise
              </h2>

              <p className="text-md">
                <span className="text-blue-500 text-md">SECURE&</span>{" "}
                integrates seamlessly with IT Service Management (ITSM) systems
                and configuration management databases (CMDB), enabling rapid
                discovery, prioritization, and remediation of vulnerabilities at
                scale to mitigate risk. Its close integration with ITSM
                platforms like ServiceNow and Jira streamlines and automates
                vulnerability management, ensuring smooth collaboration between
                IT and Security teams across the enterprise.
              </p>

              <p className="text-md my-8">
                With
                <span className="text-blue-500 text-md px-1">SECURE&</span>, you
                get a risk-based vulnerability management solution that
                prioritizes vulnerabilities, misconfigurations, assets, and
                groups of assets based on risk, reduces risk by providing
                technology specific AI based remediations to help fix
                vulnerabilities at scale, and helps organizations measure
                security program effectiveness by tracking risk reduction over
                time.
              </p>
              <h2 className="text-xl font-semibold mb-4">
                Automates workflows to reduce risks at scale
              </h2>

              <p className="text-md my-8">
                <span className="text-blue-500 text-md px-1">SECURE& </span>
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
      <section className="bg-gray-100 text-gray-900 py-12 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl font-semibold text-center mb-6">
      SECURE& Benefits
    </h2>
    <p className="text-center mb-10 text-sm max-w-3xl mx-auto">
      <span className="text-blue-600 font-semibold">SECURE&</span> tools
      will offer key features that set them apart from competitors,
      providing unique solutions to address real-time challenges faced by
      enterprises of all sizes, from small businesses to large
      corporations.
    </p>

    {/* Desktop Layout */}
    <div className="relative hidden md:flex justify-center items-center h-[420px] mb-10">
      {/* Center Circle */}
      <div className="absolute bg-blue-100 border-4 border-blue-100 rounded-full h-40 w-40 flex items-center justify-center z-10 mt-5">
        <img
          src="/logo.png"
          alt="Central"
          className="w-20 h-20"
        />
      </div>

      {/* Feature Boxes - Around the Circle */}
      {[
        {
          className: "top-0",
          title: "Intelligent API & Endpoint Discovery",
          desc: "Detects APIs and endpoints, monitors for misconfigurations."
        },
        {
          className: "right-[5%] top-[15%]",
          title: "Observability",
          desc: "Detect deviations in security posture."
        },
        {
          className: "right-[5%] bottom-[15%]",
          title: "Workflow-Driven Vulnerability Mgmt",
          desc: "Track and manage vulnerabilities efficiently."
        },
        {
          className: "bottom-0",
          title: "Duplicate Vulnerability Removal",
          desc: "Eliminate redundant vulnerabilities."
        },
        {
          className: "left-[5%] bottom-[15%]",
          title: "Remediation Campaigns",
          desc: "Structured, automated remediation workflows."
        },
        {
          className: "left-[5%] top-[15%]",
          title: "Workflow-Driven Remediation",
          desc: "Automate fixes, streamline operations."
        },
      ].map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.className} flex flex-col items-center text-center w-48`}
        >
          <div className="bg-white shadow-md p-3 rounded-md text-sm">
            <strong>{item.title}</strong>
            <br />
            {item.desc}
          </div>
        </div>
      ))}
    </div>

    {/* Mobile Layout */}
    <div className="flex flex-col gap-6 md:hidden items-center">
      <img src="/logo.png" alt="Central" className="w-20 h-20 mb-4" />
      {[
        {
          title: "Intelligent API & Endpoint Discovery",
          desc: "Detects APIs and endpoints, monitors for misconfigurations."
        },
        {
          title: "Observability",
          desc: "Detect deviations in security posture."
        },
        {
          title: "Workflow-Driven Vulnerability Mgmt",
          desc: "Track and manage vulnerabilities efficiently."
        },
        {
          title: "Duplicate Vulnerability Removal",
          desc: "Eliminate redundant vulnerabilities."
        },
        {
          title: "Remediation Campaigns",
          desc: "Structured, automated remediation workflows."
        },
        {
          title: "Workflow-Driven Remediation",
          desc: "Automate fixes, streamline operations."
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md p-4 rounded-md text-sm text-center w-full max-w-xs"
        >
          <strong>{item.title}</strong>
          <br />
          {item.desc}
        </div>
      ))}
    </div>
  </div>
</section>
<Footer/>
    </div>
  );
};

export default Solutions;
