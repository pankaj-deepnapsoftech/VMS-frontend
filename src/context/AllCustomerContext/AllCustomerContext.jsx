import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";


export const AllCustomerContext = createContext();




const AllCustomerContextProvider = ({ children }) => {


	const [loading, setLoading] = useState(false);
	const [AllCustomersData, SetAllCustomerData] = useState([]);


	const [page, setPage] = useState(1)
	const { token } = useAuthContext()

	const AllCustomers = async () => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get(`/auth/all-ciso?page=${page}&limit=10`);
			console.log(res.data)
			SetAllCustomerData(res.data.data);

		} catch (error) {
			console.log(error)

		} finally {
			setLoading(false);
		}
	}


	useEffect(() => {
		if (token) {
			AllCustomers();
		}
	}, [token, page])

	return (
		<AllCustomerContext.Provider value={{
			loading,
			AllCustomersData,
			page,
			setPage,

		}}>
			{children}
		</AllCustomerContext.Provider>
	)
}

export default AllCustomerContextProvider