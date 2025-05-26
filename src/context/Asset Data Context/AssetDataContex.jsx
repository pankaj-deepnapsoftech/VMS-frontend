/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useEffect, useState } from "react";



export const AssetDataContext = createContext()


const AssetDataProvider = ({ children }) => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const AssetDataCreate = async (FormValue) => {
        try {
            const res = await AxiosHandler.post('/asset-data/create', FormValue);
            AssetDataGet()
        } catch (error) {
            console.log(error)
        }

    }
    const AssetDataGet = async (page) => {
        try {
            const res = await AxiosHandler.get(`/asset-data/get?page=${page}&limit=10`);
            setData(res.data.data)

        } catch (error) {
            console.log(error)
        }

    }

    const AssetDataDelete = async(_id) => {
        try {
            const res = await AxiosHandler.delete(`/asset-data/delete/${_id}`)
            console.log(res.status)
            AssetDataGet()
        } catch (error) {
            console.log(error)
        }
    }

    const AssetDataUpdate = async (UpdateValues) => {
        try {
            const res = await AxiosHandler.put(`/asset-data/update/${UpdateValues._id}`, UpdateValues )
            console.log(res)
            if (res.status === 200) {
                AssetDataGet()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        AssetDataGet(page)
    }, [page])
    return (
        <AssetDataContext.Provider value={{ AssetDataCreate, data, AssetDataUpdate, AssetDataDelete,page,setPage }}>
            {children}
        </AssetDataContext.Provider>
    )
}

export default AssetDataProvider;