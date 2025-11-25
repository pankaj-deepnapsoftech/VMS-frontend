import { AxiosHandler, NewDecryptionToken } from "@/config/AxiosConfig";
import Cookies from "js-cookie";
import toast from "react-hot-toast";


export const GetLogedInUser = async () => {
    const res = await AxiosHandler.get("/auth/logedin-user");
    return res.data.data;
};

export const LogoutUser = async () => {
    const res = await AxiosHandler.get("/auth/logout");
    Cookies.remove("AT", res.data.token);
    toast.success(res.data.message);
    return res.data;
};


export const LoginUser = async (data) => {
    const res = await AxiosHandler.post("/auth/login", data);
    const token = NewDecryptionToken(res.data.token)
    AxiosHandler.defaults.headers.authorization = `Bearer ${token}`;
    
}











