import { createContext, useState } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";

export const ReportContext = createContext({
  riskQuantification: () => { },
  riskQuantificationData: [],
  loading:false
});

// eslint-disable-next-line react/prop-types
const ReportContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [riskQuantificationData, setRiskQuantificationData] = useState([])

  const [page, setPage] = useState(1);


  const riskQuantification = async () => {
    setLoading(true)
    try {
      const res = await AxiosHandler.get("/data/risk-quantification");
      setRiskQuantificationData(res.data.data);
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }


  return (
    <ReportContext.Provider value={{ loading, page, setPage, riskQuantification,riskQuantificationData }}>
      {children}
    </ReportContext.Provider>
  );
};

export default ReportContextProvider;
