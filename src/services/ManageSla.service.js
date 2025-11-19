import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const getSla = async ({ page, tenant }) => {
    const res = await AxiosHandler.get(`/infraStructureAsset/get?page=${page}&tenant=${tenant ? tenant : ""}`);
    return res.data.data || [];
}


export const createSla = async (data) => {
    const res = await AxiosHandler.post("/infraStructureAsset/create", data);
    toast.success(res.data.message || "Infrastructure Asset created");
    return res.data;
}


export const updateSla = async ({ id, data }) => {
    const res = await AxiosHandler.put(`/infraStructureAsset/update/${id}`, data);
    toast.success(res.data.message || "Infrastructure Assets updated successfully");
    return res.data;
}


export const deleteSla = async ({ id }) => {
    const res = await AxiosHandler.delete(`/infraStructureAsset/delete/${id}`);
    toast.success(res.data.message || "Infrastructure Assets deleted successfully");
    return res.data;
}