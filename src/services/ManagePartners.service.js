import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const getPartners = async ({ tenant, page }) => {
    const res = await AxiosHandler.get(`/partner/get?page=${page}&
    tenant=${tenant ? tenant : ""}`);
    return res.data.data || [];
}


export const createPartners = async (data) => {
    const res = await AxiosHandler.post("/partner/create", data);
    toast.success(res.data.message || "Partner created");
    return res.data;
}


export const updatePartners = async ({ id, data }) => {
    const res = await AxiosHandler.put(`/partner/update/${id}`, data);
    toast.success(res.data.message || "Partner updated successfully");
    return res.data;
}


export const deletePartners = async ({ id }) => {
    const res = await AxiosHandler.delete(`/partner/delete/${id}`);
    toast.success(res.data.message || "Partner deleted successfully");
    return res.data;
}