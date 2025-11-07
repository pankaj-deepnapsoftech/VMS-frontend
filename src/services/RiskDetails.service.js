import { AxiosHandler } from "@/config/AxiosConfig";



export const getRiskQuantificationData = async ({ tenant, page }) => {
    const res = await AxiosHandler.get(`/data/risk-quantification?page=${page}&tenant=${tenant ? tenant : ""}`);
    return res.data.data
}

