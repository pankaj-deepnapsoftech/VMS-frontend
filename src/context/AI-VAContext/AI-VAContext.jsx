import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import { useAuthContext } from "..";
import toast from "react-hot-toast";

export const AIVAContext = createContext({
  createAIVA: () => {},
  getAIVA: () => {},
  DeleteAIVA: () => {},
  UpdateAIVA: () => {},
});

// eslint-disable-next-line react/prop-types
const AIVAContextProvider = ({ children }) => {
  const { tenant } = useAuthContext();

  const [AIVAData, setAIVAData] = useState([]);

  const createAIVA = async (data) => {
    try {
      const res = await AxiosHandler.post(`/ai-power-scan/create`, data);
      toast.success(res.data?.message || "AI Scan created successfully!");
      setAIVAData(prev => [...prev,res.data.data])
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create AI scan");
    }
  };

  const getAIVA = async (tenant) => {
    try {
      const res = await AxiosHandler.get(
        `/ai-power-scan/get?tenant=${tenant ? tenant : ""}`
      );
      setAIVAData(res.data?.data);
    } catch (error) {
      console.log(error);
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
