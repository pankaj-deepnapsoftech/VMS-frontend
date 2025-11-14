import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const AddVulnerableData = async ({ tenant, data }) => {
    const res = await AxiosHandler.post(`/data/add-new?tenant=${tenant}`, data);
    toast.success(res.data.message);
    return res.data;
};








