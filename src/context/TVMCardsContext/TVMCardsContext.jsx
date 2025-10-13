import { createContext, useState, useEffect } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";
import toast from "react-hot-toast";

export const TVMCardsContext = createContext();

// eslint-disable-next-line react/prop-types
const TVMCardsContextProvider = ({ children }) => {

  const {selectedYear} = useAuthContext();
  const [loading, setLoading] = useState(false);
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
      }}
    >
      {children}
    </TVMCardsContext.Provider>
  );
};

export default TVMCardsContextProvider; 