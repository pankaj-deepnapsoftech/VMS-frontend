import InputField from '@/components/InputField';
import { useJiraContext } from '@/context';
import { JiraConfiigValidation } from '@/Validation/JiraConfigurationValidation';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { FaKey, FaGlobe, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ThirdPartyConfig() {

	const { JiraConfiguration, JiraConfigData } = useJiraContext()
	console.log(JiraConfigData)


	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: { Domain: "", JIRA_USERNAME: "", JIRA_API_KEY: "" },
		validationSchema: JiraConfiigValidation,
		onSubmit: (value) => {
			JiraConfiguration(value)
		}
	})


	return (
		<div className="min-h-screen bg-gray-50 flex items-start pt-16 px-6 justify-center">
			<div className="w-full md:w-1/2 p-8 md:p-12 shadow-2xl rounded-2xl">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">Jira Integration</h1>
					<p className="text-gray-600">Welcome  Please enter your Jira details</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<InputField
						label={"Domain"}
						type={"text"}
						showPassword={false}
						icon={FaGlobe}
						value={values.Domain}
						onBlur={handleBlur}
						onChange={handleChange}
						placeholder="Enter your Domain Name"
						name="Domain"
					/>
					{touched.Domain && errors.Domain && <p> {errors.Domain}</p>}
					<InputField
						label={"Jira Username"}
						type={"text"}
						showPassword={false}
						icon={FaUser}
						value={values.JIRA_USERNAME}
						onBlur={handleBlur}
						onChange={handleChange}
						placeholder="Enter your Jira Username"
						name="JIRA_USERNAME"
					/>
					{touched.JIRA_USERNAME && errors.JIRA_USERNAME && <p> {errors.JIRA_USERNAME}</p>}
					<InputField
						label={"Jira Api Key"}
						type={"text"}
						showPassword={false}
						icon={FaKey}
						value={values.JIRA_API_KEY}
						onBlur={handleBlur}
						onChange={handleChange}
						placeholder="Enter your Jira Api Key"
						name="JIRA_API_KEY"
					/>
					{touched.JIRA_API_KEY && errors.JIRA_API_KEY && <p> {errors.JIRA_API_KEY}</p>}

					<button
						type="submit"
						className="w-full bg-[#015289] text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
						// disabled={loading}
						onSubmit={handleSubmit}
					>
						Submit
					</button>
				</form>
			</div>
			<div className="w-full md:w-1/2 p-8 md:p-12 shadow-2xl rounded-2xl">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">Jira Integration</h1>
					<p className="text-gray-600">Welcome  Please enter your Jira details</p>
				</div>
				<h1 className="text-3xl font-bold text-gray-800 mb-2">{JiraConfigData.Domain}</h1>
				<h1 className="text-3xl font-bold text-gray-800 mb-2">{JiraConfigData.JIRA_USERNAME}</h1>
				<h1 className="text-3xl font-bold text-gray-800 mb-2">{JiraConfigData.JIRA_API_KEY}</h1>
				{/* <form onSubmit={handleSubmit} className="space-y-6">
					<InputField
						label={"Domain"}
						type={"text"}
						showPassword={false}
						icon={FaGlobe}
						value={JiraConfigData.Domain}
						onBlur={handleBlur}
						onChange={handleChange}
						placeholder="Enter your Domain Name"
						name="Domain"
					/>
					{touched.Domain && errors.Domain && <p> {errors.Domain}</p>}
					<InputField
						label={"Jira Username"}
						type={"text"}
						showPassword={false}
						icon={FaUser}
						value={JiraConfigData.JIRA_USERNAME}
						onBlur={handleBlur}
						onChange={handleChange}
						placeholder="Enter your Jira Username"
						name="JIRA_USERNAME"
					/>
					{touched.JIRA_USERNAME && errors.JIRA_USERNAME && <p> {errors.JIRA_USERNAME}</p>}
					<InputField
						label={"Jira Api Key"}
						type={"text"}
						showPassword={false}
						icon={FaKey}
						value={JiraConfigData.JIRA_API_KEY}
						onBlur={handleBlur}
						onChange={handleChange}
						placeholder="Enter your Jira Api Key"
						name="JIRA_API_KEY"
					/>
					{touched.JIRA_API_KEY && errors.JIRA_API_KEY && <p> {errors.JIRA_API_KEY}</p>}

					<button
						type="submit"
						className="w-full bg-[#015289] text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
						// disabled={loading}
						onSubmit={handleSubmit}
					>
						Submit
					</button>
				</form> */}
			</div>

		</div>
	);
}

export default ThirdPartyConfig;