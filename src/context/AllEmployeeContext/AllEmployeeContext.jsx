import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";


export const AllEmployeeContext = createContext();




const AllEmployeeContextProvider = ({ children }) => {


	const [loading, setLoading] = useState(false);
	const [allEmployeesData, SetAllEmployeesData] = useState([]);

	const { token } = useAuthContext()

	const AllEmployee = async () => {

		try {
			const res = await AxiosHandler.get(`/auth/all-employee`);
			SetAllEmployeesData(res.data.users);

		} catch (error) {
			console.log(error)

		}
	}


	const VerifyEmployee = async (id) => {
		const toastId = toast.loading("Loading...");
		try {
			const res = await AxiosHandler.patch(`/auth/verify-employee/${id}`);
			SetAllEmployeesData()
			toast.dismiss(toastId);
			toast.success(res.data.message);
			AllEmployee();

		} catch (error) {
			console.log(error)
			toast.dismiss(toastId);
			toast.error(error?.response?.data?.message);

		}
	}




	useEffect(() => {
		if (token) {
			AllEmployee();
		}
	}, [token])
	return (
		<AllEmployeeContext.Provider value={{
			allEmployeesData,
			VerifyEmployee

		}}>
			{children}
		</AllEmployeeContext.Provider>
	)
}

export default AllEmployeeContextProvider