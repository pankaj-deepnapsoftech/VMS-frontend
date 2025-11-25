import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import {useAuthStore} from "@/store/AuthStore";
import toast from "react-hot-toast";

export const AIVAContext = createContext({
  createAIVA: () => {},
  getAIVA: () => {},
  DeleteAIVA: () => {},
  UpdateAIVA: () => {},
});

// eslint-disable-next-line react/prop-types
const AIVAContextProvider = ({ children }) => {
  const { tenant } = useAuthStore();

  const [AIVAData, setAIVAData] = useState([]);



  const getAIVA = async (tenant,page) => {
    try {
      const res = await AxiosHandler.get(
        `/ai-power-scan/get?tenant=${tenant ? tenant : ""}&page=${page}`
      );
      setAIVAData(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

    const createAIVA = async (data) => {
    try {
      const res = await AxiosHandler.post(`/ai-power-scan/create`, data);
      toast.success(res.data?.message || "AI Scan created successfully!");
      getAIVA(tenant);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create AI scan");
    }
  };

  const DeleteAIVA = async (id) => {
    if (!window.confirm("Are you sure you want to delete ")) return;
    try {
      const res = await AxiosHandler.delete(`/ai-power-scan/delete/${id}`);
      toast.success(res.data.message || "Report delete Successfully");
      getAIVA(tenant)
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateAIVA = async (id, data) => {
    try {
      const res = await AxiosHandler.put(`/ai-power-scan/update/${id}`, data);
      toast.success(res.data.message || "Report delete Successfully");
      getAIVA(tenant)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AIVAContext.Provider
      value={{
        createAIVA,
        getAIVA,
        DeleteAIVA,
        UpdateAIVA,
        AIVAData
      }}
    >
      {children}
    </AIVAContext.Provider>
  );
};

export default AIVAContextProvider;
