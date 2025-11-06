import { AxiosHandler } from "@/config/AxiosConfig";


export const getTvmCardsData = async ({tenant,selectedYear}) => {
    const res = await AxiosHandler.get(`/data/tvm-cards?year=${selectedYear}?tenant=${tenant ? tenant : ""}`);
    return res.data;
};





