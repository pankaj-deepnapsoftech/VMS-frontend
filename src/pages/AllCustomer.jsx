import Loader from "@/components/Loader/Loader";
import { useAllCustomerContext, useAllEmployeeContext, useAuthContext } from "@/context";
import React, { useEffect, useState } from "react";

export default function AllCustomer() {

	const {
		loading,
		AllCustomersData,
		AllCustomers,
		page,
		setPage,
		setDataCount, dataCount } = useAllCustomerContext();



	const { VerifyEmployee } = useAllEmployeeContext();


	const { token } = useAuthContext()


	useEffect(() => {
		if (token && dataCount === 0) {
			AllCustomers();
			setDataCount(1)
		}
	}, [token, page, VerifyEmployee])

	useEffect(() => {

		AllCustomers();

	}, [VerifyEmployee])


	return (
		<>
			{loading ? <Loader /> : <div className="p-8 bg-white shadow-lg rounded-lg">
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
								<th className="px-4 py-3 border text-left">Organization</th>
								<th className="px-4 py-3 border text-left">Role</th>
								<th className="px-4 py-3 border text-left">Approval Status</th>
								{/* <th className="px-4 py-3 border text-left">Action</th> */}
							</tr>
						</thead>
						<tbody>
							{AllCustomersData?.map((user, index) => (
								<tr
									key={user._id}
									className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200 transition duration-200"
								>
									<td className="px-4 py-3 border">{index + 1}</td>
									<td className="px-4 py-3 border">{user?.full_name}</td>
									<td className="px-4 py-3 border">{user?.email}</td>
									<td className="px-4 py-3 border">{user?.phone}</td>
									<td className="px-4 py-3 border">{user?.Organization}</td>
									<td className="px-4 py-3 border">{user?.role}</td>
									<td className="px-4 py-3 border">
										{user?.employee_approve ? (
											<span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
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
									{/* <td className="px-4 py-3 border">
									
									)}
								</td> */}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="flex justify-between items-center my-16 px-5">
					<button
						className={`px-4 py-2 bg-[#015289] text-white border rounded-md ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
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
						className={`px-4 py-2 border rounded-md  text-white bg-[#015289]`}
						disabled={AllCustomersData?.length < 10}
						onClick={() => setPage(page + 1)}
					>
						Next
					</button>
				</div>
			</div>}
		</>
	);
}
