import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";


export const DataContext = createContext();




const DataContextProvider = ({ children }) => {


    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState(null);
    const [vulnerableItemsByRiskRatingData, setVulnerableItemsByRiskRatingData] = useState([]);
    const [vulnerableItemsByAgeData, setVulnerableItemsByAgeData] = useState([]);
    const [newAndCloseVulnerableData, setNewAndCloseVulnerableData] = useState([]);
    const [closevulnerableItems, setClosevulnerableItems] = useState([]);
    const [criticalHighVulnerable, setCriticalHighVulnerable] = useState([]);
    const [criticalHighVulnerableOverdue, setCriticalHighVulnerableOverdue] = useState([]);



    const { token } = useAuthContext()



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
            toast.success(res?.data?.message);
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

    const VulnerableItemsByAge = async () => {
        setLoading(true);
        try {

            const res = await AxiosHandler.get("/data/VulnerableRiskRating");
            setVulnerableItemsByAgeData(res.data);
        } catch (error) {
            console.log(error)

        }
    }


    const NewAndCloseVulnerable = async () => {
        setLoading(true);
        try {

            const res = await AxiosHandler.get("/data/NewAndCloseVulnerable");
            setNewAndCloseVulnerableData(res.data.newData);
        } catch (error) {
            console.log(error)

        }
    }

    const ClosevulnerableItems = async () => {
        setLoading(true);
        try {

            const res = await AxiosHandler.get("/data/ClosevulnerableItems");
            setClosevulnerableItems(res.data);

        } catch (error) {
            console.log(error)

        }
    }


    const CriticalHighVulnerable = async () => {
        setLoading(true);
        try {

            const res = await AxiosHandler.get("/data/CriticalHighVulnerable");
            setCriticalHighVulnerable(res.data);
        } catch (error) {
            console.log(error)

        }
    }


    const CriticalHighVulnerableOverdue = async () => {
        setLoading(true);
        try {

            const res = await AxiosHandler.get("/data/CriticalHighVulnerableOverdue");
            setCriticalHighVulnerableOverdue(res.data);
        } catch (error) {
            console.log(error)

        }
    }


    useEffect(() => {
        if (token) {

            getHomeCardData();
            VulnerableItemsByRiskRating();
            VulnerableItemsByAge();
            NewAndCloseVulnerable();
            ClosevulnerableItems();
            CriticalHighVulnerable();
            CriticalHighVulnerableOverdue();

        }
    }, [token])
    return (
        <DataContext.Provider value={{
            cardData,
            UploadBulkData,
            vulnerableItemsByRiskRatingData,
            vulnerableItemsByAgeData,
            newAndCloseVulnerableData,
            closevulnerableItems,
            criticalHighVulnerable,
            criticalHighVulnerableOverdue
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider