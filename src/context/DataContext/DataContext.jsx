/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
    const [TenantAllData, setTenantAllData] = useState([])

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
      const [partners, setPartners] = useState([]);

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

  const VulnerableItemsByRiskRating = async (creator_id) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/data/vulnerableItems?creator_id=${creator_id ? creator_id : ""}`);
      setVulnerableItemsByRiskRatingData(res.data.newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const VulnerableItemsByAge = async (creator_id) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/data/VulnerableRiskRating?creator_id=${creator_id ? creator_id : ""}`);
      setVulnerableItemsByAgeData(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const NewAndCloseVulnerable = async (creator_id) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/data/NewAndCloseVulnerable?creator_id=${creator_id ? creator_id : ""}`);
      setNewAndCloseVulnerableData(res.data.newData);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const ClosevulnerableItems = async (creator_id) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/data/ClosevulnerableItems?creator_id=${creator_id ? creator_id : ""}`);
      setClosevulnerableItems(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const CriticalHighVulnerable = async (creator_id) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/data/CriticalHighVulnerable?creator_id=${creator_id ? creator_id : ""}`);
      setCriticalHighVulnerable(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const CriticalHighVulnerableOverdue = async (creator_id) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/data/CriticalHighVulnerableOverdue?creator_id=${creator_id ? creator_id : ""}`);
      setCriticalHighVulnerableOverdue(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const GetExploitability = async (creator_id) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/data/TopExploitability?creator_id=${creator_id ? creator_id : ""}`);
      setExploitability(res.data.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

    const GetAllTenentData = async () => {
    try {
      const res = await AxiosHandler.get("/tenant/get-all");
      const apiData = res?.data?.data || [];
        const transformedData = apiData.map((item) => ({
      value: item._id,
      label: item.company_name,
    }));
      setTenantAllData([{value:"",label:"All"},...transformedData]);

    } catch (error) {
      console.error(error);

    }
  };

   const GetAllPartnerData = async () => {
    try {
      const res = await AxiosHandler.get("/partner/get-all");
      setPartners(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (token) {

      console.log("this is working ")
      getHomeCardData();
      VulnerableItemsByRiskRating();
      VulnerableItemsByAge();
      NewAndCloseVulnerable();
      ClosevulnerableItems();
      CriticalHighVulnerable();
      CriticalHighVulnerableOverdue();
      GetExploitability();
      GetAllTenentData();
      GetAllPartnerData()
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
        getHomeCardData,
        VulnerableItemsByRiskRating,
        GetExploitability,
        ClosevulnerableItems,
        CriticalHighVulnerable,
        CriticalHighVulnerableOverdue,
        VulnerableItemsByAge,
        NewAndCloseVulnerable,
        TenantAllData,
        partners
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
