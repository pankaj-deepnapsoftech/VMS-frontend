import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const getApplicationData = async ({ page, tenant }) => {
    const res = await AxiosHandler.get(`/BusinessApplication/get?page=${page}&tenant=${tenant}`);
    return res.data?.data || [];
};

export const createApplicationData = async (data) => {
    const res = await AxiosHandler.post("/BusinessApplication/create", data);
    toast.success(res.data.message || "Business Application Created Successfully");
    return res.data;
};

export const createBulkApplicationData = async (data) => {
    const res = await AxiosHandler.post("/BusinessApplication/bulk-create", data);
    toast.success(res.data.message || "Business Application Created Successfully");
    return res.data;
};

export const deleteApplicationData = async (id) => {
    const res = await AxiosHandler.delete(`/BusinessApplication/delete/${id}`);
    toast.success(res.data.message || "Business Application Deleted Successfully");
    return res.data;
};

export const updateApplicationData = async ({id,data}) => {
   const res = await AxiosHandler.put(`/BusinessApplication/update/${id}`, data);
    toast.success(res.data.message || "Business Application Updated Successfully");
    return res.data;
};

export const getAllApplicationData = async ({tenant }) => {
    const res = await AxiosHandler.get(`/BusinessApplication/get-all?tenant=${tenant}`);
    return res.data?.data || [];
};