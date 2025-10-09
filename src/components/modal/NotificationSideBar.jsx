/* eslint-disable react/prop-types */
import { useAuthContext, useExceptionContext } from "@/context";
import React, { useEffect, useRef } from "react";
import { FaTimesCircle, FaBell } from "react-icons/fa";

export function NotificationSidebar({
	notifications,
	isOpen,
	onClose,
	notificationsViewed,
	setRejectionReasion
}) {

	const { tenant, token } = useAuthContext();
	const { UpdateExpectionData, ExpectionPendingData, expectionData } = useExceptionContext();
	let notificationcount =
		notifications?.filter((notification) => !notification.view).length || 0;

	const sidebarRef = useRef(null);


	const HandleUpdateExpection = (data) => {


		const filterExpectionData = expectionData.filter((item) => item._id === data.expection_id)[0];
		let UpdatedData = null;
		let key = "";
		if (filterExpectionData?.aprove_1?.approver === data.reciver_id) {
			UpdatedData = filterExpectionData?.aprove_1;
			key = "aprove_1";
		}

		if (filterExpectionData?.aprove_2?.approver === data.reciver_id) {
			UpdatedData = filterExpectionData?.aprove_2;
			key = "aprove_2";
		}

		if (filterExpectionData?.aprove_3?.approver === data.reciver_id) {
			UpdatedData = filterExpectionData?.aprove_3;
			key = "aprove_3";
		}
		UpdateExpectionData(data.expection_id, { [key]: { ...UpdatedData, aproved: true, status: "Approved" } });
		notificationsViewed(data?._id)
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
				onClose(); // Call parent handler to close the sidebar
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		if (token) {
			ExpectionPendingData(1, tenant);
		}
	}, [token, tenant])

	return (
		<div
			ref={sidebarRef}
			className={`fixed top-0 right-0 h-full w-80 bg-cards shadow-lg z-10 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
				}`}
		>
			{/* Header */}
			<div className="p-4 border-b flex justify-between items-center bg-gradient-custom">
				<FaBell className="w-6 h-6 text-white" />
				<h2 className="text-lg font-semibold text-white">
					Notifications {notificationcount < 1 ? "" : `(${notificationcount})`}
				</h2>
				<button
					onClick={onClose}
					className="text-white hover:text-red-400 transition"
				>
					<FaTimesCircle size={22} />
				</button>
			</div>

			{/* Notifications List */}
			<div className="p-4 space-y-3 overflow-y-auto max-h-[80vh]">
				{notifications?.length > 0 ? (
					notifications.map((notification, index) => {
						const isViewed = notification?.view;
						return (
							<div
								key={index}
								className="bg-modalBg hover:bg-gray-800 border border-gray-800 p-3 rounded-lg shadow-md cursor-pointer transition-all text-gray-200"
							>
								<div
									onClick={() => {
										notificationsViewed(notification?._id);
									}}
									className={` flex items-center gap-3  `}
								>
									{/* Notification Title */}
									<div>
										<h2 className="font-semibold text-sm">
											{notification?.title}
										</h2>
									</div>

									{/* Viewed Badge */}
									{!isViewed ? (
										<span className="ml-auto text-xs font-base text-red-400  rounded-full">
											New
										</span>
									) : (
										<span className="ml-auto text-xs font-base text-blue-400  rounded-full">
											Viewed
										</span>
									)}
								</div>
								{notification?.options && <div className="flex justify-end gap-2 mt-3">
									<button onClick={() => HandleUpdateExpection(notification)} className="px-2 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:opacity-90 transition-all duration-200 transform hover:scale-105 active:scale-95">
										Approve
									</button>
									<button onClick={() => setRejectionReasion(true)} className="px-2 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md hover:opacity-90 transition-all duration-200 transform hover:scale-105 active:scale-95">
										Reject
									</button>
								</div>}
							</div>
						);
					})
				) : (
					<p className="text-gray-500 text-center">No new notifications</p>
				)}
			</div>
		</div>
	);

}
