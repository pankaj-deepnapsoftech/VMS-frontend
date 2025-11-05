import { AxiosHandler } from "@/config/AxiosConfig";


export const getCardsData = async ({tenant,selectedYear}) => {
    const res = await AxiosHandler.get(`/vroc/risk-score?tenant=${tenant ? tenant : ""}&year=${selectedYear ? selectedYear : ""}`);
    return res.data;
};

export const getRiskTrendChartData = async ({tenant,selectedYear}) => {
    const res = await AxiosHandler.get(`/vroc/risk-trand?year=${selectedYear ? selectedYear : ""}&tenant=${tenant ? tenant : ""}`);
    return res.data?.data || [];
};


export const getfinanceTrendChartData = async ({tenant,selectedYear}) => {
    const res = await AxiosHandler.get(`/vroc/finance-exposure-trand?year=${selectedYear ? selectedYear : ""}&tenant=${tenant ? tenant : ""}`);
    return res.data?.data || [];
};

export const getAssetInventoryData = async ({selectedYear}) => {
    const res = await AxiosHandler.get(`/vroc/assert-inventory?year=${selectedYear ? selectedYear : ""}`);
    return res.data || [];
};
















