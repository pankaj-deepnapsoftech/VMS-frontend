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

export const getSixteenChartData = async ({ tenant, selectedYear }) => {
    const res = await AxiosHandler.get(`/data/tvm-sixteen-data?tenant=${tenant ? tenant : ""}&year=${selectedYear}`);
    return res.data?.data;
};


export const getSeventeenChartData = async ({ tenant, selectedYear }) => {
    const res = await AxiosHandler.get(`/data/tvm-seventeen-data?tenant=${tenant ? tenant : ""}&year=${selectedYear}`);
    return res.data;
};

export const getNinthChartData = async ({ tenant, selectedYear }) => {
    const res = await AxiosHandler.get(`/data/tvm-nine-chart?tenant=${tenant ? tenant : ""}&year=${selectedYear}`);
    return res.data;
};

export const getFifthChartData = async ({ tenant, selectedYear }) => {
    const res = await AxiosHandler.get(`/data/tvm-five-data?tenant=${tenant ? tenant : ""}&year=${selectedYear}`);
    const categories = ["Critical", "High", "Medium", "Low"];
    const getCounts = (data = []) => {
        const map = Object.fromEntries(data.map((item) => [item.severity, item.count]));
        return categories.map((cat) => map[cat] || 0);
    };

    const green = getCounts(res.data?.data?.first || []);
    const yellow = getCounts(res.data?.data?.second || []);
    const red = getCounts(res.data?.data?.third || []);

    // Merge into chart-friendly data structure
    const formatted = categories.map((cat, i) => ({
        category: cat,
        "0–30 days": green[i],
        "31–90 days": yellow[i],
        "90+ days": red[i],
    }));

    return formatted;
};

















