import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";


export const AllCustomerContext = createContext();




const AllCustomerContextProvider = ({ children }) => {


	const [loading, setLoading] = useState(false);
	const [AllCustomersData, SetAllCustomerData] = useState([]);

	const { token } = useAuthContext()

	const AllCustomers = async () => {

		try {
			const res = await AxiosHandler.get(`/auth/all-users`);
			SetAllCustomerData(res.data.users);

		} catch (error) {
			console.log(error)

		}
	}


	// const UpdateData = async (data, id) => {
	// 	const toastId = toast.loading("Loading...");
	// 	try {
	// 		const res = await AxiosHandler.patch(`/data/update/${id}`, data);
	// 		AllVulnerablilty();

	// 		toast.dismiss(toastId);
	// 		toast.success(res.data.message);


	// 	} catch (error) {
	// 		console.log(error)
	// 		toast.dismiss(toastId);
	// 		toast.error(error?.response?.data?.message);

	// 	}
	// }




	useEffect(() => {
		if (token) {
			AllCustomers();
		}
	}, [token])
	return (
		<AllCustomerContext.Provider value={{
			AllCustomersData

		}}>
			{children}
		</AllCustomerContext.Provider>
	)
}

export default AllCustomerContextProvider