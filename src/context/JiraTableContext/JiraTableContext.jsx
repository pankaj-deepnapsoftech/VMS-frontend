import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "..";
import { AxiosHandler } from "@/config/AxiosConfig";





export const JiraContext = createContext();

const JiraContextProvider = ({ children }) => {
	const { token } = useAuthContext()

	const [jiraData, setJiraData] = useState([])

	const JiraData = async () => {

		try {

			const res = await AxiosHandler.get("/jira/issues");
			setJiraData(res.data.newData);
			console.log(res, "%%%%%%%%%%%%")
		} catch (error) {
			console.log(error)

		}
	}


	useEffect(() => {
		if (token) {
			JiraData()
		}
	}, [token])

	return (
		<JiraContext.Provider value={{ jiraData }}>
			{children}
		</JiraContext.Provider>
	)
}


export default JiraContextProvider