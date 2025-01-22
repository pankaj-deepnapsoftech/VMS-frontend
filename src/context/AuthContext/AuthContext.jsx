import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';



export const authContext = createContext();



const AuthContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const Signin = async (data) => {


    const toastId = toast.loading('Loading...');

    setLoading(true)
    try {
      const res = await AxiosHandler.post("/auth/login", data)
      AxiosHandler.defaults.headers.authorization = `Bearer ${res.data.token}`;
      Cookies.set('token', res.data.token, { expires: 7 })
      console.log(res)
      navigate("/verify-otp");
      toast.dismiss(toastId);
      toast.success(res.data.message)
     
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message)
     
    } finally {
      setLoading(false)
    }

  }
  const Signup = async (data) => {
    const toastId = toast.loading('Loading...');

    setLoading(true)
    try {
      const res = await AxiosHandler.post("/auth/create", data)
      AxiosHandler.defaults.headers.authorization = `Bearer ${res.data.token}`;
      Cookies.set('token', res.data.token, { expires: 7 })
      toast.dismiss(toastId);
      toast.success(res.data.message)
      navigate("/verify-otp");
     
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message)
     
    } finally {
      setLoading(false)

    }
  }
  const Verifyotp = async (data) => {
    const toastId = toast.loading('Loading...');

    setLoading(true)
    try {
      const res = await AxiosHandler.post("/auth/verify-otp", data)
      // AxiosHandler.defaults.headers.authorization = `Bearer ${res.data.token}`;
      // Cookies.set('token', res.data.token, { expires: 7 })
      toast.dismiss(toastId);
      toast.success(res.data.message)
      navigate("/");
     
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message)
     
    } finally {
      setLoading(false)

    }
  }

  const Logout = async () => {
    const toastId = toast.loading('Loading...');

    setLoading(true)
    try {
      const res = await AxiosHandler.get("/auth/logout", )
      Cookies.remove('token', res.data.token)
      toast.dismiss(toastId);
      toast.success(res.data.message)
      navigate("/sign-in");
     
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message)
     
    } finally {
      setLoading(false)

    }
  }
  return (
    <authContext.Provider value={{ loading, Signin, Signup,Logout }}>{children}</authContext.Provider>
  )
}

export default AuthContextProvider