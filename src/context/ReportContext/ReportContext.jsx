import { createContext, useState, useEffect, useCallback } from "react";
import { useAuthContext } from "..";
import { AxiosHandler } from "@/config/AxiosConfig";

export const ReportContext = createContext();

const ReportContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  
  const [page, setPage] = useState(1); // Pagination support if needed
  const { token } = useAuthContext();

 
// commented this code because the fetchReportData component not present
  // useEffect(() => {
  //   fetchReportData(); // Fetch reports when component mounts
  // }, [fetchReportData]);

  return (
    <ReportContext.Provider value={{ loading, fetchReportData, page, setPage }}>
      {children}
    </ReportContext.Provider>
  );
};

export default ReportContextProvider;
