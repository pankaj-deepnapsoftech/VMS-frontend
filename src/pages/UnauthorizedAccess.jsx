import React from 'react';
import { IoHomeOutline, IoLogOut } from 'react-icons/io5';
import { BiErrorAlt } from 'react-icons/bi';
import { useAuthContext } from '@/context';

function UnauthorizedAccessPage() {

	const { Logout } = useAuthContext()
	return (
		<div className="min-h-screen bg-white absolute left-0 top-0 overflow-hidden">
			{/* Background Shapes - Responsive sizes */}
			<div className="absolute top-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-sky-100 rounded-full -translate-x-1/2 -translate-y-1/2" />
			<div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-red-400 rounded-full translate-x-1/3 -translate-y-1/3" />
			<div className="absolute bottom-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-pink-100 rounded-full translate-x-1/3 translate-y-1/3" />
			<div className="absolute top-1/2 left-1/2 w-16 md:w-24 h-16 md:h-24 bg-[#ffe4d6] rounded-full -translate-x-[100px] md:-translate-x-[200px] translate-y-[50px] md:translate-y-[100px]" />
			<div className="absolute bottom-1/4 right-1/4 w-12 md:w-16 h-12 md:h-16 bg-sky-200 rounded-full hidden sm:block" />

			{/* Content */}
			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10">
				<div className="flex items-center justify-center mb-4">
					<BiErrorAlt className="text-red-400 w-16 h-16 md:w-24 md:h-24" />
				</div>

				<h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
					Unauthorized Access
				</h2>
				<p className="text-sm md:text-base text-gray-600 text-center mb-8 max-w-md px-4">
					Oops! You do not have permission to access this page. It may be restricted, moved, or require Admin authorization.
				</p>
				<button
					onClick={() => Logout()}
					className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 border-2 border-gray-900 text-gray-900 text-sm md:text-base font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
				>
					<IoLogOut className="w-4 h-4 md:w-5 md:h-5 mr-2" />
					LogOut
				</button>
			</div>
		</div>
	);
}

export default UnauthorizedAccessPage;