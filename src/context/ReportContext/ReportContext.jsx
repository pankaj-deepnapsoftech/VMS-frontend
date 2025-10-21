import { createContext, useState } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";

export const ReportContext = createContext({
  riskQuantification: () => {},
  GetRiskData: () => {},
  riskQuantificationData: [],
  loading: false,
  dasboardData: null,
  assetInventory: null,
});

// eslint-disable-next-line react/prop-types
const ReportContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [riskQuantificationData, setRiskQuantificationData] = useState([]);
  const [dasboardData, setDashboardData] = useState(null);
  const [assetInventory, setAssetInventory] = useState(null);

  const [page, setPage] = useState(1);

  const riskQuantification = async (tenant, page) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(
        `/data/risk-quantification?page=${page}&tenant=${tenant ? tenant : ""}`
      );
      setRiskQuantificationData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const GetRiskData = async (tenant) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(
        `/vroc/risk-score?tenant=${tenant ? tenant : ""}`
      );
      setDashboardData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const GetAssetInventory = async (selectedYear) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(
        `/vroc/assert-inventory?selectedYear=${
          selectedYear ? selectedYear : ""
        }`
      );
      setAssetInventory(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReportContext.Provider
      value={{
        loading,
        page,
        setPage,
        riskQuantification,
        riskQuantificationData,
        GetRiskData,
        dasboardData,
        GetAssetInventory,
        assetInventory,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export default ReportContextProvider;
