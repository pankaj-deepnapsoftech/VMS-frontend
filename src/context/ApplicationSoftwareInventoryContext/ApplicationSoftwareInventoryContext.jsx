/* eslint-disable react/prop-types */
// AppSoftContext.js
import { createContext, useEffect, useState } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const ApplicationSoftwareInventoryContext = createContext();

const AppSoftContextProvider = ({ children }) => {
    const [data, SetData] = useState([])
    const [page, setPage] = useState(1)

    const AppSoftGetData = async (page) => {
        try {
            const res = await AxiosHandler.get(`/assert/get-Data?page=${page}&limit=10`)
            SetData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }


    const AppSoftSendData = async (FormValues) => {
        try {
            const res = await AxiosHandler.post("/assert/create-one", FormValues);
          if(res.status === 201){
              AppSoftGetData()
              toast.success(res?.data?.message)
          } 
        } catch (error) {
            toast.error( error);
        }
    };
    const AppSoftDeleteData = async (_id) => {

        try {
            const res = await AxiosHandler.delete(`/assert/delete/${_id}`)
            if (res.status === 200) {
                AppSoftGetData()
                toast.success(res?.data?.message)
            }
        } catch (error) {
           toast.error(error)
        }
    }

    const AppSoftUpdate = async (UpdateValues) => {
        try {
            const res = await AxiosHandler.put(`/assert/update-data/${UpdateValues._id}`, UpdateValues) 
            if (res.status === 200) {
                AppSoftGetData()
                toast.success(res?.data?.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        AppSoftGetData(page)

    }, [page])
    return (
        <ApplicationSoftwareInventoryContext.Provider
            value={{ AppSoftSendData, data, AppSoftUpdate, AppSoftDeleteData,page,setPage }}
        >
            {children}
        </ApplicationSoftwareInventoryContext.Provider>
    );
};

export default AppSoftContextProvider;
