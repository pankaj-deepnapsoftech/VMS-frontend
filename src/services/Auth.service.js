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
    const token = NewDecryptionToken(res.data.token);
    Cookies.set("AT", token, { expires: 1, secure: true });
    AxiosHandler.defaults.headers.authorization = `Bearer ${token}`;
    return {...res.data,token};
    
}


export const forgotPasswordService = async (data) => {
  const res = await AxiosHandler.post("/auth/verify-email", data);
  toast.success(res.data.message);
  return res.data; 
};


export const GetTenantDataServices = async (tenant) => {
    const res = await AxiosHandler.get(`/auth/user-by-tenant?tenant=${tenant ? tenant : ""}`);
     return res?.data?.data
};



export const ChangePasswordServices = async(data)=>{
    const res = await AxiosHandler.put("/auth/change-password", data);
    toast.success(res.data.message);
    return res.data;     
}

  
export const GetSecuirityQuestionServices = async(email)=>{
    const res = await AxiosHandler.get(`/auth/change-password-question?email=${email}`);
    return res?.data?.url
}


export const VerifyCaptureServices = async (token) => {
  const res = await AxiosHandler.post(`/auth/verify-recaptcha`, { token });
  return res.data; 
};


export const ResetWithQuestionServices = async(data) =>{
     const res = await AxiosHandler.put(`/auth/reset-password-question/${data.email}`,data);
     return res.data;
};

export const ChangeStatusService = async(data, id)=>{
    const res = await AxiosHandler.put(`/auth/deactivate/${id}`, data);
    return res.data;
};

export const updateProfileService = async ({id,data})=>{
    const res = await AxiosHandler.put(`/auth/update/${id}`, data);
    return res.data; 
};



export const ResendOtpServices = async(email)=>{
    const res = await AxiosHandler.put("/auth/resend-otp", { email });
    return res.data
};


export const verifyOtpService = async(data)=>{
    const res = await AxiosHandler.post("/auth/verify-otp", data);
    toast.success(res.data.message);
    return res.data

};


export const ResetpasswordServices = async(data, token)=>{
    const res = await AxiosHandler.post(`/auth/reset-password/${token}`,data);
    return res.data
}










