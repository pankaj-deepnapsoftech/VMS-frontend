/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import toast from "react-hot-toast";


// eslint-disable-next-line react-refresh/only-export-components
export const AssesmentContext = createContext();




const SchedulingAssesmentContextProvider = ({ children }) => {

	const [loading, setLoading] = useState(false);
	const [datafetchCount, setdatafetchCount] = useState(0)

	const [pendingAssessment, setPendingAssessment] = useState([]);
	const [testerData, setTesterData] = useState([]);
	const [dashboardData, setDashboardData] = useState([]);




	const [page, setPage] = useState(1)



	const getPendingAssessments = async (page,tenant) => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get(`/assessment/get?page=${page}&tenant=${tenant ? tenant : ""}`);
			console.log("this is just for testing",res.data.data)
			setPendingAssessment(res.data?.data);

		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}
	const DashboardData = async () => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get(`/assessment/DashboardData`);
			setDashboardData(res.data);

		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}



	const TesterForAssessment = async () => {

		try {
			const res = await AxiosHandler.get(`/assessment/testers-list`);
			setTesterData(res.data?.data)

		} catch (error) {
			console.log(error)
		}
	}

	const SchedulingAssesment = async (data) => {

		const toastId = toast.loading("Loading...");
		try {
			const res = await AxiosHandler.post(`/assessment/create`, data);
			getPendingAssessments();
			toast.dismiss(toastId);
			toast.success(res.data.message);

		} catch (error) {
			//console.log(error)
			toast.dismiss(toastId);
			toast.error(error?.response?.data?.message);

		}
	}

	const UpdateAssesment = async (id, data) => {
		console.log(data, "data in context ")
		const toastId = toast.loading("Loading...");
		try {
			const res = await AxiosHandler.patch(`/assessment/update/${id}`, data);

			getPendingAssessments();
			toast.dismiss(toastId);
			toast.success(res.data.message);

		} catch (error) {
			//console.log(error)
			toast.dismiss(toastId);
			toast.error(error?.response?.data?.message);

		}
	}

	const DeleteAssesment = async (id) => {

		const toastId = toast.loading("Loading...");
		try {
			const res = await AxiosHandler.delete(`/assessment/delete/${id}`);
			getPendingAssessments();

			toast.dismiss(toastId);
			toast.success(res.data.message);


		} catch (error) {
			//console.log(error)
			toast.dismiss(toastId);
			toast.error(error?.response?.data?.message);

		}
	}

	// const CreateNotifications = async (reciver_id, title) => {
	// 	console.log('notification create')
	// 	try {
	// 		const res = await AxiosHandler.post(`/notification/create`, {
	// 			reciver_id,
	// 			title,
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 		toast.error(error?.response?.data?.message);
	// 	}
	// };


	return (
		<AssesmentContext.Provider value={{
			loading,
			SchedulingAssesment,
			pendingAssessment,
			DeleteAssesment,
			UpdateAssesment,
			testerData,
			page,
			setPage,
			dashboardData,
			datafetchCount,
			setdatafetchCount,
			getPendingAssessments,
			TesterForAssessment,
			DashboardData,


			// CreateNotifications
		}}>
			{children}
		</AssesmentContext.Provider>
	)
}

export default SchedulingAssesmentContextProvider