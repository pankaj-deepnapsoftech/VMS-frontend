/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
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
							<div
								key={index}
								onClick={() => {
									notificationsViewed(notification?._id);
								}}
								className={`p-3 rounded-lg flex items-center gap-3 shadow-md cursor-pointer transition-all ${isViewed ? "bg-gray-200 text-gray-600" : "bg-blue-100 text-blue-900"
									} hover:bg-blue-200`}
							>
								{/* Icon based on type */}
								{/* <span className="text-lg">
                  {notification.type === "success" ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : notification.type === "warning" ? (
                    <FaExclamationTriangle className="text-yellow-500" />
                  ) : notification.type === "error" ? (
                    <FaTimesCircle className="text-red-500" />
                  ) : (
                    <FaBell className="text-blue-500" />
                  )}
                </span> */}

								{/* Notification Title */}
								<div>
									<h2 className="font-semibold text-sm">{notification?.title}</h2>

								</div>

								{/* Viewed Badge */}
								{!isViewed ? (
									<span className="ml-auto text-xs font-bold text-white bg-red-500 px-2 py-1 rounded-full">
										New
									</span>
								) : <span className="ml-auto text-xs font-base text-blue-400  rounded-full">
									Viewed
								</span>
								}
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
