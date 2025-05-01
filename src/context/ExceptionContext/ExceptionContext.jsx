/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useAuthContext, useVulnerabililtyDataContext } from "..";
import { AxiosHandler } from "@/config/AxiosConfig";
import { useNavigate } from "react-router-dom";


export const ExceptionContext = createContext();

const ExceptionContextProvider = ({ children }) => {

	const [datafetchCount, setdatafetchCount] = useState(0)

	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1)


	const [expectionData, setExpectionData] = useState([])
	const [expectionDataFiftyDays, setExpectionDataFiftyDays] = useState([])
	const [riskRating, setRiskRating] = useState([])
	const [deferredVulnerableItems, setDeferredVulnerableItems] = useState([])





	const AdminExcectionDataFiftyDays = async () => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get("/data/AdminExpectionDataFiftyDays");
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
			setExpectionDataFiftyDays(res.data);
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}

	const AdminRiskRating = async () => {
		setLoading(true);
		try {

			const res = await AxiosHandler.get("/data/AdminRiskRating");
			setRiskRating(res.data.monthlyData);
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}

	const ClientRiskRating = async () => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get("/data/ClientRiskRating");
			setRiskRating(res.data.monthlyData);
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}

	const AdminDeferredVulnerableItems = async () => {
		setLoading(true);
		try {

			const res = await AxiosHandler.get("/data/AdminDeferredVulnerableItems");
			setDeferredVulnerableItems(res.data.data);
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}

	const ClientDeferredVulnerableItems = async () => {
		setLoading(true);
		try {

			const res = await AxiosHandler.get("/data/ClientDeferredVulnerableItems");
			setDeferredVulnerableItems(res.data.data);
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}

	const ExpectionData = async () => {
		setLoading(true);
		try {
			const res = await AxiosHandler.get(`/data/ExpectionApprove?page=${page}&limit=10`);
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
			const res = await AxiosHandler.get(`/data/ExpectionVerify?page=${page}&limit=10`);
			setExpectionData(res.data?.data);
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	}



	// useEffect(() => {
	// 	if (token) {

	// 		authenticate?.role === "ClientCISO" ? ExpectionData() : ExpectionVerifyData();

	// 		authenticate?.role !== "ClientCISO" ? AdminExcectionDataFiftyDays() :
	// 			ClientExcectionDataFiftyDays()

	// 		authenticate?.role !== "ClientCISO" ? AdminRiskRating() :
	// 			ClientRiskRating()

	// 		authenticate?.role !== "ClientCISO" ? AdminDeferredVulnerableItems() :
	// 			ClientDeferredVulnerableItems()
	// 	}
	// }, [token, authenticate, UpdateData,
	// 	DeleteData,])

	return (
		<ExceptionContext.Provider value={{
			expectionData,
			loading,
			page,
			setPage,
			ExpectionData,
			ExpectionVerifyData,
			expectionDataFiftyDays,
			riskRating,
			deferredVulnerableItems,
			datafetchCount,
			setdatafetchCount,
			AdminExcectionDataFiftyDays,
			ClientExcectionDataFiftyDays,
			AdminRiskRating,
			AdminDeferredVulnerableItems,
			ClientDeferredVulnerableItems,
			ClientRiskRating
		}}>
			{children}
		</ExceptionContext.Provider>
	)
}


export default ExceptionContextProvider