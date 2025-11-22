import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const getRoles = async ({ page, tenant }) => {
    const res = await AxiosHandler.get(`/role/get?page=${page}&tenant=${tenant ? tenant : ""}`);
    return res.data.data || [];
}


export const createRoles = async (data) => {
    const res = AxiosHandler.post(`/role/create`, data);
    toast.success(res.data.message || "Role created");
    return res.data;
}


export const updateRoles = async ({ id, data }) => {
    const res = await AxiosHandler.put(`/role/update/${id}`, data);
    toast.success(res.data.message || "Role updated successfully");
    return res.data;
}


export const deleteRoles = async ({ id }) => {
    const res = await AxiosHandler.delete(`/role/delete/${id}`);
    toast.success(res.data.message || "Role deleted successfully");
    return res.data;
}

export const getAllRoles = async()=>{
    const res = await AxiosHandler.get("/role/get-all")
    return res?.data?.data || []
}