/* eslint-disable react/prop-types */
// AppSoftContext.js
import { createContext, useEffect, useState } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";


export const ApplicationSoftwareInventoryContext = createContext();

const AppSoftContextProvider = ({ children }) => {
    const [data, SetData] = useState([])


    const AppSoftGetData = async () => {
        try {
            const res = await AxiosHandler.get("/assert/get-Data")
            SetData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }


    const AppSoftSendData = async (FormValues) => {
        try {
            const res = await AxiosHandler.post("/assert/create-one", FormValues);
            AppSoftGetData()
        } catch (error) {
            console.error("Failed to send data:", error);
        }
    };
    // const AppSoftDeleteData = async (_id) => {

    //     try {
    //         const res = await AxiosHandler.delete(`/assert/delete/${_id}`)
    //         AppSoftGetData()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    useEffect(() => {
        AppSoftGetData()

    }, [])
    return (
        <ApplicationSoftwareInventoryContext.Provider
            value={{ AppSoftSendData, data }}
        >
            {children}
        </ApplicationSoftwareInventoryContext.Provider>
    );
};

export default AppSoftContextProvider;
