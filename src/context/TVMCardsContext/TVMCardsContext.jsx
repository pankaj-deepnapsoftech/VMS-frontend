import { createContext, useState, useEffect } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import toast from "react-hot-toast";

export const TVMCardsContext = createContext();

// eslint-disable-next-line react/prop-types
const TVMCardsContextProvider = ({ children }) => {

  const { selectedYear } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [topFiveRisk, setTopFiveRisk] = useState([])
  const [topFiveinfraAssetCount, setTopFiveInfraAssertCount] = useState([]);
  const [topOpenVulnerabilities, setTopOpenVulnerabilities] = useState([])
  const [topClosedVulnerabilities, setTopClosedVulnerabilities] = useState([])
  const [topUniqueVulnerabilities, setTopUniqueVulnerabilities] = useState([])
  const [creticalHighVulnrable, setCreticalHighVulnrable] = useState([])
  const [topHighValue, setTopHighValue] = useState([]);
  const [tvmCardsData, setTvmCardsData] = useState({
    applications: 0,
    infrastructureIPs: 0,
    totalVulnerabilities: 0,
    remediated: 0,
    exceptions: 0,
  });
  const [currentTenantId, setCurrentTenantId] = useState("");
  const { token } = useAuthContext();

  const getTVMCardsData = async (tenantId = "") => {
    setLoading(true);
    try {
      const params = tenantId ? { tenant: tenantId } : {};
      const res = await AxiosHandler.get(`/data/tvm-cards?year=${selectedYear}`, { params });
      const data = res.data;

      // Transform the API response to match the frontend structure
      setTvmCardsData({
        applications: data.businessApplication || 0,
        infrastructureIPs: data.infrastructure || 0,
        totalVulnerabilities: data.vulnerableData || 0,
        remediated: data.Remediated || 0,
        exceptions: data.expections || 0,
      });
      setCurrentTenantId(tenantId);
    } catch (error) {
      console.error("Error fetching TVM cards data:", error);
      toast.error("Failed to load dashboard data");
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

  const elaventhChart = async (tenant, year) => {

    try {
      const res = await AxiosHandler.get(`/data/tvm-elaventh-data?tenant=${tenant ? tenant : ""}&year=${year}`);
      setTopFiveInfraAssertCount(res?.data?.data);
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

  const TharteenthChart = async (tenant, year) => {
    try {
      const res = await AxiosHandler.get(`/data/tvm-tharteenth-data?tenant=${tenant ? tenant : ""}&year=${year}`);
      setTopOpenVulnerabilities(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fourteenthChart = async (tenant, year) => {
    try {
      const res = await AxiosHandler.get(`/data/tvm-fourteenth-data?tenant=${tenant ? tenant : ""}&year=${year}`);
      setTopClosedVulnerabilities(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };


  const fifthteenthChart = async (tenant, year) => {
    try {
      const res = await AxiosHandler.get(`/data/tvm-fourteenth-data?tenant=${tenant ? tenant : ""}&year=${year}`);
      setTopUniqueVulnerabilities(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };


  const SixteenthChart = async (tenant, year) => {
    try {
      const res = await AxiosHandler.get(`/data/tvm-sixteen-data?tenant=${tenant ? tenant : ""}&year=${year}`);
      setCreticalHighVulnrable(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      getTVMCardsData(selectedYear);
    }
  }, [token]);

  const refreshTVMCardsData = (tenantId = "") => {
    getTVMCardsData(tenantId);
  };

  return (
    <TVMCardsContext.Provider
      value={{
        tvmCardsData,
        loading,
        refreshTVMCardsData,
        currentTenantId,
        tenthChart,
        topFiveRisk,
        elaventhChart,
        topFiveinfraAssetCount,
        topHighValue,
        twelfthChart,
        TharteenthChart,
        topOpenVulnerabilities,
        fourteenthChart,
        topClosedVulnerabilities,
        fifthteenthChart,
        topUniqueVulnerabilities,
        SixteenthChart,
        creticalHighVulnrable

      }}
    >
      {children}
    </TVMCardsContext.Provider>
  );
};

export default TVMCardsContextProvider; 