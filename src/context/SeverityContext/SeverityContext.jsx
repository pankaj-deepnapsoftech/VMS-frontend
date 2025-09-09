import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "..";


export const SeverityContext = createContext({
    CreateSeverity: () => { },
    GetSeverity: () => { },
    SeverityData: [],
    UpdateSeverity: () => { },
    DeleteSeverity: () => { },
    SeverityOptions:[],
    GetSeverityDataByTenant:()=>{}
});

// eslint-disable-next-line react/prop-types
const SeverityContextProvider = ({ children }) => {

    const { token, tenant } = useAuthContext();
    const [SeverityData, setSeverityData] = useState([]);
    const [SeverityOptions,setSeverityOption] = useState([]);

   
    const CreateSeverity = async (data) => {
        try {
            const res = await AxiosHandler.post("/severity/create", data);
            setSeverityData(prevData => [res.data.data, ...prevData]);
            toast.success(res.data.message || "Severity created successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message)    
        }
    };

    const GetSeverity = async (page, tenant) => {
        try {
            const res = await AxiosHandler.get(`/severity/get?page=${page}&tenant=${tenant ? tenant : ""}`);
            setSeverityData(res.data.data);
        } catch (error) {
            console.error("Error fetching severity:", error);
        }
    }

    const UpdateSeverity = async (id, data) => {
        try {
            const res = await AxiosHandler.put(`/severity/update/${id}`, data);
            setSeverityData((prevData) =>
                prevData.map((item) => (item._id === id ? res.data.data : item))
            );
            toast.success(res.data.message || "Severity updated successfully");
        } catch (error) {
            console.error("Error fetching severity:", error);
            toast.error("Failed to update severity");
        }
    };

    const DeleteSeverity = async (id) => {
        try {
            const res = await AxiosHandler.delete(`/severity/delete/${id}`);
            setSeverityData((prevData) =>
                prevData.filter((item) => item._id !== id)
            );
            toast.success(res.data.message || "Severity deleted successfully");
        } catch (error) {
            console.error("Error deleting severity:", error);
            toast.error("Failed to delete severity");
        }
    };

    const GetSeverityDataByTenant = async (tenant) => {
        
        try {
            const res = await AxiosHandler.get(`/severity/get-by-tenant?tenant=${tenant}`);
            setSeverityOption(res?.data?.data);
        } catch (error) {
            console.error("Error fetching severity by tenant:", error);
            // toast.error("Failed to fetch severity data");
        }
    }

    useEffect(()=>{
        if(token && tenant){
            GetSeverityDataByTenant(tenant);
        }
    },[token,tenant])

    return (
        <SeverityContext.Provider value={{ CreateSeverity, GetSeverity, SeverityData, UpdateSeverity,DeleteSeverity,SeverityOptions,GetSeverityDataByTenant }}>
            {children}
        </SeverityContext.Provider>
    );
}

export default SeverityContextProvider;

