import { useAllCustomerContext } from "@/context";
import React, { useState } from "react";

export default function AllCustomer() {

	const { AllCustomersData } = useAllCustomerContext();


	return (
		<div className="p-6 bg-white shadow-lg rounded-lg">
			{/* Table Header */}
			<div className="flex justify-between items-center mb-4">

			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="table-auto w-full border-collapse border border-gray-200">
					<thead className="bg-[#015289]  text-white">
						<tr>
							<th className="px-4 py-3 border text-left">S No.</th>
							<th className="px-4 py-3 border text-left">Full Name</th>
							<th className="px-4 py-3 border text-left">Email</th>
							<th className="px-4 py-3 border text-left">Phone</th>
							<th className="px-4 py-3 border text-left">Role</th>


						</tr>
					</thead>
					<tbody>
						{AllCustomersData?.map((user, index) => (
							<tr
								key={user._id}
								className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200 transition duration-200"
							>
								<td className="px-4 py-3 border">{index + 1}</td>
								<td className="px-4 py-3 border">{user.full_name}</td>
								<td className="px-4 py-3 border">{user.email}</td>
								<td className="px-4 py-3 border">{user.phone}</td>
								<td className="px-4 py-3 border">{user.role}</td>


							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
