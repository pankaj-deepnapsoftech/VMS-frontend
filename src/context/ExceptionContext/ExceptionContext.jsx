import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "..";
import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";





export const ExceptionContext = createContext();

const ExceptionContextProvider = ({ children }) => {
	let navigate = useNavigate();


	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1)


	const { token, authenticate } = useAuthContext()

	const [expectionData, setExpectionData] = useState([])
	const [expectionDataFiftyDays, setExpectionDataFiftyDays] = useState([])





	const AdminExcectionDataFiftyDays = async () => {
		setLoading(true);
		try {

			const res = await AxiosHandler.get("/data/AdminExpectionDataFiftyDays");
			console.log(res, "exception ")
			setExpectionDataFiftyDays(res.data);
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}



	const ClientExcectionDataFiftyDays = async () => {
		setLoading(true);
		try {

			const res = await AxiosHandler.get("/data/ClientExpectionDataFiftyDays");
			console.log(res, "exception ")
			setExpectionDataFiftyDays(res.data);
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}



	const ExpectionData = async () => {
		setLoading(true);
		try {

			const res = await AxiosHandler.get("/data/ExpectionApprove");
			console.log(res, "exception ")
			setExpectionData(res.data?.data);
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}


	const ExpectionVerifyData = async () => {
		setLoading(true);
		try {

			const res = await AxiosHandler.get("/data/ExpectionVerify");

			setExpectionData(res.data?.data);
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}



	useEffect(() => {
		if (token) {

			authenticate?.role === "ClientCISO" ? ExpectionData() : ExpectionVerifyData();

			authenticate?.role === "Admin" ? AdminExcectionDataFiftyDays() :
				ClientExcectionDataFiftyDays()
		}
	}, [token, authenticate])

	return (
		<ExceptionContext.Provider value={{
			expectionData,
			loading,
			ExpectionData,
			ExpectionVerifyData,
			expectionDataFiftyDays
		}}>
			{children}
		</ExceptionContext.Provider>
	)
}


export default ExceptionContextProvider