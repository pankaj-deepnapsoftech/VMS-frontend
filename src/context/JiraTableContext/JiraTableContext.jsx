import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "..";
import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";





export const JiraContext = createContext();

const JiraContextProvider = ({ children }) => {
	let navigate = useNavigate();

	const { token } = useAuthContext()

	const [jiraData, setJiraData] = useState([])
	const [ConfigData, setConfigData] = useState([])

	const JiraData = async () => {

		try {

			const res = await AxiosHandler.get("/jira/issues");
			setJiraData(res.data.newData);
		} catch (error) {
			console.log(error)

		}
	}

	const JiraConfigData = async () => {

		try {
			const res = await AxiosHandler.get("/jira/get-jira-config");
			setConfigData(res.data.data);

		} catch (error) {
			console.log(error)
		}
	}


	const JiraConfiguration = async (data) => {
		const toastId = toast.loading("Loading...");


		try {
			const res = await AxiosHandler.post("/jira/create-jira-config", data);

			navigate("/jira-data");
			toast.dismiss(toastId);
			toast.success(res.data.message);
		} catch (error) {
			console.log(error)
			toast.dismiss(toastId);
			toast.error(error?.response?.data?.message || "something went wrong please try again...");
		}
	};


	useEffect(() => {
		if (token) {
			JiraData()
			JiraConfigData()
		}
	}, [token])

	return (
		<JiraContext.Provider value={{
			jiraData,
			ConfigData,
			JiraConfiguration
		}}>
			{children}
		</JiraContext.Provider>
	)
}


export default JiraContextProvider