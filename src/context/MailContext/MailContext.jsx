/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useEffect, useState, } from "react";
import toast from "react-hot-toast";

export const MailContext = createContext();


const MailContextProvider = ({ children }) => {
  const [scheduleMailData, setscheduleMailData] = useState()
  const createMailReport = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await AxiosHandler.post(`/mailing/create`, data);
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
  };

  const getMailReport = async (tenant) => {
    try {
      const res = await AxiosHandler.get(
        `/mailing/get?tenant=${tenant ? tenant : ""}`
      );
      setscheduleMailData(res?.data?.data)
     
    } catch (error) {
      console.log(error);
    }
  };

  const updateMailReport = async (id,data) => {
     const toastId = toast.loading("Loading...");
    try {
      const res = await AxiosHandler.put(`/mailing/update/${id}`,data);
      toast.dismiss(toastId);
      toast.success(res.data.message);
      getMailReport()
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
  }


  const deleteMailReport = async (id) => {
     const toastId = toast.loading("Loading...");
    try {
      const res = await AxiosHandler.post( `/mailing/delete/${id}`);
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
  }


  return (
    <MailContext.Provider
      value={{
        createMailReport,
        getMailReport,
        updateMailReport,
        deleteMailReport,
        scheduleMailData
      }}
    >
      {children}
    </MailContext.Provider>
  );
};

export default MailContextProvider;
