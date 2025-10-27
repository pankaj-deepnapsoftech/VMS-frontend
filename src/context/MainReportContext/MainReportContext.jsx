import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import { useAuthContext } from "..";
import toast from "react-hot-toast";

export const MainReportContext = createContext({
  GetAllReports: () => {},
  uploadReports: () => {},
  DeleteReport: () => {},
  UpdateReport: () => {},
  reportsData: [],
  downloadData: [],
});

// eslint-disable-next-line react/prop-types
const MainReportContextProvider = ({ children }) => {
  const { tenant } = useAuthContext();

  const [reportsData, setReportsData] = useState([]);

  const [downloadData, setDownloadData] = useState([]);

  const GetAllReports = async (tenant) => {
    try {
      const res = await AxiosHandler(
        `/report/get-report?tenat=${tenant ? tenant : ""}`
      );
      setReportsData(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadReports = async (data) => {
    try {
      const res = await AxiosHandler.post("/report/detailed-report", data);
      GetAllReports(tenant);
      toast.success(res.data.message || "Report Upload Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to delete ")) return;
    try {
      const res = await AxiosHandler.delete(`/report/delete-report/${id}`);
      toast.success(res.data.message || "Report delete Successfully");
      GetAllReports(tenant);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateReport = async (id, data) => {
    try {
      const res = await AxiosHandler.put(`/report/update-report/${id}`, data);
      toast.success(res.data.message || "Report delete Successfully");
      GetAllReports(tenant);
    } catch (error) {
      console.log(error);
    }
  };

  const DownloadReport = async () => {
    try {
      const res = await AxiosHandler.get(
        `/report/download-all-vulnerabilities`
      );
      setDownloadData(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainReportContext.Provider
      value={{
        GetAllReports,
        reportsData,
        uploadReports,
        DeleteReport,
        UpdateReport,
        DownloadReport,
      }}
    >
      {children}
    </MainReportContext.Provider>
  );
};

export default MainReportContextProvider;
