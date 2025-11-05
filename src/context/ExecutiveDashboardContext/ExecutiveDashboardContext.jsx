import { createContext, useState } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";

// eslint-disable-next-line react-refresh/only-export-components
export const ExecutiveDashboardContext = createContext({
  riskQuantification: () => { },
  GetRiskData: () => { },
  riskQuantificationData: [],
  loading: false,
  assetInventory: null,
  GetFinancialExposure: () => { },
  GetTopRiskIndicator: () => { },
  GetRiskTrend: () => { },
  GetRemediationWorkflow: () => { },
  GetAttackExposure: () => { },
  financialExposure: null,
  topFiveRiskIndicatorData: [],
  remidationWorkflow: null,
});

// eslint-disable-next-line react/prop-types
const ExecutiveDashboardContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [riskQuantificationData, setRiskQuantificationData] = useState([]);
  const [topFiveRiskIndicatorData, setTopFiveRiskIndicator] = useState([]);
  const [remidationWorkflow, setRemidationWorkflow] = useState(null);
  const [attackExposureData, setAttackExposureData] = useState(null);
  const [topFiveRisk, setTopFiveRisk] = useState([]);
  const [topHighValue, setTopHighValue] = useState([]);
  const [exploitableVulnerabilities, setExploitableVulnerabilities] = useState([]);

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






  const GetTopRiskIndicator = async (tenant, selectedYear) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/vroc/top-risk-indicator?year=${selectedYear ? selectedYear : ""}&tenant=${tenant ? tenant : ""}`);
      setTopFiveRiskIndicator(res.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const GetRemediationWorkflow = async (tenant, selectedYear) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/vroc/remediation-workflow?year=${selectedYear ? selectedYear : ""}&tenant=${tenant ? tenant : ""}`);
      setRemidationWorkflow(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const GetAttackExposure = async (tenant, selectedYear) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/vroc/attack-exposure?year=${selectedYear ? selectedYear : ""}&tenant=${tenant ? tenant : ""}`);
      setAttackExposureData(res.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const tenthChart = async (tenant, year) => {

    try {
      const res = await AxiosHandler.get(`/data/tvm-thenth-data?tenant=${tenant ? tenant : ""}&year=${year}`);
      setTopFiveRisk(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const twelfthChart = async (tenant, year) => {
    try {
      const res = await AxiosHandler.get(`/data/tvm-twelfth-data?tenant=${tenant ? tenant : ""}&year=${year}`);
      setTopHighValue(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const twntythChart = async (tenant, year) => {
      try {
        const res = await AxiosHandler.get(`/data/tvm-twntyth-data?tenant=${tenant ? tenant : ""}&year=${year}`);
        setExploitableVulnerabilities(res?.data?.data);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <ExecutiveDashboardContext.Provider
      value={{
        loading,
        page,
        setPage,
        riskQuantification,
        riskQuantificationData,
        GetTopRiskIndicator,
        topFiveRiskIndicatorData,
        GetRemediationWorkflow,
        remidationWorkflow,
        GetAttackExposure,
        attackExposureData,
        topFiveRisk, tenthChart,
        topHighValue,
        twelfthChart,
        exploitableVulnerabilities,
        twntythChart
      }}
    >
      {children}
    </ExecutiveDashboardContext.Provider>
  );
};

export default ExecutiveDashboardContextProvider;
