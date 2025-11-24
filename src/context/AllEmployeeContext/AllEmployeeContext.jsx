// /* eslint-disable react/prop-types */
// import { AxiosHandler } from "@/config/AxiosConfig";
// import { useAuthContext } from "..";
// import { createContext, useState, useEffect } from "react";
// import toast from "react-hot-toast";


// // eslint-disable-next-line react-refresh/only-export-components
// export const AllEmployeeContext = createContext();


// const AllEmployeeContextProvider = ({ children }) => {


// 	const [datafetchCount, setdatafetchCount] = useState(0)
// 	const [EmpData, setEmpData] = useState([]);

// 	const [TenantData, setTenantData] = useState([]);


// 	const [page, setPage] = useState(1)
// 	const [taskPage, setTaskPage] = useState(1)

// 	const { token, authenticate } = useAuthContext()




// 	const GetUsers = async (page = 1,tenant) => {
// 		try {
// 			const res = await AxiosHandler.get(
// 				`/auth/all-users?page=${page}&tenant=${tenant ? tenant : ""}`
// 			);
// 			setEmpData(res?.data.data);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	const DeleteUser = async (id) => {
// 		try {
// 			const res = await AxiosHandler.delete(`/auth/delete-user/${id}`);
// 			toast.success(res.data.message);
// 			GetUsers()
// 		} catch (error) {
// 			toast.error(error.response.data.message)
// 		}
// 	}

// 	const GetAllTenentData = async () => {
// 		try {
// 			const res = await AxiosHandler.get("/tenant/get-all");
// 			setTenantData(res?.data?.data);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};



// 	useEffect(() => {
// 		if (token) {
// 			GetAllTenentData()
// 		}
// 	}, [token, page, taskPage, authenticate?.role])


// 	return (
// 		<AllEmployeeContext.Provider value={{
// 			page,
// 			setPage,
// 			taskPage,
// 			setTaskPage,
// 			datafetchCount,
// 			setdatafetchCount,
// 			DeleteUser,
// 			TenantData,
// 			GetUsers,
// 			EmpData

// 		}}>
// 			{children}
// 		</AllEmployeeContext.Provider>
// 	)
// }

// export default AllEmployeeContextProvider