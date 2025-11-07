import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const getInfrastructureAsset = async ({ page, tenant }) => {
    const res = await AxiosHandler.get(`/infraStructureAsset/get?page=${page}&tenant=${tenant ? tenant : ""}`);
    return res.data.data || [];
}

export const createInfrastructureAsset = async (data) => {
    const res = await AxiosHandler.post("/infraStructureAsset/create", data);
    toast.success(res.data.message || "Infrastructure Asset created");
    return res.data;
}


export const createBulkInfrastructureAsset = async (data) => {
    const res = await AxiosHandler.post("/infraStructureAsset/bulk-create", data);
    toast.success(res.data.message || "All Infrastructure Assets created");
    return res.data;
}


export const deleteInfrastructureAsset = async ({id}) => {
    const res = await AxiosHandler.delete(`/infraStructureAsset/delete/${id}`);
    toast.success(res.data.message || "Infrastructure Assets deleted successfully");
    return res.data;
}


export const updateInfrastructureAsset = async ({id,data}) => {
    console.log("here is both",id,data)
      const res = await AxiosHandler.put(`/infraStructureAsset/update/${id}`, data);
    toast.success(res.data.message || "Infrastructure Assets updated successfully");
    return res.data;
}



