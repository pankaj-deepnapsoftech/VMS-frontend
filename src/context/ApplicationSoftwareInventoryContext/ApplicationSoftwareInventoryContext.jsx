/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";
import { useAuthContext } from "..";

export const ApplicationSoftwareInventoryContext = createContext();

const AppSoftContextProvider = ({ children }) => {
    const [data, SetData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const { token } = useAuthContext();

    const AppSoftGetData = async (page) => {
        setLoading(true);
        try {
            const res = await AxiosHandler.get(`/assert/get-Data?page=${page}&limit=10`);
            SetData(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); 
        }
    };

    const AppSoftSendData = async (FormValues) => {
        setLoading(true);
        try {
            const res = await AxiosHandler.post("/assert/create-one", FormValues);
            if (res.status === 201) {
                await AppSoftGetData(); // ensure fresh data after insert
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
                await AppSoftGetData();
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
               AppSoftGetData();
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error updating data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            AppSoftGetData(page);
        }
    }, [page, token]);

    return (
        <ApplicationSoftwareInventoryContext.Provider
            value={{
                AppSoftSendData,
                AppSoftDeleteData,
                AppSoftUpdate,
                AppSoftGetData,
                data,
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
