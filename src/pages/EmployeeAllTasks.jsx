import React, { Suspense, useEffect, useState } from "react";
import { BiSearch, BiEditAlt, BiPlus, BiSave } from "react-icons/bi";
import { RiDeleteBinFill, RiUpload2Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useAllEmployeeContext, useAuthContext, useVulnerabililtyDataContext } from "@/context";
import { Formik, Form, Field } from "formik";
import * as XLSX from "xlsx";
import { WorkItemValidation } from "@/Validation/VulnerabililtyDataValidation";
import { BsPersonCheckFill } from "react-icons/bs";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/Loader";
import InputField from "@/components/InputField";
import { Modal } from "@/components/modal/FileUploadModal";

export function EmployeeAllTasks() {
	const {
		loading,
		UpdateData,
		orgnizationNotification } =
		useVulnerabililtyDataContext();


	const { authenticate, token } = useAuthContext()


	const {
		employeeTasksData,
		taskPage,
		setTaskPage,
		UploadDetailedReport,
		EmployeeTasks,
		datafetchCount,
		setdatafetchCount } = useAllEmployeeContext();

	//console.log("employeeTasksData", employeeTasksData)

	useEffect(() => {
		if (token && datafetchCount === 0) {
			EmployeeTasks();
			setdatafetchCount(1);
		}
	}, [token, taskPage])

	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [selectAll, setSelectAll] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [editData, setEditData] = useState(null);
	const rowsPerPage = 10;
	const [index, setIndex] = useState([]);
	const [newData, setNewData] = useState([])
	const [pdfReport, setPdfReport] = useState([])

	// Extract headers dynamically for table display
	const tableHeaders =
		employeeTasksData.length > 0
			? Object.keys(employeeTasksData[0]).filter(
				(key) => key !== "_id" && key !== "__v" && key !== "updatedAt"
			)
			: [];

	// Headers for the Add form (show all fields)
	const addFormHeaders = tableHeaders.filter(
		(key) => key !== "createdAt" && key !== "updatedAt"
	);

	// Headers for the Edit form (restrict to specific fields)
	const editFormHeaders = [
		"Status",
	];

	const filteredData = employeeTasksData.filter((item) =>
		Object.values(item).some(
			(value) =>
				value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	const totalPages = Math.ceil(filteredData.length / rowsPerPage);

	const paginatedData = filteredData.slice(
		(currentPage - 1) * rowsPerPage,
		currentPage * rowsPerPage
	);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) setCurrentPage(page);
	};

	// Open modal for editing or adding
	const openModal = (data = null) => {
		setEditData(data);
		setEditMode(!!data);
		setIsModalOpen(true);
	};

	// const handleDelete = (id) => {
	// 	if (window.confirm("Are you sure you want to delete this vulnerability?")) {
	// 		DeleteData(id);
	// 	}
	// };
	// const handleChecked = (id) => {

	// 	let data = index.filter((item) => item === id)
	// 	if (data.length > 0) {
	// 		data = index.filter((item) => item !== id)
	// 		setIndex(data)
	// 	} else {
	// 		setIndex((pre) => ([...pre, id]))
	// 	}
	// };

	const [status, setStatus] = useState("")
	const [expectionTime, setExpectionTime] = useState(new Date())
	// const [id, setID] = useState("")

	// const handleAssignTask = (id) => {
	// 	setIsOpen(true)
	// 	setID(id)

	// };

	// const handleBulkAssignTask = () => {
	// 	index.length > 0 ? "" : toast.error("Select Tasks For Assign")
	// 	setIsOpen(index.length > 0)
	// 	setID(id)

	// };

	const handleDownload = (data) => {
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Vulnerabilities");
		XLSX.writeFile(workbook, "Vulnerabilities.xlsx");
	};


	const [taskID, setTaskID] = useState("")

	const formData = new FormData();

	formData.append("PDF", pdfReport);

	const handleUpload = async (item) => {
		setTaskID(item._id)
		setIsOpen(true)

	}

	let statusList = ["Open", "Closed", "Fix", "Re-Open", "On-Hold", "Exception"];


	return (
		<Suspense fallback={<div>Loading...</div>}>
			{loading ? <Loader /> : <div className="p-4 md:p-6 max-w-[95%] mx-auto bg-white rounded-xl shadow-lg">
				{/* 🔍 Search Bar & Buttons */}
				<div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
					<div className="relative mt-4 md:mt-0">
						<BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
						<input
							type="text"
							placeholder="Search vulnerabilities..."
							className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					{/* <div className="lg:flex lg:flex-row grid grid-cols-2 gap-4 mt-4   w-full lg:justify-end  lg:items-center py-2 lg:gap-2">
						{/* <button
							onClick={() => openModal()}
							className="px-4 py-2  bg-[#015289] text-white lg:text-sm  text-xs font-medium rounded-md flex items-center"
						>
							<BiPlus className="h-6 w-6 mr-1" />
							Add Vulnerability
						</button>
						<button
							onClick={() => handleBulkAssignTask()}
							className="px-4 py-2 bg-[#015289] text-white text-sm font-medium rounded-md flex items-center"
						>
							<BsPersonCheckFill className="h-6 w-6 mr-1" />
							Bulk Task Assign
						</button> */}


					{/* </div> *   /  */}
					<div className='flex justify-end items-start gap-5 py-4'>

						<button
							onClick={() => setIsModalOpen(true)}
							className="px-4 py-2 bg-[#015289] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
						>
							<BiPlus className="h-6 w-6" />
							Report Upload
						</button>
						<button
							onClick={() => handleDownload(filteredData)}
							className="px-4 py-2 bg-[#015289] text-white text-sm font-medium rounded-md flex items-center"
						>
							<BiSave className="h-6 w-6 mr-1" />
							Export Data
						</button>
					</div>


					<Modal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						title="Report Upload"
						subtitle=" please upload an Excel file in XLSX or XLS format. Ensure the file is properly formatted and contains all necessary data for processing."
					/>

				</div>

				{/* 📊 Table */}
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-[#015289]">

							<tr>
								{/* <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
									<input
										type="checkbox"
										checked={selectAll}
										onChange={(e) => {
											setSelectAll(!selectAll);
											handleSelectAll(e)
										}} />
								</th> */}
								{tableHeaders.map((header, index) => (
									<th
										key={index}
										className="px-4 py-3 text-left text-xs font-medium text-white uppercase"
									>
										{header === "createdAt" ? "Created Date" : header.replace(/_/g, " ")}
									</th>
								))}
								<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{paginatedData?.map((item) => (
								<tr key={item._id} className="hover:bg-gray-50">
									{/* <td className="px-4 py-4 whitespace-nowrap flex justify-around gap-4">
										<input
											type="checkbox"
											value="bubbles"
											checked={index.filter((i) => i === item._id).length > 0}
											onChange={() => handleChecked(item._id)} />

									</td> */}
									{tableHeaders.map((field, i) => (
										<td key={i} className={`px-4 py-4 whitespace-nowrap text-sm text-gray-900 `}>
											{
												field === "createdAt" ?
													new Date(item[field]).toLocaleDateString("en-IN", {
														day: "2-digit",
														month: "short",
														year: "numeric",
													}) : field === "Assigned_To" ? item[field]?.full_name :
														item[field]
											}
										</td>
									))}
									<td className="px-4 py-4 whitespace-nowrap flex justify-around gap-4">
										<button onClick={() => openModal(item)} className="text-blue-600">
											<BiEditAlt className="h-5 w-5" />
										</button>
										<button onClick={() => handleUpload(item)} className="text-red-600">
											<RiUpload2Fill className="h-5 w-5" />
										</button>
										{/* <button onClick={() => handleAssignTask(item._id)} className="text-red-600">
											<BsPersonCheckFill className="h-5 w-5" />
										</button> */}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* 📝 Modal Form */}
				{isModalOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
						<div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">

							{/* Header */}
							<div className="flex justify-between items-center border-b p-4 bg-[#015289]">
								<h2 className="text-lg font-semibold text-gray-200">
									Edit Status
								</h2>
								<button
									onClick={() => setIsModalOpen(false)}
									className="text-gray-100 hover:text-gray-200 transition"
								>
									<MdClose className="h-6 w-6" />
								</button>
							</div>

							{/* Form */}
							<div className="p-10">
								<label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Status</label>
								<select
									onChange={(e) => setStatus(e.target.value)}
									id="status"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
								>
									<option selected disabled>Select a Status</option>
									{statusList.map((item, idx) => (
										<option key={idx} value={item}>
											{item}
										</option>
									))}

								</select>

								{status === "Exception" &&
									<div>
										<InputField
											label={"Exception Date"}
											type={"date"}
											showPassword={false}
											value={expectionTime}

											onChange={(e) => { setExpectionTime(e.target.value) }}

										/>

									</div>}

								<div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 border-t pt-4">
									<button
										onClick={() => setIsModalOpen(false)}
										className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
									>
										Cancel
									</button>
									<button
										onClick={() => {

											if (status.length > 0 && editData._id) {
												UpdateData({ Status: status, Expection_time: expectionTime }, editData._id)


												orgnizationNotification(editData?.Organization, `${editData?.Title} is Move to Exception by ${authenticate.full_name}`);


												setIsModalOpen(false)
												setStatus("")

											} setIsModalOpen(false)
										}
										}
										className="px-4 py-2 bg-[#015289] text-white rounded-md hover:bg-blue-700 transition"
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{isOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
						<div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">

							{/* Header */}
							<div className="flex justify-between items-center border-b p-4 bg-[#015289]">
								<h2 className="text-lg font-semibold text-gray-200">
									Upload Detailed Report
								</h2>
								<button
									onClick={() => setIsOpen(false)}
									className="text-gray-100 hover:text-gray-200 transition"
								>
									<MdClose className="h-6 w-6" />
								</button>
							</div>

							{/* Form */}
							<div className="p-8 max-w-md mx-auto   ">

								<input type="file" accept="application/pdf" onChange={(e) => setPdfReport(e.target.files[0])} />
								<button
									onClick={() => UploadDetailedReport(taskID, formData)}
									className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
								>
									Upload
								</button>

							</div>
						</div>
					</div>
				)}

				<div className="flex justify-between items-center py-16">
					<button
						className={`px-4 py-2 bg-[#015289] text-white border rounded-md ${taskPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
						disabled={taskPage === 1}
						onClick={() => setTaskPage(taskPage - 1)}
					>
						Previous
					</button>
					<span>
						Page {taskPage}
						{/* of {totalPages} */}
					</span>
					<button
						className={`px-4 py-2 border rounded-md  text-white bg-[#015289]`}
						disabled={paginatedData?.length < 10}
						onClick={() => setTaskPage(taskPage + 1)}
					>
						Next
					</button>
				</div>
			</div>}
		</Suspense>
	);
}
