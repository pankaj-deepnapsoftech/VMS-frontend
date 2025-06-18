/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [cardData, setCardData] = useState(null);
  const [vulnerableItemsByRiskRatingData, setVulnerableItemsByRiskRatingData] =
    useState([]);
  const [vulnerableItemsByAgeData, setVulnerableItemsByAgeData] = useState([]);
  const [newAndCloseVulnerableData, setNewAndCloseVulnerableData] = useState(
    []
  );
  const [closevulnerableItems, setClosevulnerableItems] = useState([]);
  const [criticalHighVulnerable, setCriticalHighVulnerable] = useState([]);
  const [criticalHighVulnerableOverdue, setCriticalHighVulnerableOverdue] =
    useState([]);

    const [exploitability,setExploitability] = useState([]);

  const { token } = useAuthContext();

  const getHomeCardData = async (creator_id) => {
    try {
      const res = await AxiosHandler.get(`/data/total-data-count?creator_id=${creator_id ? creator_id : ""}`);
      setCardData(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  


  const UploadBulkData = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      const formData = new FormData();
      formData.append("excel", data);
      const res = await AxiosHandler.post("/data/create", formData);
      toast.dismiss(toastId);
      toast.success(res?.data?.message);
      getHomeCardData();
    } catch (error) {
      console.log(error)
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }finally{
      setLoading(false);
    }
  };

  const VulnerableItemsByRiskRating = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/data/vulnerableItems");
      setVulnerableItemsByRiskRatingData(res.data.newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const VulnerableItemsByAge = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/data/VulnerableRiskRating");
      setVulnerableItemsByAgeData(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const NewAndCloseVulnerable = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/data/NewAndCloseVulnerable");
      setNewAndCloseVulnerableData(res.data.newData);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const ClosevulnerableItems = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/data/ClosevulnerableItems");
      setClosevulnerableItems(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const CriticalHighVulnerable = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/data/CriticalHighVulnerable");
      setCriticalHighVulnerable(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const CriticalHighVulnerableOverdue = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/data/CriticalHighVulnerableOverdue");
      setCriticalHighVulnerableOverdue(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const GetExploitability = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/data/TopExploitability");
      setExploitability(res.data.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
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
      GetExploitability()
    }
  }, [token]);
  return (
    <DataContext.Provider
      value={{
        loading,
        cardData,
        UploadBulkData,
        vulnerableItemsByRiskRatingData,
        vulnerableItemsByAgeData,
        newAndCloseVulnerableData,
        closevulnerableItems,
        criticalHighVulnerable,
        criticalHighVulnerableOverdue,
        exploitability,
        getHomeCardData
        
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
