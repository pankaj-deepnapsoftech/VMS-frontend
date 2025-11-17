import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const GetExceptionData = async ({ page, tenant }) => {
    const res = await AxiosHandler.get(`/expection/get?page=${page}&tenant=${tenant ? tenant : ""}`);
    return res.data?.data || [];
};


export const updateExceptionData = async ({ id, data }) => {
    const res = await AxiosHandler.put(`/expection/update/${id}`, data);
    toast.success(res.data.message);
    return res.data;
}

export const CreateExceptionData = async (data) => {
    const res = await AxiosHandler.post('/expection/create', data);
    toast.success(res.data.message);
    return res.data;
}











