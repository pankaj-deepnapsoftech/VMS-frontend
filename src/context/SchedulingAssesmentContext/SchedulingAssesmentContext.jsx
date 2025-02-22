import { AxiosHandler } from "@/config/AxiosConfig";
import { useAllEmployeeContext, useAuthContext } from "..";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";


export const AssesmentContext = createContext();




const SchedulingAssesmentContextProvider = ({ children }) => {

	const [loading, setLoading] = useState(false);
	const [allAssesmentData, setAllAssesmentData] = useState([]);
	const [testerData, setTesterData] = useState([]);
	const [dashboardData, setDashboardData] = useState([]);
	const [getOrgnizationData, setGetOrgnizationData] = useState([]);




	const [page, setPage] = useState(1)

	const { token } = useAuthContext()
	const { EmployeeTasks } = useAllEmployeeContext()




	const TotalAssessments = async () => {

		try {
			const res = await AxiosHandler.get(`/assessment/get?page=${page}&limit=10`);
			setAllAssesmentData(res.data?.data);

		} catch (error) {
			console.log(error)
		}
	}
	const DashboardData = async () => {

		try {
			const res = await AxiosHandler.get(`/assessment/DashboardData`);
			setDashboardData(res.data);

		} catch (error) {
			console.log(error)
		}
	}

	const GetOrgnization = async () => {

		try {
			const res = await AxiosHandler.get(`/employee/get-orgnization`);
			setGetOrgnizationData(res?.data?.data);

		} catch (error) {
			console.log(error)
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
			console.log(error)
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
			console.log(error)
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
			console.log(error)
			toast.dismiss(toastId);
			toast.error(error?.response?.data?.message);

		}
	}

	useEffect(() => {
		if (token) {
			TotalAssessments();
			TesterForAssessment();
			GetOrgnization();
			DashboardData()
		}
	}, [token, page])
	return (
		<AssesmentContext.Provider value={{
			SchedulingAssesment,
			allAssesmentData,
			DeleteAssesment,
			UpdateAssesment,
			testerData,
			getOrgnizationData,
			page,
			setPage,
			dashboardData
		}}>
			{children}
		</AssesmentContext.Provider>
	)
}

export default SchedulingAssesmentContextProvider