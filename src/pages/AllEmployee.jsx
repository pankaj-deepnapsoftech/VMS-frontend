import InputField from "@/components/InputField";
import Loader from "@/components/Loader/Loader";
import NoDataFound from "@/components/NoDataFound";
import { useAllEmployeeContext, useAuthContext } from "@/context";
import { BaseValidationSchema } from "@/Validation/AuthValidation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaCompass, FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function AllEmployee() {

	const { loading,
		allEmployeesData,
		page,
		setPage,
		VerifyEmployee,
		datafetchCount,
		setdatafetchCount,
		AllEmployee, AllClientSME }
		= useAllEmployeeContext();




	const { authenticate, token, Signup, ChangeStatus,loading:authloading } = useAuthContext();

	useEffect(() => {
		if (token && datafetchCount === 0) {

			authenticate?.role === "ClientCISO" ? AllClientSME() : AllEmployee();
			setdatafetchCount(1);
		}
	}, [token, page,authloading])

	const [isModalOpen, setIsModalOpen] = useState(false);

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
	});

	const handleChangeStatus = (type, id) => {
		switch (type) {
			case "activate":
				ChangeStatus({ deactivate: true }, id);
				break;
			// eslint-disable-next-line no-duplicate-case
			case "deactivate":
				ChangeStatus({ deactivate: false }, id);
				break;
		}
	}

	return (

		<>

			{loading ? <Loader /> : <div className="m-6 p-2 bg-gray-100 shadow-lg rounded-lg">
				{/* Table Header */}
				<div className="flex justify-between items-center mb-4">

					{authenticate?.role === "ClientCISO" && <div className='flex w-full justify-end items-end py-4'>


						<button
							onClick={() => setIsModalOpen(true)}
							className="px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
						>
							<BiPlus className="h-6 w-6" />
							Add Employee
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

				</div>

				{/* Table */}
				{allEmployeesData.length < 1 ? <NoDataFound /> : <div className="overflow-x-auto rounded-lg">
					<table className="table-auto w-full border-collapse border border-gray-200">
						<thead className="bg-gradient-to-bl from-[#333333] to-[#666666] text-white">
							<tr>
								<th className="px-4 py-1 text-sm  border text-left"> S No.</th>
								<th className="px-4 py-1 text-sm  border text-left">Full Name</th>
								<th className="px-4 py-1 text-sm  border text-left">Email</th>
								<th className="px-4 py-1 text-sm  border text-left">Phone</th>
								<th className="px-4 py-1 text-sm  border text-left">Role</th>
								<th className="px-4 py-1 text-sm  border text-left">Approval Status</th>
								<th className="px-4 py-1 text-sm  border text-left">Status</th>
								{/* <th className="px-4 py-3 border text-left">Action</th> */}
							</tr>
						</thead>
						<tbody>
							{allEmployeesData?.map((user, index) => (
								<tr
									key={user._id}
									className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200 transition duration-200"
								>
									<td className="px-2 py-1 border">{index + 1}</td>
									<td className="px-2 py-1 border">{user.full_name}</td>
									<td className="px-2 py-1 border">{user.email}</td>
									<td className="px-2 py-1 border">{user.phone}</td>
									<td className="px-2 py-1 border">{user.role}</td>
									<td className="px-2 py-2 border">
										{user?.employee_approve ? (
											<span className="px-3 py-1 text-sm font-semibold 1ext-green-800 bg-green-100 rounded-full">
												Approved
											</span>
										) : <button
											onClick={() => VerifyEmployee(user?._id)}
											className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
										>
											Verify
										</button>
										}
									</td>

									<td className="px-2 py-1 border">
										{user?.deactivate ? <button onClick={() => handleChangeStatus("deactivate", user._id)} type="button" className="bg-green-400 text-white px-3 py-1 rounded-2xl" >Activate</button>
											: <button type="button" onClick={() => handleChangeStatus("activate", user._id)} className="bg-red-400 text-white px-3 py-1 rounded-2xl" >Deactivate</button>}
									</td>
									{/* <td className="px-4 py-3 border">
									
									)}
								</td> */}
								</tr>
							))}
						</tbody>
					</table>
				</div>}
				<div className="flex justify-between items-center py-12 px-5">
					<button
						className={`px-4 py-2 bg-gradient-to-tr from-[#1f1d1d] to-[#666666]  text-white border rounded-md ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
						disabled={page === 1}
						onClick={() => setPage(page - 1)}
					>
						Previous
					</button>
					<span>
						Page {page}
						{/* of {totalPages} */}
					</span>
					<button
						className={`px-4 py-2 border rounded-md  text-white bg-gradient-to-tr from-[#1f1d1d] to-[#666666] `}
						disabled={allEmployeesData?.length < 10}
						onClick={() => setPage(page + 1)}
					>
						Next
					</button>
				</div>
			</div>}
		</>
	);
}
