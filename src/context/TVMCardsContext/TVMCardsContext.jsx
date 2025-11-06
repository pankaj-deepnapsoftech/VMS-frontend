import { createContext, useState} from "react";
import { AxiosHandler } from "@/config/AxiosConfig";

export const TVMCardsContext = createContext();

// eslint-disable-next-line react/prop-types
const TVMCardsContextProvider = ({ children }) => {

  //  exploitableVulnerabilities,twntythChart

  const [loading, setLoading] = useState(false);

  const [topFiveinfraAssetCount, setTopFiveInfraAssertCount] = useState([]);
  const [topOpenVulnerabilities, setTopOpenVulnerabilities] = useState([]);
  const [topClosedVulnerabilities, setTopClosedVulnerabilities] = useState([]);
  const [topUniqueVulnerabilities, setTopUniqueVulnerabilities] = useState([]);
  const [exceptionVulnerabilities, setExceptionVulnerabilities] = useState([]);
  const [creticalHighVulnrable, setCreticalHighVulnrable] = useState([]);
  const [slaBreached, setSlaBreached] = useState([]);
  const [breachVulnerableList, setBreachVulnerableList] = useState([]);




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



 

  return (
    <TVMCardsContext.Provider
      value={{
        loading,
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