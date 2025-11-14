import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const AddVulnerableData = async ({ tenant, data }) => {
    const res = await AxiosHandler.post(`/data/add-new?tenant=${tenant}`, data);
    toast.success(res.data.message);
    return res.data;
};


export const getAllVulnerableData = async ({ page, tenant }) => {
    const res = await AxiosHandler.get(`/nessus/getNessusData?page=${page}`);
    return res?.data?.data || [];
};


export const DeleteVulnerableData = async (id) => {
    if (!window.confirm("are you sure you want to delete")) {
        return;
    }
    const res = await AxiosHandler.delete(`/nessus/delete-nessus/${id}`);
    toast.success(res.data.message || "nessus data delete");
    return res.data;
};


export const getApplicationData = async ({page,tenant}) => {
    const res = await AxiosHandler.get(`/data/get-application?page=${page}&tenant=${tenant ? tenant : ""}`);
    return res.data?.data || [];
}







