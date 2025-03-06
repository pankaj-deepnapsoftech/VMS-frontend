import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";


export const AllEmployeeContext = createContext();




const AllEmployeeContextProvider = ({ children }) => {


	const [datafetchCount, setdatafetchCount] = useState(0)

	const [loading, setLoading] = useState(false);
	const [allEmployeesData, SetAllEmployeesData] = useState([]);
	const [employeeTasksData, setEmployeeTasksData] = useState([]);
	const [employeeCardData, setEmployeeCardData] = useState([]);


	const [page, setPage] = useState(1)
	const [taskPage, setTaskPage] = useState(1)

	const { token, authenticate } = useAuthContext()

	const AllEmployee = async () => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get(`/auth/all-employee?page=${page}&limit=10`);
			SetAllEmployeesData(res.data?.users);

		} catch (error) {
			console.log(error)

		} finally {
			setLoading(false);
		}
	}

	const AllClientSME = async () => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get(`/auth/all-sme?page=${page}&limit=10`);
			SetAllEmployeesData(res.data.data);

		} catch (error) {
			console.log(error)

		} finally {
			setLoading(false);
		}
	}


	const EmployeeTasks = async () => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get(`employee/get-employee-task?page=${taskPage}&limit=10`);
			setEmployeeTasksData(res.data.data);

		} catch (error) {
			console.log(error)

		} finally {
			setLoading(false);
		}
	}

	const EmployeeData = async () => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get(`employee/emp-data`);
			console.log("employee Data ", res.data)
			setEmployeeCardData(res.data);

		} catch (error) {
			console.log(error)

		} finally {
			setLoading(false);
		}
	}


	const VerifyEmployee = async (id) => {

		const toastId = toast.loading("Loading...");
		try {
			const res = await AxiosHandler.patch(`/auth/verify-employee/${id}`);
			toast.dismiss(toastId);
			toast.success(res.data.message);
			authenticate?.role === "ClientCISO" ? AllClientSME() : EmployeeData();

		} catch (error) {
			console.log(error)
			toast.dismiss(toastId);
			toast.error(error?.response?.data?.message);

		}
	}


	const UploadDetailedReport = async (id, data) => {
		console.log(data, "pdf data")
		const toastId = toast.loading("Loading...");
		try {
			const res = await AxiosHandler.post(`/data/upload-pdf/${id}`, data);
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
			authenticate?.role === "ClientCISO" ? AllClientSME() : AllEmployee();
			EmployeeTasks();
			EmployeeData();
		}
	}, [token, page, taskPage, authenticate?.role])

	
	return (
		<AllEmployeeContext.Provider value={{
			loading,
			allEmployeesData,
			employeeTasksData,
			EmployeeTasks,
			VerifyEmployee,
			employeeCardData,
			page,
			setPage,
			taskPage,
			setTaskPage,
			AllClientSME,
			UploadDetailedReport,
			EmployeeData,
			datafetchCount,
			setdatafetchCount,
			AllEmployee

		}}>
			{children}
		</AllEmployeeContext.Provider>
	)
}

export default AllEmployeeContextProvider