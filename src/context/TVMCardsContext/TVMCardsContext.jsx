import { createContext, useState, useEffect } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";
import { useAuthContext } from "..";

export const TVMCardsContext = createContext();

// eslint-disable-next-line react/prop-types
const TVMCardsContextProvider = ({ children }) => {

  //  exploitableVulnerabilities,twntythChart

  const { selectedYear } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const [topFiveinfraAssetCount, setTopFiveInfraAssertCount] = useState([]);
  const [topOpenVulnerabilities, setTopOpenVulnerabilities] = useState([]);
  const [topClosedVulnerabilities, setTopClosedVulnerabilities] = useState([]);
  const [topUniqueVulnerabilities, setTopUniqueVulnerabilities] = useState([]);
  const [exceptionVulnerabilities, setExceptionVulnerabilities] = useState([]);
  const [creticalHighVulnrable, setCreticalHighVulnrable] = useState([]);
  const [slaBreached, setSlaBreached] = useState([]);
  const [breachVulnerableList, setBreachVulnerableList] = useState([]);

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
    } finally {
      setLoading(false);
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
      const res = await AxiosHandler.get(`/data/tvm-fifteen-data?tenant=${tenant ? tenant : ""}&year=${year}`);
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

  const ninteenthChart = async (tenant, year) => {
    try {
      const res = await AxiosHandler.get(`/data/tvm-ninteen-data?tenant=${tenant ? tenant : ""}&year=${year}`);
      setExceptionVulnerabilities(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const seventeenthChart = async (tenant, year) => {
    try {
      const res = await AxiosHandler.get(`/data/tvm-seventeen-data?tenant=${tenant ? tenant : ""}&year=${year}`);
      setSlaBreached(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const eightteenthChart = async (tenant, year) => {
    try {
      const res = await AxiosHandler.get(`/data/tvm-eighteen-data?tenant=${tenant ? tenant : ""}&year=${year}`);
      setBreachVulnerableList(res?.data?.data);
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
        elaventhChart,
        topFiveinfraAssetCount,
        TharteenthChart,
        topOpenVulnerabilities,
        fourteenthChart,
        topClosedVulnerabilities,
        fifthteenthChart,
        topUniqueVulnerabilities,
        SixteenthChart,
        creticalHighVulnrable,
        ninteenthChart,
        exceptionVulnerabilities,
        seventeenthChart,
        eightteenthChart,
        breachVulnerableList,
        slaBreached,
      }}
    >
      {children}
    </TVMCardsContext.Provider>
  );
};

export default TVMCardsContextProvider; 