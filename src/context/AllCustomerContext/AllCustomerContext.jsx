/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState, } from "react";
import toast from "react-hot-toast";


// eslint-disable-next-line react-refresh/only-export-components
export const AllCustomerContext = createContext();




const AllCustomerContextProvider = ({ children }) => {

	const [dataCount, setDataCount] = useState(0)
	const [loading, setLoading] = useState(false);
	const [AllCustomersData, SetAllCustomerData] = useState([]);
	const [allowedPaths,setAllowedPaths] = useState([]);



	const [page, setPage] = useState(1)

	const AllCustomers = async () => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get(`/auth/all-ciso?page=${page}&limit=10`);
			SetAllCustomerData(res.data.data);

		} catch (error) {
			console.log(error)


		} finally {
			setLoading(false);
		}
	}

	const AllowedPathsApi = async (id, data) => {
		setLoading(true)
		try {
			const res = await AxiosHandler.put(`/auth/path-access/${id}`, data);
			toast.success(res.data.message)
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	const getAllowedPathById = async (id) => {
		setLoading(true)
		try {
			const res = await AxiosHandler.get(`/auth/get-access-path/${id}`);
			setAllowedPaths(res.data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}


	// useEffect(() => {
	// 	if (token) {
	// 		AllCustomers();
	// 	}
	// }, [token, page])

	return (
		<AllCustomerContext.Provider value={{
			loading,
			AllCustomersData,
			AllCustomers,
			page,
			setPage,
			dataCount,
			setDataCount,
			AllowedPathsApi,
			getAllowedPathById,
			allowedPaths

		}}>
			{children}
		</AllCustomerContext.Provider>
	)
}

export default AllCustomerContextProvider