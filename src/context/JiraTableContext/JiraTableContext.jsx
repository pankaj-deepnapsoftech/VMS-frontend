/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "..";
import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const JiraContext = createContext();

const JiraContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [datafetchCount, setdatafetchCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const { token } = useAuthContext();

  const [jiraData, setJiraData] = useState([]);
  const [ConfigData, setConfigData] = useState([]);

  const JiraData = async () => {
    console.log("jira   data");
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/jira/issues?page=${page}&limit=10");
      setJiraData(res.data?.newData);



      console.log("jira data", res.data.newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const JiraConfigData = async () => {
    setLoading(true);
    try {
      const res = await AxiosHandler.get("/jira/get-jira-config");
      setConfigData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const JiraConfiguration = async (data) => {
    const toastId = toast.loading("Loading...");

    try {
      const res = await AxiosHandler.post("/jira/create-jira-config", data);

      navigate("/jira-data");
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      //console.log(error)
      toast.dismiss(toastId);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong please try again..."
      );
    }
  };

  const UploadJiraData = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      const formData = new FormData();
      formData.append("excel-jira", data);
      const res = await AxiosHandler.post("/jira/upload-data", formData);
      JiraManualData();
      toast.dismiss(toastId);
      toast.success(res?.data?.message);
    } catch (error) {
      //console.log(error)
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
  };

  const JiraManualData = async (page) => {
    console.log("jira manual data");
    setLoading(true);
    try {
      const res = await AxiosHandler.get(
        `/jira/get-jira-data?page=${page}&limit=10`
      );

      setJiraData(res.data?.data);
      console.log("JiraManualData",res.data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteMultipleData = async (id) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await AxiosHandler.post(`/jira/multidelete-jira-data`, {
        id
      });
      JiraManualData();
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error)
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
  };

  const DeleteData = async (id) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await AxiosHandler.delete(`/jira/delete-jira-data/${id}`);
      JiraManualData();
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error)
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
  };
  const UpdateData = async (id,data) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await AxiosHandler.put(`/jira/update-jira-data/${id}`,data);
      JiraManualData();
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error)
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
  };

  // useEffect(() => {
  // 	if (token) {
  // 		JiraData()
  // 		JiraConfigData()
  // 	}
  // }, [token, page])

  return (
    <JiraContext.Provider
      value={{
        loading,
        jiraData,
        page,
        setPage,
        ConfigData,
        JiraConfiguration,
        datafetchCount,
        setdatafetchCount,
        JiraData,
        JiraConfigData,
        UploadJiraData,
        JiraManualData,
        DeleteMultipleData,
        DeleteData,
        UpdateData
      }}
    >
      {children}
    </JiraContext.Provider>
  );
};

export default JiraContextProvider;
