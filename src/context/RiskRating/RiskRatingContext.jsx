/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export const RiskRatingContext = createContext()

const RiskRatingProvider = ({ children }) => {
 
    const [data, setData] = useState([])

    const RiskRatingGet = async () => {
        try {
            const res = await AxiosHandler.get("/asset-risk-rating/get");
                setData(res?.data?.data)
        } catch (error) {
            toast.error(error)
        }
     
    }

    const RiskRatingCreate = async (FormValue) => {

        try {
            const res = await AxiosHandler.post("/asset-risk-rating/create", FormValue);
            if (res.status === 201) {
                RiskRatingGet();
                toast.success(res?.data?.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    const RiskRatingDelete = async (_id) => {

        try {
            const res = await AxiosHandler.delete(`/asset-risk-rating/delete/${_id}`);
            if (res.status === 200) {
                RiskRatingGet();
                toast.success(res?.data?.message)
                console.log(res)
            }
            console.log(res)
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        RiskRatingGet();
    }, []) 

    return (
        <RiskRatingContext.Provider value={{ RiskRatingCreate, RiskRatingGet, data, RiskRatingDelete }}>
            {children}
        </RiskRatingContext.Provider>
    )
}

export default RiskRatingProvider;