/* eslint-disable react/prop-types */
import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const MailContext = createContext();

const MailContextProvider = ({ children }) => {
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
    const toastId = toast.loading("Loading...");
    try {
      const res = await AxiosHandler.post(
        `/mailing/get?tenant=${tenant ? tenant : ""}`
      );
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
  };


  const updateMailReport = async () => {
     const toastId = toast.loading("Loading...");
    try {
      const res = await AxiosHandler.post(`/mailing/update/`);
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
  }


  const deleteMailReport = async () => {
     const toastId = toast.loading("Loading...");
    try {
      const res = await AxiosHandler.post( `/mailing/delete/`);
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }

  return (
    <MailContext.Provider
      value={{
        createMailReport,
        getMailReport,
        updateMailReport,
        deleteMailReport,

      }}
    >
      {children}
    </MailContext.Provider>
  );
};

export default MailContextProvider;
