import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";


export const DataContext = createContext();




const DataContextProvider = ({ children }) => {


    const [loading, setLoading] = useState(false);
    const { token } = useAuthContext()
    const [cardData, setCardData] = useState(null);
    const [vulnerableItemsByRiskRatingData, setVulnerableItemsByRiskRatingData] = useState(null);

    const getHomeCardData = async () => {
        try {
            const res = await AxiosHandler.get("/data/total-data-count");
            setCardData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const UploadBulkData = async (data) => {
        const toastId = toast.loading("Loading...");
        setLoading(true);
        try {
            console.log(data)
            const formData = new FormData();
            formData.append("excel", data)
            const res = await AxiosHandler.post("/data/create", formData);
            toast.dismiss(toastId);
            toast.success(res.data.message);
            getHomeCardData()

        } catch (error) {
            console.log(error)
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message);
        }
    }
    const VulnerableItemsByRiskRating = async () => {
            setLoading(true);
            try {
               
                const res = await AxiosHandler.get("/data/vulnerableItems");
                setVulnerableItemsByRiskRatingData(res.data.newData)
            } catch (error) {
                console.log(error)
                
            }
        }




    useEffect(() => {
        if (token) {
            getHomeCardData()
            VulnerableItemsByRiskRating()
        }
    }, [token])
    return (
        <DataContext.Provider value={{ cardData, UploadBulkData,vulnerableItemsByRiskRatingData }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider