/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import toast from "react-hot-toast";


// eslint-disable-next-line react-refresh/only-export-components
export const AssesmentContext = createContext();




const SchedulingAssesmentContextProvider = ({ children }) => {

	const [loading, setLoading] = useState(false);
	const [datafetchCount, setdatafetchCount] = useState(0)

	const [allAssesmentData, setAllAssesmentData] = useState([]);
	const [testerData, setTesterData] = useState([]);
	const [dashboardData, setDashboardData] = useState([]);




	const [page, setPage] = useState(1)



	const TotalAssessments = async (page,tenant) => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get(`/assessment/get?page=${page}&limit=10&tenant=${tenant ? tenant : ""}`);
			console.log(res.data.data)
			setAllAssesmentData(res.data?.data);

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
			TotalAssessments();
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

			TotalAssessments();
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
			TotalAssessments();

			toast.dismiss(toastId);
			toast.success(res.data.message);


		} catch (error) {
			//console.log(error)
			toast.dismiss(toastId);
			toast.error(error?.response?.data?.message);

		}
	}

	const CreateNotifications = async (reciver_id, title) => {
		console.log('notification create')
		try {
			const res = await AxiosHandler.post(`/notification/create`, {
				reciver_id,
				title,
			});
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
		}
	};


	return (
		<AssesmentContext.Provider value={{
			loading,
			SchedulingAssesment,
			allAssesmentData,
			DeleteAssesment,
			UpdateAssesment,
			testerData,
			page,
			setPage,
			dashboardData,
			datafetchCount,
			setdatafetchCount,
			TotalAssessments,
			TesterForAssessment,
			DashboardData,


			CreateNotifications
		}}>
			{children}
		</AssesmentContext.Provider>
	)
}

export default SchedulingAssesmentContextProvider