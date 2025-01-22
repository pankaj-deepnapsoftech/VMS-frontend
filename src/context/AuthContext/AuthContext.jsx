import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [token, setToken] = useState(Cookies.get("token"));
  const [role, setRole] = useState(Cookies.get("role"));
  const [emailVerify, setEmailVerify] = useState(Cookies.get("ev"));
  const [loginVerify, setLoginVerify] = useState(Cookies.get("lv"));
  const [loading, setLoading] = useState(false);
  const Signin = async (data) => {
    const toastId = toast.loading("Loading...");

    setLoading(true);
    try {
      const res = await AxiosHandler.post("/auth/login", data);
      AxiosHandler.defaults.headers.authorization = `Bearer ${res.data.token}`;
      Cookies.set("token", res.data.token, { expires: 1 });
      Cookies.set("role", res.data.user.role, { expires: 1 });
      Cookies.set("ev", res.data.user.email_verification, { expires: 1 });
      Cookies.set("lv", res.data.user.Login_verification, { expires: 1 });
      setEmailVerify(res.data.user.email_verification);
      setLoginVerify(res.data.user.Login_verification);
      setRole(res.data.user.role);
      setToken(res.data.token);
      console.log(res);
      navigate("/verify-otp");
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const Signup = async (data) => {
    const toastId = toast.loading("Loading...");

    setLoading(true);
    try {
      const res = await AxiosHandler.post("/auth/create", data);
      AxiosHandler.defaults.headers.authorization = `Bearer ${res.data.token}`;
      Cookies.set("token", res.data.token, { expires: 7 });
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate("/verify-otp");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const verifyOtp = async (data) => {
    const toastId = toast.loading("Loading...");

    setLoading(true);
    try {
      const res = await AxiosHandler.post("/auth/verify-otp", data);
      // AxiosHandler.defaults.headers.authorization = `Bearer ${res.data.token}`;
      // Cookies.set('token', res.data.token, { expires: 7 })
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const Logout = async () => {
    const toastId = toast.loading("Loading...");

    setLoading(true);
    try {
      const res = await AxiosHandler.get("/auth/logout");
      Cookies.remove("token", res.data.token);
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate("/sign-in");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <authContext.Provider value={{ loading,verifyOtp, Signin, Signup, Logout,loginVerify,emailVerify,role,token }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
