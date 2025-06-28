import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import toast from "react-hot-toast";


export const InfraAssetContext = createContext();

// eslint-disable-next-line react/prop-types
const InfraAssetContextProvider = ({ children }) => {

    const [infraAssetdata, setInfraAssetdata] = useState([]);
    const [businessApplication, setBusinessApplication] = useState([]);

    const GetInfraAsset = async () => {
        try {
            const res = await AxiosHandler.get("/infraStructureAsset/get");
            setInfraAssetdata(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    

    const CreateInfraAsset = async (data) => {
        try {
            const res = await AxiosHandler.post("/infraStructureAsset/create", data);
            toast.success(res.data.message);
            GetInfraAsset()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const CreateBulkInfraAsset = async (data) => {
        try {
            const res = await AxiosHandler.post("/infraStructureAsset/bulk-create", data);
            toast.success(res.data.message);
            GetInfraAsset()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const DeleteInfraAsset = async (id) => {
        try {
            const res = await AxiosHandler.delete(`/infraStructureAsset/delete/${id}`);
            toast.success(res.data.message);
            GetInfraAsset()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const UpdateInfraAsset = async (id, data) => {
        try {
            const res = await AxiosHandler.put(`/infraStructureAsset/update/${id}`, data);
            toast.success(res.data.message);
            GetInfraAsset()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };



    const GetBussinerssApplcation = async () => {
        try {
            const res = await AxiosHandler.get("/BusinessApplication/get");
            setBusinessApplication(res.data.data)
        } catch (error) {
            console.log(error);
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


    return (
        <InfraAssetContext.Provider value={{
            CreateInfraAsset,
            GetInfraAsset,
            infraAssetdata,
            DeleteInfraAsset,
            UpdateInfraAsset,
            CreateBussinerssApplcation,
            GetBussinerssApplcation,
            businessApplication,
            DeleteBussinerssApplcation,
            UpdateBussinerssApplcation,
            CreateBulkInfraAsset
        }} >
            {children}
        </InfraAssetContext.Provider>
    )
}


export default InfraAssetContextProvider

