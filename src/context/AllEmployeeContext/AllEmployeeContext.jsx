/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";


export const AllEmployeeContext = createContext();


const AllEmployeeContextProvider = ({ children }) => {


	const [datafetchCount, setdatafetchCount] = useState(0)

	const [loading, setLoading] = useState(false);
	const [employeeTasksData, setEmployeeTasksData] = useState([]);
	const [employeeCardData, setEmployeeCardData] = useState([]);
	
  const [TenantData, setTenantData] = useState([]);


	const [page, setPage] = useState(1)
	const [taskPage, setTaskPage] = useState(1)

	const { token, authenticate } = useAuthContext()



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
			//console.log("employee Data ", res.data)
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
			EmployeeData();

		} catch (error) {
			//console.log(error)
			toast.dismiss(toastId);
			toast.error(error?.response?.data?.message);

		}
	}

	const UploadDetailedReport = async (id, data) => {
		//console.log(data, "pdf data")
		const toastId = toast.loading("Loading...");
		try {
			const res = await AxiosHandler.post(`/data/upload-pdf/${id}`, data);
			toast.dismiss(toastId);
			toast.success(res.data.message);

		} catch (error) {
			//console.log(error)
			toast.dismiss(toastId);
			toast.error(error?.response?.data?.message);

		}
	}

	const DeleteUser = async (id) => {
		try {
			const res = await AxiosHandler.delete(`/auth/delete-user/${id}`);
			toast.success(res.data.message);

		} catch (error) {
			toast.error(error.response.data.message)
		}
	}

	const GetAllTenentData = async () => {
    try {
      const res = await AxiosHandler.get("/tenant/get-all");
      setTenantData(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

	useEffect(() => {
		if (token) {
			EmployeeTasks();
			EmployeeData();
			GetAllTenentData()
		}
	}, [token, page, taskPage, authenticate?.role])


	return (
		<AllEmployeeContext.Provider value={{
			loading,
			employeeTasksData,
			EmployeeTasks,
			VerifyEmployee,
			employeeCardData,
			page,
			setPage,
			taskPage,
			setTaskPage,
			UploadDetailedReport,
			EmployeeData,
			datafetchCount,
			setdatafetchCount,
			DeleteUser,
			TenantData

		}}>
			{children}
		</AllEmployeeContext.Provider>
	)
}

export default AllEmployeeContextProvider