import InputField from "@/components/InputField";
import { useAuthContext, useScheduleAssessmentContext } from "@/context";
import { SignUpValidation } from "@/Validation/AuthValidation";
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
	console.log("dashboardData", dashboardData)

	useEffect(() => {
		if (token && datafetchCount === 0) {
			DashboardData();
			setdatafetchCount(1)
		}
	}, [token])
 
	
	const [isModalOpen, setIsModalOpen] = useState(false);


	const data = [
		{ name: "SecureCode", value: dashboardData.SecureCode },
		{ name: "DynamicApplication", value: dashboardData.DynamicApplication },
		{ name: "WebApplication", value: dashboardData.WebApplication },
		{ name: "ApiPenetration", value: dashboardData.ApiPenetration },
		{ name: "InfrastructureVulnerability", value: dashboardData.InfrastructureVulnerability },
		{ name: "InfrastructurePenetration", value: dashboardData.InfrastructurePenetration },
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
		validationSchema: SignUpValidation,
		onSubmit: (value) => {
			Signup(value);
			setIsModalOpen(false);

		}
	})



	return (
		<div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center">

			{authenticate?.role === "ClientCISO" && <div className='flex w-full justify-end items-end py-4'>


				<button
					onClick={() => setIsModalOpen(true)}
					className="px-4 py-2 bg-[#015289] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
				>
					<BiPlus className="h-6 w-6" />
					Add Client SME
				</button>
			</div>}


			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
					<div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">

						{/* Header */}
						<div className="flex justify-between items-center border-b p-4 bg-[#015289]">
							<h2 className="text-lg font-semibold text-gray-200">
								{"Register Client SME"}
							</h2>
							<button
								onClick={() => setIsModalOpen(false)}
								className="text-gray-100 hover:text-gray-200 transition"
							>
								<MdClose className="h-6 w-6" />
							</button>
						</div>
						<div className="p-10 ">
							<div className=" flex  gap-6 mb-8   ">
								<form onSubmit={handleSubmit} className="space-y-5 w-full flex flex-col ">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">


										<div>



											<InputField
												label={"Full Name"}
												type={"text"}
												showPassword={false}
												icon={FaUser}
												value={values.full_name}
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder="Enter your Full Name"
												name="full_name"
											/>
											{touched.full_name && errors.full_name && <p className="text-red-400 font-xs font-semibold"> {errors.full_name}</p>}
										</div>

										<div>


											<InputField
												label={"Email Address"}
												type={"email"}
												showPassword={false}
												icon={FaEnvelope}
												value={values.email}
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder="Enter your Email Address"
												name="email"
											/>
											{touched.email && errors.email && <p className="text-red-400 font-xs font-semibold"> {errors.email}</p>}
										</div>

										<div>


											<InputField
												label={"Enter Your Department"}
												type={"text"}
												showPassword={false}
												icon={FaCompass}
												value={values.department}
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder="Enter your department"
												name="department"
											/>
											{touched.department && errors.department && <p className="text-red-400 font-xs font-semibold"> {errors.department}</p>}
										</div>
										<div>

											<InputField
												label={"Phone Number"}
												type={"number"}
												showPassword={false}
												icon={FaPhone}
												value={values.phone}
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder="Enter your Phone Number"
												name="phone"
											/>
											{touched.phone && errors.phone && <p className="text-red-400 font-xs font-semibold"> {errors.phone}</p>}
										</div>
										<div>


											<InputField
												label={"Password"}
												type={"password"}
												showPassword={true}
												icon={FaLock}
												value={values.password}
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder="Enter your Password"
												name="password"
											/>
											{touched.password && errors.password && <p className="text-red-400 font-xs font-semibold"> {errors.password}</p>}
										</div>

									</div>

									<div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 border-t pt-4">
										<button
											onClick={() => setIsModalOpen(false)
											}
											className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
										>
											Cancel
										</button>
										<button
											onClick={
												handleSubmit

											}
											className="px-4 py-2 bg-[#015289] text-white rounded-md hover:bg-blue-700 transition"
										>
											Save
										</button>
									</div>
								</form>
							</div>


						</div>
					</div>
				</div>
			)}

			<div className="w-full max-w-6xl">

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-6">


					{Object.keys(dashboardData)?.map((item, idx) => {
						return (<div key={idx} className="bg-white rounded-lg shadow p-6 hover:scale-105  transition">
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
