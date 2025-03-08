import { NavLink } from "react-router-dom";

// export default function GettingStarted() {
// 	return (
// 		<div className="min-h-screen flex items-center justify-center bg-[#015289] ">
{/* <div className="bg-white rounded-xl shadow-2xl p-10 max-w-md w-full text-center">
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
</div> */}

// 		</div>
// 	);
// }




import React, { useState } from 'react';
import { GiSpiderWeb } from 'react-icons/gi';

function GettingStarted() {
	const [url, setUrl] = useState('www.example.com');
	const [activeTab, setActiveTab] = useState('light');

	return (
		<div className="min-h-screen bg-[#015289] p-8 flex justify-center items-center">

			<div className="container mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-end  space-y-10 lg:space-y-0">

				{/* Left Section */}
				<div className="max-w-2xl">
					<div className="bg-white w-20 h-20 rounded-xl flex items-center justify-center shadow-lg mb-6">
						<GiSpiderWeb className="w-12 h-12 text-[#01406b]" />
					</div>

					<h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
						Proactively Secure, <br />Effortlessly Comply, <br />Stay Ahead of Cyber Risks.
					</h1>

					<p className="text-slate-200 text-lg max-w-xl mb-6">
						In today’s fast-evolving digital landscape, cyber threats are more sophisticated than ever.
						Secure& Pvt. Ltd. presents Secure& Vulnerability Management System (VMS)—a cutting-edge
						solution that helps organizations identify, analyze, prioritize, and eliminate vulnerabilities with ease.
					</p>

					<p className="text-slate-200 text-lg max-w-xl mb-8">
						Engineered to handle modern web app architectures, it efficiently crawls SPAs and other JavaScript-heavy websites,
						detects hidden API endpoints, and navigates complex authentication flows.
					</p>

					<NavLink
						to="/sign-up"
						className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transform transition-all duration-300">
						Create Free Account
					</NavLink>
				</div>

				{/* Scanner Interface */}
				<div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center transform transition-all duration-300 hover:scale-105">
					<h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Secure& !</h1>
					<p className="text-gray-600 mb-6">Get started with your account.</p>

					<div className="space-y-4 flex flex-col">
						<NavLink
							to="/sign-in"
							className="w-full bg-[#015289] text-white py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 hover:scale-105 transform transition-all duration-300"
						>
							Sign In
						</NavLink>
						<NavLink
							to="/sign-up"
							className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-gray-200 hover:scale-105 transform transition-all duration-300"
						>
							Sign Up
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GettingStarted;