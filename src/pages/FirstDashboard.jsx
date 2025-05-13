import React from "react";

// Card component with border gradient
// eslint-disable-next-line react/prop-types
const Card = ({ children, gradient }) => {
  return (
    <div className={`p-[1px] rounded-xl bg-gradient-to-br ${gradient}`}>
      <div className="rounded-xl bg-[#1c1c1e] p-4 h-full">{children}</div>
    </div>
  );
};

const Dashboard = () => {
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
        <h1 className="text-4xl font-bold text-blue-400">Hello,</h1>
        <p className="mt-10 text-gray-200">
          Please choose a product to work with.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-x-10 px-6 mt-6 flex-grow">
        {/* Left Side */}
        <div className="w-full lg:max-w-md mt-20 mb-10 lg:mb-0">
          <Card gradient="from-[#29292b] via-[#3d3d40] to-[#2c2c2e]">
            <div className="flex items-start gap-3">
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
                  Each time you log into your Group-IB SSO account, you will
                  need to enter a code to verify
                </p>
              </div>
            </div>
            <button className="mt-4 bg-blue-600/60 hover:bg-blue-800/70 text-white px-4 py-2 rounded-md">
              Protect account
            </button>
          </Card>
        </div>

        {/* Right Side */}
        <div className="flex-1 relative gap-10 ml-20 min-w-[300px]">
          <h2 className="text-xl font-semibold mb-4">
            Active products <span className="text-gray-400">(1)</span>
          </h2>

          {/* Active Product Card */}
          <div className="w-[260px] rounded-xl p-4 text-white mb-10 bg-gradient-to-r from-slate-800 to-slate-900/90">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-medium">Threat Intelligence</h3>
                <p className="text-sm">Available till 31 March 2026</p>
              </div>
              <div className="text-right mt-2 text-2xl">&rarr;</div>
            </div>
          </div>

          {/* Products Grid */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, i) => (
                <Card key={i} gradient={product.gradient}>
                  <h3 className="text-md font-medium text-white">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{product.desc}</p>
                </Card>
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
            <span className="whitespace-nowrap">+65 3159-4398</span> •{" "}
            <a
              href="mailto:support@group-ib.com"
              className="text-blue-400 hover:underline"
            >
              support@group-ib.com
            </a>
          </p>
          <p className="text-gray-400">
            © 2003 – 2025{" "}
            <span className="text-white font-medium">Group-IB</span> is global
            leader in attribution-based threat intelligence, best-in-class
            threat hunting, fraud prevention, and cybercrime investigations.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
