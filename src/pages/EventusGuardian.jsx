import React from 'react';
import { FiAlertCircle, FiRefreshCcw } from 'react-icons/fi';
import InputField from '@/components/InputField';
import { GuardainValidation } from '@/Validation/GuardainValidation';
import { useFormik } from 'formik';
import { BiFilter, BiShield } from 'react-icons/bi';
import { FaGlobe, FaLink, FaFolderOpen } from 'react-icons/fa';
import { FaDatabase, FaFingerprint } from 'react-icons/fa6';
import { RiShieldCheckFill } from 'react-icons/ri';
import { IoMdAirplane } from 'react-icons/io';
import { MdSchedule } from 'react-icons/md';
import { useVulnerabililtyDataContext } from '@/context';



function EventusGuardianPage() {


	const { GuardianPostData } = useVulnerabililtyDataContext();

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: {
			AIR_ID: "",
			Application_URL: "",
			Data_Classification: "",
			Application_required_MFA: "",
			MFA_Enabled: "",
			MFA_Solution: ""
		},
		validationSchema: GuardainValidation,
		onSubmit: (value) => {
			console.log(value)
			GuardianPostData(value);
		}
	})


	return (
		<div className="min-h-screen bg-white text-gray-black px-5 ">
			{/* Main Content */}
			<main className="container mx-auto px-4 py-8">
				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-6">Web PT Scans</h2>

					{/* Form Section */}
					<div className=" flex  gap-6 mb-8   ">
						<form onSubmit={handleSubmit} className="space-y-5 w-full flex flex-col ">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
								<div>
									<InputField
										label={"Air ID"}
										type={"text"}
										showPassword={false}
										icon={IoMdAirplane}
										value={values.AIR_ID}
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Enter your Air ID"
										name="AIR_ID"
									/>

									{touched.AIR_ID && errors.AIR_ID && <p className='text-red-700 text-xs'> {errors.AIR_ID}</p>}
								</div>

								<div>
									<InputField
										label={"Application URL"}
										type={"text"}
										showPassword={false}
										icon={FaLink}
										value={values.Application_URL}
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Enter your Application URL"
										name="Application_URL"
									/>
									{touched.Application_URL && errors.Application_URL && <p className='text-red-700 text-xs'> {errors.Application_URL}</p>}
								</div>

								<div>
									<InputField
										label={"Data Classification"}
										type={"text"}
										showPassword={false}
										icon={FaDatabase}
										value={values.Data_Classification}
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Enter your Data Classification"
										name="Data_Classification"
									/>
									{touched.Data_Classification && errors.Data_Classification && <p className='text-red-700 text-xs'> {errors.Data_Classification}</p>}

								</div>


								<div>
									<InputField
										label={"MFA Solution"}
										type={"text"}
										showPassword={false}
										icon={RiShieldCheckFill}
										value={values.MFA_Solution}
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Enter your Data Classification"
										name="MFA_Solution"
									/>
									{touched.MFA_Solution && errors.MFA_Solution && <p className='text-red-700 text-xs'> {errors.MFA_Solution}</p>}

								</div>

								<div>
									<label
										htmlFor="role"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Application Requires MFA
									</label>
									<select
										name='Application_required_MFA'
										value={values.Application_required_MFA}
										onChange={handleChange}
										className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
										id="role">
										<option disabled selected> -- Select -- </option>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</select>
									{touched.Application_required_MFA && errors.Application_required_MFA && <p className='text-red-700 text-xs'> {errors.Application_required_MFA}</p>}
								</div>

								<div>
									<label
										htmlFor="role"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										MFA Enabled
									</label>
									<select
										name='MFA_Enabled'
										value={values.MFA_Enabled}
										onChange={handleChange}
										className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
										id="role">
										<option disabled selected> -- Select   -- </option>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</select>
									{touched.MFA_Enabled && errors.MFA_Enabled && <p className='text-red-700 text-xs'> {errors.MFA_Enabled}</p>}
								</div>
							</div>
							<button
								type="submit"
								className="w-[20%] bg-[#015289] text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
								onClick={handleSubmit}
							>
								Submit
							</button>
						</form>
					</div>

					{/* Script Execution Details */}
					<div className="mt-8">
						<h3 className="text-lg font-semibold mb-4">Script Execution Details</h3>
						<div className=" flex  gap-6 mb-8   ">
							<form onSubmit={() => { }} className="space-y-5 w-full flex flex-col ">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
									<InputField
										label={"Test URL"}
										type={"text"}
										showPassword={false}
										icon={FaLink}
										value={values.full_name}
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Enter your Test URL"
										name="full_name"
									/>

									{touched.full_name && errors.full_name && <p> {errors.full_name}</p>}

									<InputField
										label={"Scheduling ID"}
										type={"email"}
										showPassword={false}
										icon={MdSchedule}
										value={values.email}
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Enter your Scheduling ID"
										name="email"
									/>
									{touched.email && errors.email && <p> {errors.email}</p>}

									<InputField
										label={"Target IP/Folder Name"}
										type={"text"}
										showPassword={false}
										icon={FaFolderOpen}
										value={values.phone}
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Enter yourTarget IP/Folder Name"
										name="phone"
									/>
									{touched.phone && errors.phone && <p> {errors.phone}</p>}


									<InputField
										label={"Domain"}
										type={"text"}
										showPassword={false}
										icon={FaGlobe}
										value={values.phone}
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Enter your Domain"
										name="phone"
									/>
									{touched.phone && errors.phone && <p> {errors.phone}</p>}


								</div>
							</form>

						</div>


						{/* <div>
								<label className="block text-sm font-medium mb-1">Test URL<span className="text-red-500">*</span></label>
								<input
									type="text"
									placeholder="Enter Test URL"
									className="w-full bg-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Scheduling ID<span className="text-red-500">*</span></label>
								<input
									type="text"
									placeholder="Enter Scheduling ID"
									className="w-full bg-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Target IP/Folder Name<span className="text-red-500">*</span></label>
								<input
									type="text"
									placeholder="Enter Target IP/Folder Name"
									className="w-full bg-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">
									Domain<span className="text-black">*</span>
								</label>
								<input
									type="text"
									placeholder="Enter Domain"
									className="w-full bg-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								/>
							</div> */}
					</div>
					<div className="flex space-x-4">
						<button className="bg-gray-500 hover:bg-indigo-600    text-white px-6 py-2 rounded-md font-medium">
							Cancel
						</button>

						<button className="bg-[#015289]  hover:bg-indigo-600 placeholder:hover:bg-indigo-600 text-white px-6 py-2 rounded-md font-medium">
							Upload
						</button>
						<button className="bg-[#015289] hover:bg-indigo-600 text-white px-6 py-2 rounded-md font-medium">
							Execute
						</button>
					</div>


					{/* Scan Details Table */}
					<div className="mt-8">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold">Scan Details</h3>
							<div className="flex space-x-4">
								<FiRefreshCcw className="h-6 w-6 text-black-500 cursor-pointer" />
								<BiFilter
									className="h-6 w-6 text-black-500 cursor-pointer" />
							</div>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="bg-[#015289]">
										<th className="px-4 py-3 text-left text-sm font-medium text-white">Scan ID</th>
										<th className="px-4 py-3 text-left text-sm font-medium text-white">Schedule ID</th>
										<th className="px-4 py-3 text-left text-sm font-medium text-white">Test URL</th>
										<th className="px-4 py-3 text-left text-sm font-medium text-white">Scan Start Date</th>
										<th className="px-4 py-3 text-left text-sm font-medium text-white">Status</th>
										<th className="px-4 py-3 text-left text-sm font-medium text-white">Scan Duration</th>
										<th className="px-4 py-3 text-left text-sm font-medium text-white">Scan Results</th>
										<th className="px-4 py-3 text-left text-sm font-medium text-white">Actions</th>
									</tr>
								</thead>
								<tbody className="bg-gray-800 bg-opacity-50">
									{/* Table rows would be dynamically populated */}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</main>
		</div>


	);
}

export default EventusGuardianPage;