import { FaTimesCircle, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export function NotificationSidebar({ notifications, isOpen, onClose, notificationsViewed }) {

	console.log(notifications, "@@@@@@@@@@")
	return (
		<div
			className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-10 transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"
				}`}
		>
			<div className="p-4 border-b flex justify-between items-center bg-[#015289] ">
				<h2 className="text-lg font-semibold text-gray-100">Notifications</h2>
				<button onClick={onClose} className="text-white hover:text-red-700">
					<FaTimesCircle size={20} />
				</button>
			</div>
			<div className="p-4 space-y-4">
				{notifications?.length > 0 ? (
					notifications.map((notification, index) => (
						<div
							onClick={() => notificationsViewed(notification?._id)}
							key={index}
							className={`p-3 rounded-lg flex items-center gap-3 shadow-md ${notification?.type === "success" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
								}`}
						>
							<h1>
								{notification?.title}
							</h1>

						</div>
					))
				) : (
					<p className="text-gray-600">No new notifications</p>
				)}
			</div>
		</div>
	);
}