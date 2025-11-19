import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const getUsers = async ({ page, tenant }) => {
    const res = await AxiosHandler.get(`/infraStructureAsset/get?page=${page}&tenant=${tenant ? tenant : ""}`);
    return res.data.data || [];
}


export const createUsers = async (data) => {
    const res = await AxiosHandler.post("/infraStructureAsset/create", data);
    toast.success(res.data.message || "User created");
    return res.data;
}


export const updateUsers = async ({ id, data }) => {
    const res = await AxiosHandler.put(`/infraStructureAsset/update/${id}`, data);
    toast.success(res.data.message || "User updated successfully");
    return res.data;
}


export const deleteUsers = async ({ id }) => {
    const res = await AxiosHandler.delete(`/infraStructureAsset/delete/${id}`);
    toast.success(res.data.message || "User deleted successfully");
    return res.data;
}