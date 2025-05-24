/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useEffect, useState } from "react";



export const AssetDataContext = createContext()


const AssetDataProvider = ({ children }) => {

const [data, setData] = useState([])

    const AssetDataCreate = async (FormValue) => {
        try {
            const res = await AxiosHandler.post('/asset-data/create', FormValue);
            AssetDataGet()
        } catch (error) {
            console.log(error)
        }

    }
    const AssetDataGet = async () => {
        try {
            const res = await AxiosHandler.get('/asset-data/get');
            setData(res.data.data)
      
        } catch (error) {
            console.log(error)
        }

    }

// const AssetDataDelete = async(_id) => {
//     try {
//         const res = await AxiosHandler.delete(`/asset-data/delete/${_id}`)
//         console.log(res.status)
//         AssetDataGet()
//     } catch (error) {
//         console.log(error)
//     }
// }

useEffect(()=>{
    AssetDataGet()
},[])
    return (
        <AssetDataContext.Provider value={{ AssetDataCreate, data }}>
        {children}
       </AssetDataContext.Provider>
    )
}

export default AssetDataProvider ;