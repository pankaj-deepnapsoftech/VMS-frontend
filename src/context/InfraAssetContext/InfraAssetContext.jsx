import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "..";


export const InfraAssetContext = createContext(); 

// eslint-disable-next-line react/prop-types
const InfraAssetContextProvider = ({ children }) => {

    const {token} = useAuthContext();
    const [businessApplication, setBusinessApplication] = useState([]);

    const [totalInfraAsset,setTotalInfraAsset] = useState([]);
    const [totalBusinessApplication, setTotalBusinessApplication] = useState([]);



  




    const GetBussinerssApplcation = async (page, tenant) => {
        try {
            const res = await AxiosHandler.get(`/BusinessApplication/get?page=${page}&tenant=${tenant}`);
            setBusinessApplication(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const CreateBulkBussinerssApplcation = async (data) => {
        try {
            const res = await AxiosHandler.post("/BusinessApplication/bulk-create", data);
            toast.success(res.data.message);
            GetBussinerssApplcation()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const CreateBussinerssApplcation = async (data) => {
        try {
            const res = await AxiosHandler.post("/BusinessApplication/create", data);
            toast.success(res.data.message);
            GetBussinerssApplcation()
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const DeleteBussinerssApplcation = async (id) => {
        try {
            const res = await AxiosHandler.delete(`/BusinessApplication/delete/${id}`);
            toast.success(res.data.message);
            GetBussinerssApplcation()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const UpdateBussinerssApplcation = async (id, data) => {
        try {
            const res = await AxiosHandler.put(`/BusinessApplication/update/${id}`, data);
            toast.success(res.data.message);
            GetBussinerssApplcation()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };

    const GetAllInfraAssetData = async(tenant) => {
        try {
            const res = await AxiosHandler.get(`/infraStructureAsset/get-all?tenant=${tenant}`);
            setTotalInfraAsset(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

     const GetAllBusinessApplication = async(tenant) => {
        try {
            const res = await AxiosHandler.get(`/BusinessApplication/get-all?tenant=${tenant}`);
            setTotalBusinessApplication(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(token){
            GetAllInfraAssetData("");
            GetAllBusinessApplication("");
        }

    }, [token]);

    return (
        <InfraAssetContext.Provider value={{
            CreateBussinerssApplcation,
            GetBussinerssApplcation,
            businessApplication,
            DeleteBussinerssApplcation,
            UpdateBussinerssApplcation,
            CreateBulkBussinerssApplcation,
            totalInfraAsset,
            totalBusinessApplication,
            GetAllInfraAssetData,
            GetAllBusinessApplication

        }} >
            {children}
        </InfraAssetContext.Provider>
    )
}


export default InfraAssetContextProvider

