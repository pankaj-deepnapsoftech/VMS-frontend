import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const getSlaServices = async ({ page, tenant }) => {
    const res = await AxiosHandler.get(`/severity/get?page=${page}&tenant=${tenant ? tenant : ""}`);
    return res.data.data || [];
}

export const getSlaByTenantServices  = async ({ tenant }) => {
    const res = await AxiosHandler.get(`/severity/get-by-tenant?tenant=${tenant}`);
    return res.data.data || [];
}


export const createSlaServices  = async (data) => {
    const res = await AxiosHandler.post("/severity/create", data);
    toast.success(res.data.message || "SLA created");
    return res.data;
}


export const updateSlaServices  = async ({ id, data }) => {
    const res = await AxiosHandler.put(`/severity/update/${id}`, data);
    toast.success(res.data.message || "SLA updated successfully");
    return res.data;
}


export const deleteSlaServices  = async ({ id }) => {
    const res = await AxiosHandler.delete(`/severity/delete/${id}`);
    toast.success(res.data.message || "SLA deleted successfully");
    return res.data;
}