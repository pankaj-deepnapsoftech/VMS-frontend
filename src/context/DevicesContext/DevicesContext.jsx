import { AxiosHandler } from "@/config/AxiosConfig";
import { useState } from "react";
import { createContext, useEffect } from "react";

/* eslint-disable react/prop-types */


 

 export const DeviceContext = createContext()

const DeviceProvider = ({children}) => {
  const [data, setData] = useState([])


    const DevicesGetData = async () => {
        try {
            const res = await AxiosHandler.get('/device/get');
            setData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

   const DevicesSendData = async(FormValues) => {
    try {
        const res = await AxiosHandler.post('/device/create',FormValues);
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

   useEffect(()=>{
       DevicesGetData()
   },[])

    return (
        <DeviceContext.Provider value={{ DevicesSendData, data, DevicesDeleteData }}>
    {children}
   </DeviceContext.Provider>

    )
}

export default DeviceProvider ;