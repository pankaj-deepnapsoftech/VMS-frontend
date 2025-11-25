import { AxiosHandler } from "@/config/AxiosConfig";


export const GetLogedInUser = async () => {
    const res = await AxiosHandler.get("/auth/logedin-user");
    return res.data.data;
}