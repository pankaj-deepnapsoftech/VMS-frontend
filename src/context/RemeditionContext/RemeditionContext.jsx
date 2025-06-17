/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "..";
import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";





export const RemeditionContext = createContext();

const RemeditionContextProvider = ({ children }) => {
	let navigate = useNavigate();

	const [datafetchCount, setdatafetchCount] = useState(0)
	const [page, setPage] = useState(1)
	const { token, authenticate } = useAuthContext()

	const [targetStatusData, setTargetStatusData] = useState([])
	const [dataViaStatus, setDataViaStatus] = useState([])
	const [criticalVulnerabilitycountData, setCriticalVulnerabilitycount] = useState([])




	const JiraDataTargetsStatus = async () => {
		try {

			const res = await AxiosHandler.get(`/jira/JIraDataTargetsStatus?userid=${authenticate._id}`);
			setTargetStatusData(res.data);
		} catch (error) {
			console.log(error)

		}
	}

	const JiraDataViaStatus = async () => {
		try {
			const res = await AxiosHandler.get(`/jira/JIraDataViaStatus?userid=${authenticate._id}`);
			setDataViaStatus(res?.data?.obj);

		} catch (error) {
			console.log(error)
		}
	}


	const CriticalVulnerabilitycount = async () => {

		try {
			const res = await AxiosHandler.get("/employee/employee-count");
			setCriticalVulnerabilitycount(res?.data?.data);

		} catch (error) {
			console.log(error)
		}
	}

	// useEffect(() => {
	// 	if (token) {
	// 		JiraDataTargetsStatus()
	// 		JiraDataViaStatus()
	// 		CriticalVulnerabilitycount()

	// 	}
	// }, [token])

	return (
		<RemeditionContext.Provider value={{
			dataViaStatus,
			targetStatusData,
			criticalVulnerabilitycountData,
			datafetchCount,
			setdatafetchCount,
			JiraDataTargetsStatus,
			JiraDataViaStatus,
			CriticalVulnerabilitycount

		}}>
			{children}
		</RemeditionContext.Provider>
	)
}


export default RemeditionContextProvider