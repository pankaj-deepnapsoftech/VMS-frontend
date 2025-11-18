import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import { useAuthContext } from "..";
import toast from "react-hot-toast";

export const MainReportContext = createContext({
  uploadReports: () => {},
  DeleteReport: () => {},
  UpdateReport: () => {},
  DownloadReport: () => {},
  downloadData: [],
});

// eslint-disable-next-line react/prop-types
const MainReportContextProvider = ({ children }) => {
  const { tenant } = useAuthContext();


  const [downloadData, setDownloadData] = useState([]);








  const DownloadReport = async (tenant) => {
    try {
      const res = await AxiosHandler.get(`/report/download-all-vulnerabilities?tenant=${tenant ? tenant : ""}`);
      setDownloadData(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainReportContext.Provider
      value={{
        DownloadReport,
        downloadData
      }}
    >
      {children}
    </MainReportContext.Provider>
  );
};

export default MainReportContextProvider;
