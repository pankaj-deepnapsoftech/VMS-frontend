import React, { useState } from 'react'

const Addtanent = () => {
    const [riskScore, setRiskScore] = useState(600);

    const getRiskLevel = (score) => {
        if (score < 500) return "Low";
        if (score < 700) return "Medium";
        return "High";
    };
    return (
        <div className="min-h-screen bg-gradient-custom  text-gray-300">
            {/* Header with progress bar */}
            <div className="w-full">
                <div className="text-center py-6  text-xl">Company Profile</div>
                <div className="w-full h-1 bg-background">
                    <div className="h-full bg-blue-400 w-1/2"></div>
                </div>
            </div>

            <div className="flex px-10">
                {/* Sidebar navigation */}


                {/* Main content */}
                <div className="flex-1 px-8 py-10 max-w-5xl">
                    {/* Enterprise section */}
                    <div className="mb-12">
                        <h1 className="text-3xl font-bold  mb-2">Tell Us About Your Enterprise</h1>
                        <p className=" mb-8">
                            Provide details about your company to ensure Enterprise TruRisk Management proactively evaluates and
                            identifies potential cyber security risks and calculates peer benchmarking.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Company Name */}
                            <div className=''>
                                <label className="block text-sm  mb-1">
                                    Registered Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue="ACME Corp Ltd"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
                                />
                            </div>

                            {/* Website URL */}
                            <div>
                                <label className="block text-sm  mb-1">
                                    Website URL <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue="www.acmecorp.com"
                                    className="w-full border bg-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Industrial Sector */}
                            <div>
                                <label className="block text-sm  mb-1">
                                    Industrial Sector <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select className="w-full border bg-black border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ">
                                        <option>E-Commerce</option>
                                        <option>Technology</option>
                                        <option>Healthcare</option>
                                        <option>Finance</option>
                                        <option>Manufacturing</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Employee Count */}
                            <div>
                                <label className="block text-sm  mb-1">
                                    Employee Count <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select className="w-full bg-black border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>1-100</option>
                                        <option>101-500</option>
                                        <option>501-1000</option>
                                        <option>1001-5000</option>
                                        <option>5000+</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Headquarters section */}
                    <div>
                        <h2 className="text-xl font-bold  mb-1">Headquarters</h2>
                        <p className=" text-sm mb-6">
                            Choose a headquarters location for your company to personalize defense strategies according to
                            location-specific threats.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                            {/* Country */}
                            <div>
                                <label className="block text-sm  mb-1">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select className="w-full bg-black border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ">
                                        <option>USA</option>
                                        <option>Canada</option>
                                        <option>United Kingdom</option>
                                        <option>Australia</option>
                                        <option>Germany</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* State */}
                            <div>
                                <label className="block text-sm  mb-1">State</label>
                                <div className="relative">
                                    <select className="w-full bg-black border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>California</option>
                                        <option>New York</option>
                                        <option>Texas</option>
                                        <option>Florida</option>
                                        <option>Washington</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm  mb-1">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue="San Francisco"
                                    className="w-full border bg-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Help button */}
            <div className="fixed top-6 right-6">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-blue-600 hover:bg-gray-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <span className="absolute -right-2 -top-2 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                </span>
                <span className="ml-2 text-xs text-gray-500 absolute right-0 top-12 whitespace-nowrap">Need Help?</span>
            </div>

            <div className="p-6 bg-transparent">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Risk Appetite</h2>
                    <label className="flex items-center space-x-2">
                        <span className="text-sm">Toggle</span>
                        <input type="checkbox" checked readOnly className="w-5 h-5" />
                    </label>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                    The Risk Appetite is a threshold to indicate the acceptable TruRisk score in your organization.
                    Toggle this option to view or define the threshold value for the organization.
                </p>

                <div className=" p-5 rounded shadow">
                    <p className="text-md font-medium mb-2">TruRisk</p>
                    <p className="text-sm text-gray-700 mb-4">
                        Qualys TruRisk Score for assets is calculated based on the Asset Criticality Score (ACS) and
                        Qualys Detection Score (QDS) assigned to all findings (vulnerabilities and misconfigurations)
                        from Qualys and third-party data sources. <a href="#" className="text-blue-600">Learn More</a>
                    </p>

                    <div className="relative pb-12">
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            step="10"
                            value={riskScore}
                            onChange={(e) => setRiskScore(Number(e.target.value))}
                            className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded-full appearance-none"
                        />
                        <div
                            className="absolute -top-14 transform -translate-x-1/2 bg-white px-3 py-2 rounded shadow text-center text-xs border"
                            style={{ left: `${(riskScore / 1000) * 100}%` }}
                        >
                            <p className="font-semibold">Risk Appetite for TruRisk</p>
                            <p className="text-blue-600 text-lg font-bold">{riskScore}</p>
                            <p>{getRiskLevel(riskScore)}</p>
                        </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>0</span>
                        <span>500</span>
                        <span>700</span>
                        <span>850</span>
                        <span>1000</span>
                    </div>

                    <div className="relative mt-2 h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500">
                        <div className="absolute left-[40%] w-px h-4 bg-black"></div>
                        <div className="absolute left-[40%] text-[10px] -top-5 text-center" style={{ transform: "translateX(-50%)" }}>
                            Qualys<br />Recommended
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addtanent