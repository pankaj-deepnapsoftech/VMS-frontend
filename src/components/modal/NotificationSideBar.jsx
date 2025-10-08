/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { FaTimesCircle, FaBell } from "react-icons/fa";

export function NotificationSidebar({ notifications, isOpen, onClose, notificationsViewed }) {



	let notificationcount = notifications?.filter(notification => !notification.view).length || 0;

	const sidebarRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target)
			) {
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

	return (
		<div
			ref={sidebarRef}
			className={`fixed top-0 right-0 h-full w-80 bg-cards shadow-lg z-10 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
				}`}
		>
			{/* Header */}
			<div className="p-4 border-b flex justify-between items-center bg-gradient-custom">
				<FaBell className="w-6 h-6 text-white" />
				<h2 className="text-lg font-semibold text-white">Notifications {notificationcount < 1 ? "" : `(${notificationcount})`}</h2>
				<button onClick={onClose} className="text-white hover:text-red-400 transition">
					<FaTimesCircle size={22} />
				</button>
			</div>

			{/* Notifications List */}
			<div className="p-4 space-y-3 overflow-y-auto max-h-[80vh]">
				{notifications?.length > 0 ? (
					notifications.map((notification, index) => {
						const isViewed = notification?.view;
						return (

							<div key={index} className="bg-modalBg hover:bg-gray-800 border border-gray-800 p-3 rounded-lg shadow-md cursor-pointer transition-all text-gray-200" >

								<div
									
									onClick={() => {
										notificationsViewed(notification?._id);
									}}
									className={` flex items-center gap-3  `}
								>

									{/* Notification Title */}
									<div>
										<h2 className="font-semibold text-sm">{notification?.title}</h2>

									</div>

									{/* Viewed Badge */}
									{!isViewed ? (
										<span className="ml-auto text-xs font-base text-red-400  rounded-full">
											New
										</span>
									) : <span className="ml-auto text-xs font-base text-blue-400  rounded-full">
										Viewed
									</span>
									}


								</div>
								<div>
									<button>Approve</button>
									<button>Reject</button>
								</div>
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
