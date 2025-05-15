/* eslint-disable react/prop-types */
import { useAuthContext } from "@/context";
import "./animation.css"; 

const Card = ({ children, gradient }) => {
  return (
    <div
      className={`p-[1px] rounded-xl bg-gradient-to-br ${gradient} transform transition duration-300 hover:scale-105 hover:shadow-xl`}
    >
      <div className="rounded-xl bg-[#1c1c1e] p-6 min-h-[180px] backdrop-blur-md bg-opacity-80 transition-colors duration-300">
        {children}
      </div>
    </div>
  );
};

const Dashboard = ({ setGetDataFromSession }) => {
  const { authenticate } = useAuthContext();

  const products = [
    {
      title: "CTVM",
      desc: "Continuous Threat and Vulnerability Management",
      gradient: "from-[#ff7e5f] to-[#feb47b]",
    },
    {
      title: "VI",
      desc: "Vulnerability Intelligence for known/unknown threats",
      gradient: "from-[#6a11cb] to-[#2575fc]",
    },
    {
      title: "ASM",
      desc: "Attack Surface Monitoring for real-time visibility",
      gradient: "from-[#00c6ff] to-[#0072ff]",
    },
    {
      title: "DarkWeb",
      desc: "Monitor stolen data on dark web forums & markets",
      gradient: "from-[#f7971e] to-[#ffd200]",
    },
    {
      title: "API Discovery",
      desc: "Discover, classify, and secure exposed APIs",
      gradient: "from-[#43cea2] to-[#185a9d]",
    },
    {
      title: "AI PT",
      desc: "Automated AI-driven Penetration Testing",
      gradient: "from-[#f953c6] to-[#b91d73]",
    },
    {
      title: "AI Remediation Factory",
      desc: "AI-based solution fixing vulnerabilities at scale",
      gradient: "from-[#2193b0] to-[#6dd5ed]",
    },
    {
      title: "Asset Inventory",
      desc: "Centralized asset visibility and management",
      gradient: "from-[#ee9ca7] to-[#ffdde1]",
    },
    {
      title: "Reporting",
      desc: "Generate reports & dashboards automatically",
      gradient: "from-[#a1c4fd] to-[#c2e9fb]",
    },
    {
      title: "Administration",
      desc: "Admin control panel for team and roles",
      gradient: "from-[#fceabb] to-[#f8b500]",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-center text-white font-sans bg-gradient-image bg-cover">
      {/* Header */}
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-semibold text-sky-500 pb-10">Secure&</h1>
        <h2 className="text-4xl font-bold text-blue-400">
          Hello, <span className="capitalize font-lexendDeca" >{authenticate.full_name}</span>
        </h2>
        <p className="mt-2 text-gray-400">
          Please choose a product to work with.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-x-10 px-6 mt-6 flex-grow py-10">
        {/* Left Side */}
        <div className="w-full lg:max-w-md mb-10 lg:mb-0">
          <Card gradient="bg-transparent">
            <div className="flex items-start  gap-3">
              <div className="bg-red-600 p-2 rounded-full">
                <span role="img" aria-label="shield">
                  🔒
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Protect your account with two-factor authentication
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Each time you log into your SSO account, you will need to
                  enter a code to verify
                </p>
              </div>
            </div>
            <div className="text-end pt-3" >

            <button className="mt-4 bg-blue-600/60 hover:bg-blue-800/70 text-white px-4 py-2 rounded-md">
              Protect account
            </button>
            </div>
          </Card>
        </div>

        {/* Right Side */}
        <div className="flex-1 relative gap-10 ml-20 min-w-[300px]">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, i) => (
                <div
                  key={i}
                  className="animate-fade-in cursor-pointer"
                  onClick={() => {
                    sessionStorage.setItem("main-page", "true");
                    setGetDataFromSession("true");
                  }}
                >
                  <Card gradient={product.gradient}>
                    <h3 className="text-lg font-semibold group-hover:text-blue-300">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 group-hover:text-gray-300">
                      {product.desc}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-20 text-xs text-white px-4 py-6 ">
        <div className="max-w-4xl mx-auto text-center space-y-2 leading-snug">
          <p>
            24/7 support{" "}
            <a
              href="mailto:contact@securend.ai"
              className="text-blue-400 hover:underline"
            >
              contact@securend.ai
            </a>
          </p>
          <p className="text-gray-400">
            © 2025{" "}
            <span className="text-white font-medium">Secure&</span> is global
            leader in attribution-based threat intelligence, best-in-class
            threat hunting, fraud prevention, and cybercrime investigations.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
