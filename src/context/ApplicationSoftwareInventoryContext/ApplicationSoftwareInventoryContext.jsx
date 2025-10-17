/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";

export const ApplicationSoftwareInventoryContext = createContext();

const AppSoftContextProvider = ({ children }) => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const AppSoftSendData = async (FormValues) => {
        setLoading(true);
        try {
            const res = await AxiosHandler.post("/assert/create-one", FormValues);
            if (res.status === 201) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error sending data");
        } finally {
            setLoading(false);
        }
    };

    const AppSoftDeleteData = async (_id) => {
        setLoading(true);
        try {
            const res = await AxiosHandler.delete(`/assert/delete/${_id}`);
            if (res.status === 200) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error deleting data");
        } finally {
            setLoading(false);
        }
    };

    const AppSoftUpdate = async (UpdateValues) => {
        setLoading(true);
        try {
            const res = await AxiosHandler.put(`/assert/update-data/${UpdateValues._id}`, UpdateValues);
            if (res.status === 200) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error updating data");
        } finally {
            setLoading(false);
        }
    };



    return (
        <ApplicationSoftwareInventoryContext.Provider
            value={{
                AppSoftSendData,
                AppSoftDeleteData,
                AppSoftUpdate,
                page,
                setPage,
                loading 
            }}
        >
            {children}
        </ApplicationSoftwareInventoryContext.Provider>
    );
};

export default AppSoftContextProvider;
