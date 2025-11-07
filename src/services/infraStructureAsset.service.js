import { AxiosHandler } from "@/config/AxiosConfig";


export const getInfrastructureAsset = async ({page,tenant}) => {
    const res = await AxiosHandler.get(`/infraStructureAsset/get?page=${page}&tenant=${tenant ? tenant : ""}`);
    return res.data.data || [];
}






