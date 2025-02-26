import React from "react";
import { NavLink } from "react-router-dom";

export default function GettingStarted() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#015289] ">
			<div className="bg-white rounded-xl shadow-2xl p-10 max-w-md w-full text-center">
				<h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Eventus !</h1>
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
			</div>
		</div>
	);
}
