import React from "react";
import { Check } from "lucide-react";
import Header from "./component/Header";
import Footer from "./component/Footer";

function Pricing() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Simple and Affordable</h1>
            <h2 className="text-4xl font-bold mb-6">Pricing Plans</h2>
            <p className="text-gray-400">
              AI powered Risk Prioritization and Remediation platform
            </p>
          </div>
          <div class="bg-gray-800/50 rounded-2xl shadow-md p-6 max-w-md mx-auto text-center">
            <h2 class="text-2xl font-bold text-gray-300 mb-2">Pricing</h2>
            <p class="text-gray-300 mb-4">
              Our pricing plans are tailored to suit your business needs.
            </p>
            <p class="text-gray-200 font-medium">
              For more enquiry, contact us at:
            </p>
            <p class="mt-2 text-blue-600">
              📞{" "}
              <a href="tel: +919205404075" class="hover:underline">
              +91 9205404075
              </a>
            </p>
            <p class="text-blue-600">
              ✉️{" "}
              <a href="mailto:itsybizz@gmail.com" class="hover:underline">
              itsybizz@gmail.com
              </a>
            </p>
          </div>

          {/* Pricing Cards */}
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pricing;











// <div className="grid md:grid-cols-3 gap-8">
//             {/* Free Plan */}
//             <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
//               <h3 className="text-xl mb-4">Free</h3>
//               <div className="mb-6">
//                 <span className="text-4xl font-bold">$0</span>
//                 <span className="text-gray-400">/month</span>
//               </div>
//               <p className="text-gray-400 mb-6">
//                 Great for trying out Finament and for tiny teams
//               </p>
//               <button className="w-full py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors mb-8">
//                 Start for Free
//               </button>
//               <div className="space-y-4">
//                 <h4 className="text-sm text-gray-400 mb-4">FEATURES</h4>
//                 {[
//                   "Account Aggregation",
//                   "Expense Tracking",
//                   "Budgeting Tools",
//                   "Transaction Insights",
//                   "Basic Security",
//                 ].map((feature) => (
//                   <div key={feature} className="flex items-center gap-3">
//                     <Check size={18} className="text-gray-400" />
//                     <span className="text-sm">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Professional Plan */}
//             <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700 relative">
//               <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-700 text-xs py-1 px-3 rounded-full">
//                 Most Popular
//               </div>
//               <h3 className="text-xl mb-4">Professional</h3>
//               <div className="mb-6">
//                 <span className="text-4xl font-bold">$98</span>
//                 <span className="text-gray-400">/month</span>
//               </div>
//               <p className="text-gray-400 mb-6">
//                 Best for growing startups and growth companies
//               </p>
//               <button className="w-full py-3 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors mb-8">
//                 Sign Up with Professional
//               </button>
//               <div className="space-y-4">
//                 <h4 className="text-sm text-gray-400 mb-4">FEATURES</h4>
//                 {[
//                   "Everything in Free",
//                   "Customizable Dashboards",
//                   "Advanced Budgeting",
//                   "Investment Tracking",
//                   "Enhanced Security",
//                 ].map((feature) => (
//                   <div key={feature} className="flex items-center gap-3">
//                     <Check size={18} className="text-gray-400" />
//                     <span className="text-sm">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Enterprise Plan */}
//             <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
//               <h3 className="text-xl mb-4">Enterprise</h3>
//               <div className="mb-6">
//                 <span className="text-4xl font-bold">$160</span>
//                 <span className="text-gray-400">/month</span>
//               </div>
//               <p className="text-gray-400 mb-6">
//                 Best for large companies and teams requiring high security
//               </p>
//               <button className="w-full py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors mb-8">
//                 Sign Up with Enterprise
//               </button>
//               <div className="space-y-4">
//                 <h4 className="text-sm text-gray-400 mb-4">FEATURES</h4>
//                 {[
//                   "Financial Planning Tools",
//                   "Priority Support",
//                   "Premium Widgets",
//                   "Advanced Security",
//                   "Integration with 3rd-Party Services",
//                 ].map((feature) => (
//                   <div key={feature} className="flex items-center gap-3">
//                     <Check size={18} className="text-gray-400" />
//                     <span className="text-sm">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>