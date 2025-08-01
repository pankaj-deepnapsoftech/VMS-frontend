/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const { token } = useAuthContext();

  // useState
  const [loading, setLoading] = useState(false);
  const [TenantAllData, setTenantAllData] = useState([]);
  const [firstChartData,setFirstChartData] = useState(null);
  const [partners, setPartners] = useState([]);
  const [secondChartData,setSecondChartData] = useState(null);



  const UploadBulkData = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      const formData = new FormData();
      formData.append("excel", data);
      const res = await AxiosHandler.post("/data/create", formData);
      toast.dismiss(toastId);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error)
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };


  const GetAllTenentData = async () => {
    try {
      const res = await AxiosHandler.get("/tenant/get-all");
      const apiData = res?.data?.data || [];
      const transformedData = apiData.map((item) => ({
        value: item._id,
        label: item.company_name,
      }));
      setTenantAllData([{ value: "", label: "All" }, ...transformedData]);

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

  const GetFirstChart = async (tenant) => {
    try {
      const res = await AxiosHandler.get(`/data/tvm-first-chart?tenant=${tenant ? tenant : ""}`);
      setFirstChartData(res?.data);
    } catch (error) {
      console.error(error);
    }
  };


   const GetSecondChart = async (tenant) => {
    try {
      const res = await AxiosHandler.get(`/data/tvm-second-chart?tenant=${tenant ? tenant : ""}`);
      setSecondChartData(res?.data);
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    if (token) {
      GetAllTenentData();
      GetAllPartnerData()
    }
  }, [token]);
  return (
    <DataContext.Provider
      value={{
        loading,
        UploadBulkData,
        TenantAllData,
        partners,
        GetFirstChart,
        firstChartData,
        GetSecondChart,
        secondChartData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
