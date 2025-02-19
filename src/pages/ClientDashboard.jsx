import { useScheduleAssessmentContext } from "@/context";
import React from "react";
import { BiPlus } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";



export default function ClientDashboard() {
	const { dashboardData } = useScheduleAssessmentContext()
	console.log(typeof dashboardData)
	const data = [
		{ name: "SecureCode", value: dashboardData.SecureCode },
		{ name: "DynamicApplication", value: dashboardData.DynamicApplication },
		{ name: "WebApplication", value: dashboardData.WebApplication },
		{ name: "ApiPenetration", value: dashboardData.ApiPenetration },
		{ name: "InfrastructureVulnerability", value: dashboardData.InfrastructureVulnerability },
		{ name: "InfrastructurePenetration", value: dashboardData.InfrastructurePenetration },
	];

	return (
		<div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center">

			<div className='flex w-full justify-end items-end py-4'>
				

				<button
					// onClick={() => setIsModalOpen(true)}
					className="px-4 py-2 bg-[#015289] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
				>
					<BiPlus className="h-6 w-6" />
					Add Client SME
				</button>
			</div>
			<div className="w-full max-w-6xl">

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-6">


					{Object.keys(dashboardData)?.map((item) => {
						return (<div className="bg-white rounded-lg shadow p-6 hover:scale-105  transition">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-base  text-black capitalize">{item}  </h3>
								<FiAlertCircle className="text-red-500" size={20} />
							</div>
							<div className="space-y-1">
								<p className="text-3xl ">{dashboardData[item]}</p>
							</div>
						</div>
						)
					})}
				</div>
				<div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 w-full">
					<h2 className="text-lg font-semibold mb-2 sm:mb-4 text-center">Data Visualization</h2>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={data}>
							<XAxis dataKey="name" tick={{ fontSize: 12, }} />
							<YAxis />
							<Tooltip />
							<Bar dataKey="value" fill="#3b82f6" radius={[5, 5, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
