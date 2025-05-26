import { AxiosHandler } from "@/config/AxiosConfig";
import { useState } from "react";
import { createContext, useEffect } from "react";

/* eslint-disable react/prop-types */




export const DeviceContext = createContext()

const DeviceProvider = ({ children }) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)

    const DevicesGetData = async (page) => {
 
        try {
            const res = await AxiosHandler.get(`/device/get?page=${page}&limit=10`);
            setData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const DevicesSendData = async (FormValues) => {
        try {
            const res = await AxiosHandler.post('/device/create', FormValues);
            DevicesGetData()
        } catch (error) {
            console.log(error)
        }
    }


    const DevicesDeleteData = async (_id) => {
        try {
            const res = await AxiosHandler.delete(`/device/delete/${_id}`);
            console.log(res)
            DevicesGetData()
        } catch (error) {
            console.log(error)
        }
    }

    const DeviceUpdateData = async (UpdateValues)=>{
        try {
            const res = await AxiosHandler.put(`/device/update/${UpdateValues._id}`,UpdateValues)
            console.log(res.status)
            DevicesGetData();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        DevicesGetData(page);
    }, [page])    

    return (
        <DeviceContext.Provider value={{ DevicesSendData, data, DevicesDeleteData, DeviceUpdateData,page,setPage }}>
            {children}
        </DeviceContext.Provider>

    )
}

export default DeviceProvider;