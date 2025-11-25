/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";

export const ExceptionContext = createContext();

const ExceptionContextProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [expectionDataFiftyDays, setExpectionDataFiftyDays] = useState([]);
  const [riskRating, setRiskRating] = useState([]);
  const [deferredVulnerableItems, setDeferredVulnerableItems] = useState([]);


  const ClientExcectionDataFiftyDays = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/data/ClientExpectionDataFiftyDays");
      setExpectionDataFiftyDays(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ClientRiskRating = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/data/ClientRiskRating");
      setRiskRating(res.data.monthlyData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  

  const ClientDeferredVulnerableItems = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/data/ClientDeferredVulnerableItems");
      setDeferredVulnerableItems(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



 

  const ExceptionCreate = async (data) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.post('/expection/create', data);
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ExceptionContext.Provider
      value={{
        loading,
        page,
        setPage,
        expectionDataFiftyDays,
        riskRating,
        deferredVulnerableItems,
        ClientExcectionDataFiftyDays,
        ClientDeferredVulnerableItems,
        ClientRiskRating,
        ExceptionCreate
      }}
    >
      {children}
    </ExceptionContext.Provider>
  );
};

export default ExceptionContextProvider;
