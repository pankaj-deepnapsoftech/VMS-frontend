import { AxiosHandler } from "@/config/AxiosConfig";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [token, setToken] = useState(Cookies.get("token"));
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const [authenticate, setAuthenticate] = useState(null);

  const getLogedInUser = async () => {
    setUserLoading(true)
    try {
      const res = await AxiosHandler.get("/auth/logedin-user");
      setAuthenticate(res.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setUserLoading(false)
    }
  }

  const Signin = async (data) => {
    const toastId = toast.loading("Loading...");

    setLoading(true);
    try {
      const res = await AxiosHandler.post("/auth/login", data);
      AxiosHandler.defaults.headers.authorization = `Bearer ${res.data.token}`;
      Cookies.set("token", res.data.token, { expires: 1 });
      setToken(res.data.token);
      navigate("/");
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error)
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message || "something went wrong please try again...");
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
      Cookies.set("token", res.data.token, { expires: 1 });
      setToken(res.data.token);
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

  const Forgotpassword = async (data) => {
    const toastId = toast.loading("Loading...");

    setLoading(true);
    try {
      const res = await AxiosHandler.post("/auth/verify-email", data);
      setToken(res.data.token);
      toast.dismiss(toastId);
      toast.success(res.data.message);
      alert("Please Check Your Email Inbox ")
      navigate("/sign-in");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyotp = async (data) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const res = await AxiosHandler.post("/auth/verify-otp", data);
      toast.dismiss(toastId);
      toast.success(res.data.message);
      getLogedInUser()
      navigate("/");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const Resetpassword = async (data) => {
    const toastId = toast.loading("Loading...");

    setLoading(true);
    try {
      const res = await AxiosHandler.post(`/auth/reset-password/${token}`, data);
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate("/sign-in")
    } catch (error) {
      console.log(error)
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };


  const ResendOtp = async () => {
    const toastId = toast.loading("Loading...");

    setLoading(true);
    try {
      const res = await AxiosHandler.put("/auth/resend-otp");
      toast.dismiss(toastId);
      toast.success(res.data.message);

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
      setAuthenticate(null)
      navigate("/sign-in");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (token) {
      getLogedInUser()
    }
  }, [token])

  return (
    <authContext.Provider value={{
      loading,
      userLoading,
      verifyotp,
      ResendOtp,
      Forgotpassword,
      Resetpassword,
      Signin,
      Signup,
      Logout,
      token,
      authenticate
    }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
