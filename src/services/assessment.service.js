import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";

export const CreateScheduleAssessment = async (data) => {
    const res = await AxiosHandler.post(`/assessment/create`, data);
    toast.success(res.data.message);
    return res.data;
}