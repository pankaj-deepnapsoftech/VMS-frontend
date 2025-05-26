import { AxiosHandler } from "@/config/AxiosConfig";
import { useState } from "react";
import { createContext, useEffect } from "react";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */




export const DeviceContext = createContext()

const DeviceProvider = ({ children }) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)

    const DevicesGetData = async (page) => {

        try {
            const res = await AxiosHandler.get(`/device/get?page=${page}&limit=10`);
            setData(res.data.data);
            
        } catch (error) {
           
            toast.error(error)
        }
    }

    const DevicesSendData = async (FormValues) => {
        try {
            const res = await AxiosHandler.post('/device/create', FormValues);
            if (res.status === 201) {
                DevicesGetData()
                toast.success(res.data.message)
            }
          
        } catch (error) {
            toast.error(error)

        }
    }


    const DevicesDeleteData = async (_id) => {
        try {
            const res = await AxiosHandler.delete(`/device/delete/${_id}`);
            if (res.status === 200) {
                DevicesGetData()
                toast.success(res.data.message)
            }
        } catch (error) {
           toast.error(error)
        }
    }

    const DeviceUpdateData = async (UpdateValues) => {
        try {
            const res = await AxiosHandler.put(`/device/update/${UpdateValues._id}`, UpdateValues)
            if (res.status === 200) {
                DevicesGetData()
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        DevicesGetData(page);
    }, [page])

    return (
        <DeviceContext.Provider value={{ DevicesSendData, data, DevicesDeleteData, DeviceUpdateData, page, setPage }}>
            {children}
        </DeviceContext.Provider>

    )
}

export default DeviceProvider;