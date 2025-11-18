/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const AssesmentContext = createContext();

const SchedulingAssesmentContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [datafetchCount, setdatafetchCount] = useState(0);

  const [testerData, setTesterData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);




  const DashboardData = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get(`/assessment/DashboardData`);
      setDashboardData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const TesterForAssessment = async () => {
    try {
      const res = await AxiosHandler.get(`/assessment/testers-list`);
      setTesterData(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <AssesmentContext.Provider
      value={{
        loading,
        testerData,
        dashboardData,
        datafetchCount,
        setdatafetchCount,
        TesterForAssessment,
        DashboardData,
        // CreateNotifications
      }}
    >
      {children}
    </AssesmentContext.Provider>
  );
};

export default SchedulingAssesmentContextProvider;
