import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const getRoles = async ({ page, tenant }) => {
    const res = await AxiosHandler.get(`/infraStructureAsset/get?page=${page}&tenant=${tenant ? tenant : ""}`);
    return res.data.data || [];
}


export const createRoles = async (data) => {
    const res = await AxiosHandler.post("/infraStructureAsset/create", data);
    toast.success(res.data.message || "Infrastructure Asset created");
    return res.data;
}


export const updateRoles = async ({ id, data }) => {
    const res = await AxiosHandler.put(`/infraStructureAsset/update/${id}`, data);
    toast.success(res.data.message || "Infrastructure Assets updated successfully");
    return res.data;
}


export const deleteRoles = async ({ id }) => {
    const res = await AxiosHandler.delete(`/infraStructureAsset/delete/${id}`);
    toast.success(res.data.message || "Infrastructure Assets deleted successfully");
    return res.data;
}