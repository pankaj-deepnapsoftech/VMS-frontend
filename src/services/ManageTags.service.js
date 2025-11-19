import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const getTags = async ({ page, tenant }) => {
    const res = await AxiosHandler.get(`/tags/get-tags?page=${page}&tenant=${tenant ? tenant : ""}`);
    return res.data.data || [];
}


export const createTags = async (data) => {
    const res = await AxiosHandler.post('/tags/create',data);
    toast.success(res.data.message || "Tag created");
    return res.data;
}


export const updateTags = async ({ data }) => {
    const res = await AxiosHandler.put(`/tags/update-tag/${data._id}`,data);
    toast.success(res.data.message || "Tag updated successfully");
    return res.data;
}


export const deleteTags = async ({ id }) => {
    const res = await AxiosHandler.delete(`/tags/delete/${id}`);
    toast.success(res.data.message || "Tag deleted successfully");
    return res.data;
}