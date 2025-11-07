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




