/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { useState, useEffect, createContext } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "..";

export const DeviceContext = createContext();

const DeviceProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); 
    const { token } = useAuthContext();
    

    const DevicesGetData = async (pageNum = page) => {
        setLoading(true); 
        try {
            const res = await AxiosHandler.get(`/device/get?page=${pageNum}&limit=10`);
            setData(res.data.data);
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch devices.");
        } finally {
            setLoading(false); 
        }
    };

    const DevicesSendData = async (FormValues) => {
        setLoading(true);
        try {
            const res = await AxiosHandler.post('/device/create', FormValues);
            if (res.status === 201) {
                await DevicesGetData();
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Device creation failed.");
        } finally {
            setLoading(false); 
        }
    };

    const DevicesDeleteData = async (_id) => {
        setLoading(true); 
        try {
            const res = await AxiosHandler.delete(`/device/delete/${_id}`);
            if (res.status === 200) {
                await DevicesGetData();
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error) 
            toast.error("Device deletion failed.");
        } finally {
            setLoading(false);
        }
    };

    const DeviceUpdateData = async (UpdateValues) => {
        setLoading(true); 
        try {
            const res = await AxiosHandler.put(`/device/update/${UpdateValues._id}`, UpdateValues);
            if (res.status === 200) {
                await DevicesGetData();
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error) 
            toast.error("Device update failed.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            DevicesGetData(page);
        }
    }, [page, token]);

    return (
        <DeviceContext.Provider
            value={{
                DevicesSendData,
                DevicesDeleteData,
                DeviceUpdateData,
                DevicesGetData,
                data,
                page,
                setPage,
                loading, 
                
            }}
        >
            {children}
        </DeviceContext.Provider>
    );
};

export default DeviceProvider;
