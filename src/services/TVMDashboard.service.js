import { AxiosHandler } from "@/config/AxiosConfig";


export const getTvmCardsData = async ({ tenant, selectedYear }) => {
    const res = await AxiosHandler.get(`/data/tvm-cards?year=${selectedYear}?tenant=${tenant ? tenant : ""}`);
    return res.data;
};


export const getFirstChartData = async ({ tenant, selectedYear }) => {
    const res = await AxiosHandler.get(`/data/tvm-first-chart?tenant=${tenant ? tenant : ""}&year=${selectedYear}`);
    return res.data;
};


export const getSecondChartData = async ({ tenant, selectedYear }) => {
    const res = await AxiosHandler.get(`/data/tvm-second-chart?tenant=${tenant ? tenant : ""}&year=${selectedYear}`);
    const data = [
        ...res.data.Critical,
        ...res.data.High,
        ...res.data.Informational,
        ...res.data.Low,
        ...res.data.Medium,
    ];
    const maxvalue = Math.max(...data);
    return { data: res.data, maxvalue: (maxvalue + 2) };
};


export const getThirdChartData = async ({ tenant, selectedYear }) => {
    const res = await AxiosHandler.get(`/data/tvm-third-data?tenant=${tenant ? tenant : ""}&year=${selectedYear}`);
    return res.data?.data;
};


export const getfourthChartData = async ({ tenant, selectedYear }) => {
    const res = await AxiosHandler.get(`/BusinessApplication/tvm-forth-chart?tenant=${tenant ? tenant : ""}&year=${selectedYear}`);
    return res.data;
};

export const getSixteenChartData  = async ({ tenant, selectedYear }) => {
    const res = await AxiosHandler.get(`/data/tvm-sixteen-data?tenant=${tenant ? tenant : ""}&year=${selectedYear}`);
    return res.data?.data;
};


export const getSeventeenChartData  = async ({ tenant, selectedYear }) => {
     const res = await AxiosHandler.get(`/data/tvm-seventeen-data?tenant=${tenant ? tenant : ""}&year=${selectedYear}`);
    return res.data;
};

export const getNinthChartData  = async ({ tenant, selectedYear }) => {
     const res = await AxiosHandler.get(`/data/tvm-nine-chart?tenant=${tenant ? tenant : ""}&year=${selectedYear}`);
    return res.data;
};

















