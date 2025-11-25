import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const getTenants = async ({ page }) => {
  const res = await AxiosHandler.get(`/tenant/get?page=${page}`);
  return res.data.data || [];
};


export const createTenantsService = async (values) => {
    const res = await AxiosHandler.post("/tenant/create", values);
    toast.success(res.data.message || "Infrastructure Asset created");
    return res.data;
}


export const updateTenantServices = async ({ id,data }) => {
    const res = await AxiosHandler.put(`/tenant/update/${id}`, data);
    toast.success(res.data.message || "Infrastructure Assets updated successfully");
    return res.data;
}


export const deleteTenants = async ({ id }) => {
    const res = await AxiosHandler.delete(`/tenant/delete/${id}`);
    toast.success(res.data.message || "Tenant deleted successfully");
    return res.data;
}

export const getAllTenantServices = async ()=>{
    const res = await AxiosHandler.get("/tenant/get-all");
    return res.data.data || [];
}