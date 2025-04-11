import InputField from "@/components/InputField";
import { useAuthContext, useScheduleAssessmentContext } from "@/context";
import { BaseValidationSchema } from "@/Validation/AuthValidation";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaCompass, FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { FaOdysee, FaWebAwesome, FaWebflow } from "react-icons/fa6";
import { FiAlertCircle } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";



export default function ClientDashboard() {

	const { dashboardData, DashboardData, datafetchCount,
		setdatafetchCount, } = useScheduleAssessmentContext()
	const { Signup, authenticate, loading, token } = useAuthContext()
	//console.log("dashboardData", dashboardData)

	useEffect(() => {
		if (token && datafetchCount === 0) {
			DashboardData();
			setdatafetchCount(1)
		}
	}, [token])


	const [isModalOpen, setIsModalOpen] = useState(false);


	const data = [
		{ name: "Secure Code", value: dashboardData.SecureCode },
		{ name: "Dynamic Application", value: dashboardData.DynamicApplication },
		{ name: "Web Application", value: dashboardData.WebApplication },
		{ name: "Api Penetration", value: dashboardData.ApiPenetration },
		{ name: "Infrastructure Vulnerability", value: dashboardData.InfrastructureVulnerability },
		// { name: "InfrastructurePenetration", value: dashboardData.InfrastructurePenetration },
	];

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: {
			full_name: "",
			phone: "",
			email: "",
			password: "",
			department: "",
			role: "ClientSME",
			owner: authenticate?._id,
			employee_approve: true,
			email_verification: true,
		},
		validationSchema: BaseValidationSchema,
		onSubmit: (value) => {
			Signup(value);
			setIsModalOpen(false);

		}
	})



	return (
		<div className="min-h-screen bg-background p-4 sm:p-6 flex flex-col items-center">


			<div className="w-full max-w-6xl">

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-6">


					{Object.keys(dashboardData)?.map((item, idx) => {
						return (<div key={idx} className="bg-white rounded-lg shadow p-6 hover:scale-105  transition">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-base  text-black ">{item.replace(/([a-z])([A-Z])/g, "$1 $2")}  </h3>
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
					<h2 className="text-sm font-semibold mb-2 sm:mb-4 text-left">Data Visualization</h2>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={data}>
							<XAxis dataKey="name" tick={{ fontSize: 12, }} />
							<YAxis />
							<Tooltip />
							<Bar dataKey="value" fill="#3b82f6" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
