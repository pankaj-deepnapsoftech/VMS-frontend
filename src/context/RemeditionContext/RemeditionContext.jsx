import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "..";
import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";





export const RemeditionContext = createContext();

const RemeditionContextProvider = ({ children }) => {
	let navigate = useNavigate();


	const [page, setPage] = useState(1)
	const { token } = useAuthContext()

	const [targetStatusData, setTargetStatusData] = useState([])
	const [dataViaStatus, setDataViaStatus] = useState([])




	const JiraDataTargetsStatus = async () => {

		try {

			const res = await AxiosHandler.get("/jira/JIraDataTargetsStatus");
			console.log(res.data, "!!!!!!!!!!!!!!!!!!!!!!")
			setTargetStatusData(res.data);
		} catch (error) {
			console.log(error)

		}
	}

	const JiraDataViaStatus = async () => {

		try {
			const res = await AxiosHandler.get("/jira/JIraDataViaStatus");
			console.log(res.data.obj, "@@@@@@@@@@@@@@@@")
			setDataViaStatus(res?.data?.obj);

		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (token) {
			JiraDataTargetsStatus()
			JiraDataViaStatus()

		}
	}, [token])

	return (
		<RemeditionContext.Provider value={{
			dataViaStatus,
			targetStatusData

		}}>
			{children}
		</RemeditionContext.Provider>
	)
}


export default RemeditionContextProvider