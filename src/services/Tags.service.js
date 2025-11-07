import { AxiosHandler } from "@/config/AxiosConfig";


export const GetAlltags = async () => {
     const res = await AxiosHandler.get('/tags/get-all-tags');
     return res.data?.data || [];
};