import React, { useState } from "react";

export default function CustomerListTable() {
	// Sample data
	const initialData = [
		{
			_id: "6790e1dfb2ceee250ddeeb14",
			full_name: "nitish",
			email: "nitishpjpt97@email.com",
			phone: "9958808447",
			role: "Employee",
			employee_approve: true,
			Allowed_path: [],
		},
		{
			_id: "6794d67e1bd9a27a56b0a967",
			full_name: "hero",
			email: "hero@mail.com",
			phone: "7894561230",
			role: "Employee",
			employee_approve: false,
			Allowed_path: [],
		},
	];

	const [customers, setCustomers] = useState(initialData); // State for managing customer data

	// Function to handle customer verification
	const verifyCustomer = async (customerId) => {
		try {
			// Mock API call for customer verification
			const response = await fetch(`/api/verify-customer/${customerId}`, {
				method: "POST",
			});

			if (response.ok) {
				alert("Customer Verified Successfully!");

				// Update state to reflect the change in `employee_approve`
				setCustomers((prevCustomers) =>
					prevCustomers.map((customer) =>
						customer._id === customerId
							? { ...customer, employee_approve: true }
							: customer
					)
				);
			} else {
				alert("Failed to verify customer!");
			}
		} catch (error) {
			console.error("Error verifying customer:", error);
			alert("Error occurred while verifying customer!");
		}
	};

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg">
			{/* Table Header */}
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-lg font-semibold text-gray-700">All Customers</h1>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="table-auto w-full border-collapse border border-gray-200">
					<thead className="bg-[#015289]  text-white">
						<tr>
							<th className="px-4 py-3 border text-left">Sl</th>
							<th className="px-4 py-3 border text-left">Full Name</th>
							<th className="px-4 py-3 border text-left">Email</th>
							<th className="px-4 py-3 border text-left">Phone</th>
							<th className="px-4 py-3 border text-left">Role</th>
							<th className="px-4 py-3 border text-left">Approval Status</th>
							<th className="px-4 py-3 border text-left">Action</th>
						</tr>
					</thead>
					<tbody>
						{customers.map((user, index) => (
							<tr
								key={user._id}
								className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200 transition duration-200"
							>
								<td className="px-4 py-3 border">{index + 1}</td>
								<td className="px-4 py-3 border">{user.full_name}</td>
								<td className="px-4 py-3 border">{user.email}</td>
								<td className="px-4 py-3 border">{user.phone}</td>
								<td className="px-4 py-3 border">{user.role}</td>
								<td className="px-4 py-3 border">
									{user.employee_approve ? (
										<span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
											Approved
										</span>
									) : (
										<span className="px-3 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full">
											Pending
										</span>
									)}
								</td>
								<td className="px-4 py-3 border">
									{!user.employee_approve && (
										<button
											onClick={() => verifyCustomer(user._id)}
											className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
										>
											Verify
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
