import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";


export const GetAllReportsService = async (tenant) => {
    const res = await AxiosHandler(`/report/get-report?tenant=${tenant ? tenant : ""}`);
    return res.data?.data || [];
};

export const UploadReportService = async (data) => {
    const res = await AxiosHandler.post("/report/detailed-report", data);
    toast.success(res.data.message || "Report Upload Successfully");
    return res.data
};

export const DeleteReportService = async (id) => {
    const res = await AxiosHandler.delete(`/report/delete-report/${id}`);
    toast.success(res.data.message || "Report delete Successfully");
    return res.data;
}

export const UpdateReportService = async ({ id, data }) => {
    const res = await AxiosHandler.put(`/report/update-report/${id}`, data);
    toast.success(res.data.message || "Report delete Successfully");
    return res.data;
}

export const DownloadReportService = async (tenant) => {
    const res = await AxiosHandler.get(`/report/download-all-vulnerabilities?tenant=${tenant ? tenant : ""}`);
    return res.data?.data || [];
}



